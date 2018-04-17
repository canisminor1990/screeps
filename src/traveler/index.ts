import { CompressedMatrix } from './compressedMatrix';

/**
 * To start using Traveler, require it in main.js:
 *
 * There are 6 options available to pass to the module. Options are passed in the form
 *   of an object with one or more of the following:
 *
 *   exportTraveler:    boolean    Whether the require() should return the Traveler class. Defaults to true.
 *   installTraveler:   boolean    Whether the Traveler class should be stored in `global.Traveler`. Defaults to false.
 *   installPrototype:  boolean    Whether Creep.prototype.travelTo() should be created. Defaults to true.
 *   hostileLocation:   string     Where in Memory a list of hostile rooms can be found. If it can be found in
 *                                   Memory.empire, use 'empire'. Defaults to 'empire'.
 *   maxOps:            integer    The maximum number of operations PathFinder should use. Defaults to 20000
 *   defaultStuckValue: integer    The maximum number of ticks the creep is in the same RoomPosition before it
 *                                   determines it is stuck and repaths.
 *   reportThreshold:   integer    The mimimum CPU used on pathing to console.log() warnings on CPU usage. Defaults to 50
 *
 */

class Traveler {
	constructor() {
		this.opts = _.defaults(
			{
				defaultStuckValue: TRAVELER_STUCK_TICKS,
				reportThreshold: TRAVELER_THRESHOLD,
			},
			this.opts,
		);
		this.getHostileRoom = roomName => _.get(Memory, ['rooms', roomName, 'hostile']);
		this.registerHostileRoom = room => room.registerIsHostile();
	}

	opts = {
		maxOps: 10000,
		defaultStuckValue: 3,
		reportThreshold: 50,
		roomRange: 16,
	};

	findAllowedRooms = (origin, destination, options = {}) => {
		_.defaults(options, { restrictDistance: 16 });
		if (Game.map.getRoomLinearDistance(origin, destination) > options.restrictDistance) {
			return;
		}
		let allowedRooms = { [origin]: true, [destination]: true };
		let ret = Game.map.findRoute(origin, destination, {
			routeCallback: roomName => {
				if (options.routeCallback) {
					let outcome = options.routeCallback(roomName);
					if (outcome !== undefined) {
						return outcome;
					}
				}
				if (Game.map.getRoomLinearDistance(origin, roomName) > options.restrictDistance) {
					return false;
				}
				let parsed;
				if (options.preferHighway) {
					parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
					let isHighway = parsed[1] % 10 === 0 || parsed[2] % 10 === 0;
					if (isHighway) {
						return 1;
					}
				}
				if (!options.allowSK && !Game.rooms[roomName]) {
					if (!parsed) {
						parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
					}
					let fMod = parsed[1] % 10;
					let sMod = parsed[2] % 10;
					let isSK = !(fMod === 5 && sMod === 5) && (fMod >= 4 && fMod <= 6) && (sMod >= 4 && sMod <= 6);
					if (isSK) {
						return 10;
					}
				}
				if (!options.allowHostile && this.getHostileRoom(roomName) && roomName !== destination && roomName !== origin) {
					return Number.POSITIVE_INFINITY;
				}
				return 2.5;
			},
		});
		if (options.debug && !_.isArray(ret)) {
			Log.error(`couldn't findRoute to ${destination}`);
			return;
		}
		for (let value of ret) {
			allowedRooms[value.room] = true;
		}
		allowedRooms.route = ret;
		return allowedRooms;
	};

