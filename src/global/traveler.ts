const Options = {
  maxOps: 20000,
  defaultStuckValue: 3,
  reportThreshold: 50,
  roomRange: 22
};

export class Traveler {
  getHostileRoom: any;
  registerHostileRoom: any;
  structureMatrixCache: any;
  creepMatrixCache: any;
  currentTick: number;

  constructor() {
    this.getHostileRoom = (roomName: string) => _.get(Memory, ['rooms', roomName, 'hostile']);
    this.registerHostileRoom = (room: Room) => room.registerIsHostile();
  }

  findAllowedRooms(origin: string, destination: string, options: any = {}): any {
    _.defaults(options, { restrictDistance: 16 });
    if (Game.map.getRoomLinearDistance(origin, destination) > options.restrictDistance) return;
    let allowedRooms: any = { [origin]: true, [destination]: true };
    let ret = Game.map.findRoute(origin, destination, {
      routeCallback: roomName => {
        if (Game.map.getRoomLinearDistance(origin, roomName) > options.restrictDistance)
          return false;
        let parsed: any;
        if (options.preferHighway) {
          parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
          let isHighway: boolean = parsed[1] % 10 === 0 || parsed[2] % 10 === 0;
          if (isHighway) return 1;
        }
        if (!options.allowSK && !Game.rooms[roomName]) {
          if (!parsed) parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
          let fMod = parsed[1] % 10;
          let sMod = parsed[2] % 10;
          let isSK =
            !(fMod === 5 && sMod === 5) && (fMod >= 4 && fMod <= 6) && (sMod >= 4 && sMod <= 6);
          if (isSK) {
            return 10;
          }
        }
        if (
          !options.allowHostile &&
          this.getHostileRoom(roomName) &&
          roomName !== destination &&
          roomName !== origin
        ) {
          return Number.POSITIVE_INFINITY;
        }
        return 2.5;
      }
    });
    if (ret !== ERR_NO_PATH) {
      _.forEach(ret, value => {
        allowedRooms[value.room] = true;
      });
      allowedRooms.route = ret;
      return allowedRooms;
    } else {
      Log.error(`couldn't findRoute to ${destination}`);
    }
  }

  findTravelPath(origin: any, destination: any, options: any = {}) {
    _.defaults(options, {
      ignoreCreeps: true,
      range: 1,
      maxOps: Options.maxOps,
      obstacles: []
    });
    let origPos = origin.pos || (origin as RoomPosition);
    let destPos = destination.pos || (destination as RoomPosition);
    let allowedRooms: any;
    if (
      options.useFindRoute ||
      (options.useFindRoute === undefined &&
        Game.map.getRoomLinearDistance(origPos.roomName, destPos.roomName) > 2)
    ) {
      allowedRooms = this.findAllowedRooms(origPos.roomName, destPos.roomName, options);
    }
    let callback = (roomName: string) => {
      if (options.roomCallback) {
        let outcome = options.roomCallback(roomName, options.ignoreCreeps);
        if (outcome !== undefined) return outcome;
      }
      if (allowedRooms) {
        if (!allowedRooms[roomName]) return false;
      } else if (
        this.getHostileRoom(roomName) &&
        !options.allowHostile &&
        roomName !== origPos.roomName &&
        roomName !== destPos.roomName
      )
        return false;

      let room = Game.rooms[roomName];
      let matrix;
      if (!room) {
        matrix = this.getStructureMatrix(roomName);
      } else if (options.ignoreStructures) {
        matrix = new PathFinder.CostMatrix();
        if (!options.ignoreCreeps) {
          this.addCreepsToMatrix(room, matrix);
        }
      } else if (options.ignoreCreeps || roomName !== origin.pos.roomName) {
        matrix = this.getStructureMatrix(room);
      } else {
        matrix = this.getCreepMatrix(room);
      }
      for (let obstacle of options.obstacles) {
        matrix.set(obstacle.pos.x, obstacle.pos.y, 0xff);
      }
      return matrix;
    };
    const ret: any = PathFinder.search(
      origPos,
      { pos: destPos, range: options.range },
      {
        maxOps: options.maxOps,
        plainCost: options.ignoreRoads ? 1 : 2,
        roomCallback: callback,
        swampCost: options.ignoreRoads ? 5 : 10
      }
    );
    if (options.respectRamparts) {
      // search the path for a rampart
      const room = Game.rooms[origPos.roomName];
      // if we have ramparts in the room
      if (room && room.ramparts().length > 0) {
        for (let i = 0; i < ret.path.length; i++) {
          if (
            _.filter(ret.path[i].lookFor(LOOK_STRUCTURES), { structureType: STRUCTURE_RAMPART })
              .length
          ) {
            // rampart in the path
            ret.path = ret.path.slice(0, i + 1);
            break;
          }
        }
      }
    }
    ret.route = allowedRooms && allowedRooms.route;
    return ret;
  }

