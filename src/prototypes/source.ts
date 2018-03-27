Source.prototype.memoryCheck = function(): void {
  if (Memory.sources === undefined) {
    Memory.sources = {};
  }
  if (Memory.sources[this.id] === undefined) {
    Memory.sources[this.id] = {};
  }
};

// 扩展 memory
Object.defineProperty(Source.prototype, 'memory', {
  get: function() {
    this.memoryCheck();
    return Memory.sources[this.id];
  },
  set: function(value) {
    this.memoryCheck();
    Memory.sources[this.id] = value;
  }
});

Source.prototype.hasMiningContainer = function(): boolean {
  return this.getMiningContainer() !== null;
};

Source.prototype.setMiningContainerId = function(id: string): void {
  this.memory.container = id;
};

Source.prototype.getMiningContainer = function(): StructureContainer | null {
  if (this.memory.container === undefined) {
    return null;
  }

  let container = Game.getObjectById(this.memory.container) as StructureContainer;
  if (container === null) {
    this.memory.container = undefined;
  }
  return container;
};

Source.prototype.getMiningContainerConstructionSite = function(): ConstructionSite | null {
  const structureId = this.memory.constructionSite;
  if (structureId !== undefined) {
    const structure = Game.getObjectById(structureId);
    if (structure !== null && structure instanceof ConstructionSite) return structure;
    this.memory.constructionSite = undefined;
  }

  let position = this.getContainerPosition() as RoomPosition | undefined;
  if (position !== undefined) {
    let structures = position.lookFor(LOOK_CONSTRUCTION_SITES) as ConstructionSite[];
    for (let structure of structures) {
      if (
        structure instanceof ConstructionSite &&
        (structure.structureType === STRUCTURE_LINK ||
          structure.structureType === STRUCTURE_CONTAINER)
      ) {
        this.memory.constructionSite = structure.id;
        return structure;
      }
    }
  }
  return null;
};

Source.prototype.buildMiningContainer = function(): void {
  let containerPosition = this.getContainerPosition() as RoomPosition | undefined;
  if (containerPosition !== undefined) {
    let structures = containerPosition.lookFor(LOOK_STRUCTURES);
    for (let structure of structures) {
      if (structure instanceof StructureContainer) {
        this.memory.container = structure.id;
      } else if (structure instanceof StructureLink) {
        structure.destroy();
      }
    }
  } else {
    return;
  }
  containerPosition.createConstructionSite(STRUCTURE_CONTAINER);
};

Source.prototype.getMiningPositions = function(): RoomPosition[] {
  if (this.memory.minPos !== undefined) {
    let pos = this.memory.minPos as Pos[];
    let positions: RoomPosition[] = [];
    pos.forEach((p: Pos) => {
      positions.push(new RoomPosition(p.x, p.y, p.roomName));
    });
    return positions;
  }

  let pos = [];
  let positions: RoomPosition[] = [];
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      let position = new RoomPosition(this.pos.x + x, this.pos.y + y, this.room.name);
      if (!(position.x === this.pos.x && position.y === this.pos.y)) {
        let terrainAtPositon = Game.map.getTerrainAt(position);
        if (terrainAtPositon === 'swamp' || terrainAtPositon === 'plain') {
          pos.push(position.getPos());
          positions.push(position);
        }
      }
    }
  }
  this.memory.minPos = pos;
  return positions;
};

Source.prototype.getContainerPosition = function(): RoomPosition | undefined {
  if (this.memory.containerPos !== undefined) {
    let pos = this.memory.containerPos as Pos;
    return new RoomPosition(pos.x, pos.y, pos.roomName);
  }
  let positions: RoomPosition[] = this.getMiningPositions();

  if (positions.length === 1) {
    this.memory.containerPos = positions[0];
    return positions[0];
  }

  let neighbours: number[] = [];
  for (let positionId in positions) {
    let position = positions[positionId];
    for (let potNeighbour of positions) {
      if (
        Math.abs(position.x - potNeighbour.x) + Math.abs(position.y - potNeighbour.y) === 1 ||
        (Math.abs(position.x - potNeighbour.x) === 1 && Math.abs(position.y - potNeighbour.y) === 1)
      ) {
        if (neighbours[positionId] === undefined) {
          neighbours[positionId] = 1;
        } else {
          neighbours[positionId] = neighbours[positionId] + 1;
        }
      }
    }
  }

  if (neighbours.length === 0) {
    this.memory.containerPos = positions[0];
    return positions[0];
  }

  let maxPosId: string | undefined;
  for (let positionId in neighbours) {
    if (
      maxPosId === undefined ||
      neighbours[parseInt(positionId)] > neighbours[parseInt(maxPosId)]
    ) {
      maxPosId = positionId;
    }
  }

  if (maxPosId !== undefined) {
    this.memory.containerPos = positions[parseInt(maxPosId)];
    return positions[parseInt(maxPosId)];
  }
  return undefined;
};

Source.prototype.getContainerMiningPositions = function(): RoomPosition[] {
  if (this.memory.containerMinPos !== undefined) {
    let pos = this.memory.containerMinPos as Pos[];
    let positions: RoomPosition[] = [];
    pos.forEach((p: Pos) => {
      positions.push(new RoomPosition(p.x, p.y, p.roomName));
    });
    return positions;
  }

  let positions: RoomPosition[] = this.getMiningPositions();
  let containerPosition: RoomPosition = this.getContainerPosition();
  let miningPos: Pos[] = [];
  let miningPositions: RoomPosition[] = [];

  for (let position of positions) {
    if (
      Math.abs(containerPosition.x - position.x) + Math.abs(containerPosition.y - position.y) < 2 ||
      (Math.abs(containerPosition.x - position.x) === 1 &&
        Math.abs(containerPosition.y - position.y) === 1)
    ) {
      miningPos.push(position.getPos());
      miningPositions.push(position);
    }
  }

  this.memory.containerMinPos = miningPos;
  return miningPositions;
};

Source.prototype.getDistanceFrom = function(roomName: string): number | undefined {
  if (
    this.memory.basedistance !== undefined &&
    this.memory.basedistanceRoom !== undefined &&
    this.memory.basedistanceRoom === roomName
  ) {
    return this.memory.basedistance;
  }
  return undefined;
};

Source.prototype.setDistanceFrom = function(roomName: string, distance: number): void {
  this.memory.basedistance = distance;
  this.memory.basedistanceRoom = roomName;
};