	findTravelPath = (origin, destination, options = {}) => {
		_.defaults(options, {
			ignoreCreeps: true,
			range: 1,
			maxOps: this.opts.maxOps,
			obstacles: [],
		});
		const origPos = origin.pos || origin;
		const destPos = destination.pos || destination;
		let allowedRooms;
		if (
			options.useFindRoute ||
			(options.useFindRoute === undefined && Game.map.getRoomLinearDistance(origPos.roomName, destPos.roomName) > 2)
		) {
			allowedRooms = this.findAllowedRooms(origPos.roomName, destPos.roomName, options);
		}
		let callback = roomName => {
			if (options.roomCallback) {
				let outcome = options.roomCallback(roomName, options.ignoreCreeps);
				if (outcome !== undefined) {
					return outcome;
				}
			}
			if (allowedRooms) {
				if (!allowedRooms[roomName]) {
					return false;
				}
			} else if (
				this.getHostileRoom(roomName) &&
				!options.allowHostile &&
				roomName !== origPos.roomName &&
				roomName !== destPos.roomName
			) {
				return false;
			}

			let room = Game.rooms[roomName];
			let matrix;
			if (!room) {
				matrix = this.getStructureMatrix(roomName, options);
			} else if (options.ignoreStructures) {
				matrix = new PathFinder.CostMatrix();
				if (!options.ignoreCreeps) {
					Traveler.addCreepsToMatrix(room, matrix);
				}
			} else if (options.ignoreCreeps || roomName !== origin.pos.roomName) {
				matrix = this.getStructureMatrix(room, options);
			} else {
				matrix = this.getCreepMatrix(room, options);
			}
			for (let obstacle of options.obstacles) {
				matrix.set(obstacle.pos.x, obstacle.pos.y, 0xff);
			}
			return matrix;
		};
		const ret = PathFinder.search(
			origPos,
			{ pos: destPos, range: options.range },
			{
				maxOps: options.maxOps,
				plainCost: options.ignoreRoads ? 1 : 2,
				roomCallback: callback,
				swampCost: options.ignoreRoads ? 5 : 10,
			},
		);
		if (options.respectRamparts) {
			// const start = Game.cpu.getUsed();
			// search the path for a rampart
			const room = Game.rooms[origPos.roomName];
			// if we have ramparts in the room
			if (room && room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_RAMPART } }).length) {
				for (let i = 0; i < ret.path.length; i++) {
					if (_.filter(ret.path[i].lookFor(LOOK_STRUCTURES), { structureType: STRUCTURE_RAMPART }).length) {
						// rampart in the path
						ret.path = ret.path.slice(0, i + 1);
						break;
					}
				}
			}
		}
		ret.route = allowedRooms && allowedRooms.route;
		return ret;
	};

	travelTo = (creep, destination, options = {}) => {
		// register hostile rooms entered
		const creepPos = creep.pos;
		const destPos = destination.pos || destination;
		this.registerHostileRoom(creep.room);
		// initialize data object
		if (!creep.memory._travel) {
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
		let hasMoved = true;
		if (travelData.prev) {
			const isBorder = pos => {
				return pos.x === 0 || pos.x === 49 || pos.y === 0 || pos.y === 49;
			};
			const opposingBorders = (p1, p2) => {
				return isBorder(p1) && isBorder(p2) && p1.roomName !== p2.roomName && (p1.x === p2.x || p1.y === p2.y);
			};
			travelData.prev = Traveler.initPosition(travelData.prev);
			if (creepPos.inRangeTo(travelData.prev, 0) || opposingBorders(creep.pos, travelData.prev)) {
				hasMoved = false;
				travelData.stuck++;
			} else {
				creep.room.recordMove(creep);
				travelData.stuck = 0;
			}
		}
		// handle case where creep is stuck
		if (travelData.stuck >= this.opts.defaultStuckValue && !options.ignoreStuck) {
			options.ignoreCreeps = false;
			delete travelData.path;
		}
		// FIXME: Do an actual calculation to see if we have moved, this is unneccesary and expensive when the creep hasn't moved for
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
					Log.warn(
						'[Traveler] heavy cpu use: ',
						'<br>',
						Util.jsonToTable({
							creep: creep.name,
							avg: travelData.cpu / travelData.count,
							total: _.round(travelData.cpu, 2),
							from: creep.pos,
							to: destPos,
						}),
					);
				}
			}
			if (ret.incomplete) {
				const route = ret.route && ret.route.length;
				if (options.debug) {
					if (options.range === 0) {
						Log.warn(
							`[Traveler] incomplete path, destination may be blocked.`,
							'<br>',
							Util.jsonToTable({
								creep: creep.name,
								from: creep.pos,
								to: destPos,
							}),
						);
					} else {
						Log.warn(
							`[Traveler] incomplete path . Route length ${route}.`,
							'<br>',
							Util.jsonToTable({
								creep: creep.name,
								from: creep.pos,
								to: destPos,
								range: options.range,
							}),
						);
					}
				}
				if (route > 1) {
					ret = this.findTravelPath(
						creep,
						new RoomPosition(25, 25, ret.route[1].room),
						_.create(options, {
							range: this.opts.roomRange,
							useFindRoute: false,
						}),
					);
					if (options.debug) {
						Log.info(
							`attempting path through next room using known route was ${ret.incomplete ? 'not' : ''} successful`,
						);
					}
				}
				if (ret.incomplete && ret.ops < 2000 && travelData.stuck < this.opts.defaultStuckValue) {
					options.useFindRoute = false;
					ret = this.findTravelPath(creep, destPos, options);
					if (options.debug) {
						Log.info(`attempting path without findRoute was ${ret.incomplete ? 'not ' : ''}successful`);
					}
				}
			}
			travelData.path = Traveler.serializePath(creep.pos, ret.path);
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
		let nextDirection = parseInt(travelData.path[0], 10);
		if (options.returnData) {
			options.returnData.nextPos = Traveler.positionAtDirection(creep.pos, nextDirection);
		}
		return creep.move(nextDirection);
	};

	getStructureMatrix = (room, options) => {
		if (options.getStructureMatrix) return options.getStructureMatrix(room);
		this.refreshMatrices();
		if (!this.structureMatrixCache[room.name]) {
			let matrix = new PathFinder.CostMatrix();
			this.structureMatrixCache[room.name] = Traveler.addStructuresToMatrix(room, matrix, 1);
		}
		return this.structureMatrixCache[room.name];
	};

	static initPosition = pos => {
		return new RoomPosition(pos.x, pos.y, pos.roomName);
	};

	static addStructuresToMatrix = (room, matrix, roadCost) => {
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
	};

	getCreepMatrix = (room, options) => {
		if (options.getCreepMatrix) return options.getCreepMatrix(room);
		this.refreshMatrices();
		if (!this.creepMatrixCache[room.name]) {
			this.creepMatrixCache[room.name] = Traveler.addCreepsToMatrix(
				room,
				this.getStructureMatrix(room, options).clone(),
			);
		}
		return this.creepMatrixCache[room.name];
	};

	static addCreepsToMatrix = (room, matrix) => {
		room.find(FIND_CREEPS).forEach(creep => matrix.set(creep.pos.x, creep.pos.y, 0xff));
		return matrix;
	};

	static serializePath = (startPos, path) => {
		let serializedPath = '';
		let lastPosition = startPos;
		for (let position of path) {
			if (position.roomName === lastPosition.roomName) {
				serializedPath += lastPosition.getDirectionTo(position);
			}
			lastPosition = position;
		}
		return serializedPath;
	};

	refreshMatrices = () => {
		if (Game.time !== this.currentTick) {
			this.currentTick = Game.time;
			this.structureMatrixCache = {};
			this.creepMatrixCache = {};
		}
	};

	static positionAtDirection = (origin, direction) => {
		let offsetX = [0, 0, 1, 1, 1, 0, -1, -1, -1];
		let offsetY = [0, -1, -1, 0, 1, 1, 1, 0, -1];
		return new RoomPosition(origin.x + offsetX[direction], origin.y + offsetY[direction], origin.roomName);
	};
}

export const TravelerInstall = () => {
	_.assign(global, {
		CompressedMatrix: new CompressedMatrix(),
		Traveler: Traveler,
		traveler: new Traveler(),
		travelerTick: Game.time,
	});
};