  travelTo(creep: Creep, destination: any, options: any = {}): number {
    // register hostile rooms entered
    let creepPos = creep.pos as RoomPosition;
    let destPos = destination.pos || (destination as RoomPosition);
    this.registerHostileRoom(creep.room);
    // initialize data object
    if (_.isUndefined(creep.memory._travel)) {
      creep.memory._travel = { stuck: 0, tick: Game.time, cpu: 0, count: 0 };
    }
    let travelData = creep.memory._travel;
    if (creep.fatigue > 0) {
      travelData.tick = Game.time;
      return ERR_BUSY;
    }
    if (!destination) {
      return ERR_INVALID_ARGS;
    }
    // manage case where creep is nearby destination
    let rangeToDestination = creep.pos.getRangeTo(destPos);
    if (rangeToDestination <= options.range) {
      return OK;
    } else if (rangeToDestination <= 1) {
      if (rangeToDestination === 1 && !options.range) {
        if (options.returnData) {
          options.returnData.nextPos = destination.pos;
        }
        return creep.move(creep.pos.getDirectionTo(destination));
      }
      return OK;
    }
    // check if creep is stuck

    if (travelData.prev) {
      travelData.prev = this.initPosition(travelData.prev);
      if (
        creepPos.inRangeTo(travelData.prev, 0) ||
        this.opposingBorders(creep.pos, travelData.prev)
      ) {
        travelData.stuck++;
      } else {
        travelData.stuck = 0;
      }
    }
    // handle case where creep is stuck
    if (travelData.stuck >= Options.defaultStuckValue && !options.ignoreStuck) {
      options.ignoreCreeps = false;
      delete travelData.path;
    }
    travelData.tick = Game.time;
    // delete path cache if destination is different
    if (
      !travelData.dest ||
      travelData.dest.x !== destPos.x ||
      travelData.dest.y !== destPos.y ||
      travelData.dest.roomName !== destPos.roomName
    ) {
      delete travelData.path;
    }
    // pathfinding
    if (!travelData.path) {
      if (creep.spawning) {
        return ERR_BUSY;
      }
      travelData.dest = destPos;
      travelData.prev = undefined;
      let cpu = Game.cpu.getUsed();
      let ret = this.findTravelPath(creep, destPos, options);
      travelData.cpu += Game.cpu.getUsed() - cpu;
      travelData.count++;
      travelData.avg = _.round(travelData.cpu / travelData.count, 2);
      if (travelData.count > 25 && travelData.avg > options.reportThreshold) {
        if (options.debug) {
          console.log(
            `TRAVELER: heavy cpu use: ${creep.name}, avg: ${travelData.cpu /
              travelData.count}, total: ${_.round(travelData.cpu, 2)},` +
              `origin: ${creep.pos}, dest: ${destPos}`
          );
        }
      }
      if (ret.incomplete) {
        const route = ret.route && ret.route.length;
        if (options.debug) {
          if (options.range === 0) {
            console.log(
              `TRAVELER: incomplete path for ${creep.name} from ${
                creep.pos
              } to ${destPos}, destination may be blocked.`
            );
          } else {
            console.log(
              `TRAVELER: incomplete path for ${creep.name} from ${creep.pos} to ${destPos}, range ${
                options.range
              }. Route length ${route}.`
            );
          }
        }
        if (route > 1) {
          ret = this.findTravelPath(
            creep,
            new RoomPosition(25, 25, ret.route[1].room),
            _.create(options, {
              range: Options.roomRange,
              useFindRoute: false
            })
          );
          if (options.debug) {
            console.log(
              `attempting path through next room using known route was ${
                ret.incomplete ? 'not' : ''
              } successful`
            );
          }
        }
        if (ret.incomplete && ret.ops < 2000 && travelData.stuck < Options.defaultStuckValue) {
          options.useFindRoute = false;
          ret = this.findTravelPath(creep, destPos, options);
          if (options.debug) {
            console.log(
              `attempting path without findRoute was ${ret.incomplete ? 'not ' : ''}successful`
            );
          }
        }
      }
      travelData.path = this.serializePath(creep.pos, ret.path);
      travelData.stuck = 0;
    }
    if (!travelData.path || travelData.path.length === 0) {
      return ERR_NO_PATH;
    }
    // consume path and move
    if (travelData.prev && travelData.stuck === 0) {
      travelData.path = travelData.path.substr(1);
    }
    travelData.prev = creep.pos;
    let nextDirection = parseInt(travelData.path[0], 10) as DirectionConstant;
    if (options.returnData) {
      options.returnData.nextPos = this.positionAtDirection(creep.pos, nextDirection);
    }
    return creep.move(nextDirection);
  }

  getStructureMatrix(room: any): any {
    this.refreshMatrices();
    if (!this.structureMatrixCache[room.name]) {
      let matrix = new PathFinder.CostMatrix();
      this.structureMatrixCache[room.name] = this.addStructuresToMatrix(room, matrix, 1);
    }
    return this.structureMatrixCache[room.name];
  }

  initPosition(pos: Pos): RoomPosition {
    return new RoomPosition(pos.x, pos.y, pos.roomName);
  }

  addStructuresToMatrix(room: Room, matrix: CostMatrix, roadCost: number): CostMatrix {
    for (let structure of room.find(FIND_STRUCTURES)) {
      if (structure instanceof StructureRampart) {
        if (!structure.my && !structure.isPublic) {
          matrix.set(structure.pos.x, structure.pos.y, 0xff);
        }
      } else if (structure instanceof StructureRoad) {
        matrix.set(structure.pos.x, structure.pos.y, roadCost);
      } else if (structure.structureType !== STRUCTURE_CONTAINER) {
        // Can't walk through non-walkable buildings
        matrix.set(structure.pos.x, structure.pos.y, 0xff);
      }
    }
    for (let site of room.find(FIND_CONSTRUCTION_SITES)) {
      if (site.structureType === STRUCTURE_CONTAINER) {
        continue;
      } else if (site.structureType === STRUCTURE_ROAD) {
        continue;
      } else if (site.structureType === STRUCTURE_RAMPART) {
        continue;
      }
      matrix.set(site.pos.x, site.pos.y, 0xff);
    }
    return matrix;
  }

  getCreepMatrix(room: Room) {
    this.refreshMatrices();
    if (!this.creepMatrixCache[room.name]) {
      this.creepMatrixCache[room.name] = this.addCreepsToMatrix(
        room,
        this.getStructureMatrix(room).clone()
      );
    }
    return this.creepMatrixCache[room.name];
  }

  addCreepsToMatrix(room: Room, matrix: CostMatrix): CostMatrix {
    room.find(FIND_CREEPS).forEach(creep => matrix.set(creep.pos.x, creep.pos.y, 0xff));
    return matrix;
  }

  serializePath(startPos: RoomPosition, path: RoomPosition[]) {
    let serializedPath = '';
    let lastPosition = startPos;
    for (let position of path) {
      if (position.roomName === lastPosition.roomName) {
        serializedPath += lastPosition.getDirectionTo(position);
      }
      lastPosition = position;
    }
    return serializedPath;
  }

  refreshMatrices() {
    if (Game.time !== this.currentTick) {
      this.currentTick = Game.time;
      this.structureMatrixCache = {};
      this.creepMatrixCache = {};
    }
  }

  positionAtDirection(origin: RoomPosition, direction: DirectionConstant) {
    let offsetX = [0, 0, 1, 1, 1, 0, -1, -1, -1];
    let offsetY = [0, -1, -1, 0, 1, 1, 1, 0, -1];
    return new RoomPosition(
      origin.x + offsetX[direction],
      origin.y + offsetY[direction],
      origin.roomName
    );
  }

  isBorder(pos: RoomPosition): boolean {
    return pos.x === 0 || pos.x === 49 || pos.y === 0 || pos.y === 49;
  }

  opposingBorders(p1: RoomPosition, p2: RoomPosition): boolean {
    return (
      this.isBorder(p1) &&
      this.isBorder(p2) &&
      p1.roomName !== p2.roomName &&
      (p1.x === p2.x || p1.y === p2.y)
    );
  }
}
