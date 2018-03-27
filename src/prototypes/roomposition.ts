RoomPosition.prototype.getPos = function(): Pos {
  return {
    x: this.x,
    y: this.y,
    roomName: this.roomName
  };
};

RoomPosition.prototype.getClosestSpawn = function(): StructureSpawn {
  return this.findClosestByRange(FIND_MY_SPAWNS) as StructureSpawn;
};

// 检查目标 pos:3x3区域 是否都是可建造地形
RoomPosition.prototype.hasFreeSpaceAround = function(): boolean {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      let position = new RoomPosition(this.x + x, this.y + y, this.roomName);
      let terrainAtPositon = Game.map.getTerrainAt(position);
      if (terrainAtPositon !== 'swamp' && terrainAtPositon !== 'plain') {
        return false;
      }
    }
  }
  return true;
};

// 返回目标 pos:3x3区域 内可建造地形块数
RoomPosition.prototype.getFreeSpaceAround = function(): number {
  let c = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      let position = new RoomPosition(this.x + x, this.y + y, this.roomName);
      let terrainAtPositon = Game.map.getTerrainAt(position);
      if (terrainAtPositon === 'swamp' || terrainAtPositon === 'plain') {
        c++;
      }
    }
  }
  return c;
};

RoomPosition.prototype.hasBuildingType = function(structureType: string): boolean {
  let structuresAtPos = this.lookFor(LOOK_STRUCTURES) as Structure[];
  let constructionSitesAtPos = this.lookFor(LOOK_CONSTRUCTION_SITES) as ConstructionSite[];

  for (let s of structuresAtPos) {
    if (s.structureType === structureType) {
      return true;
    }
  }
  for (let c of constructionSitesAtPos) {
    if (c.structureType === structureType) {
      return true;
    }
  }
  return false;
};

RoomPosition.prototype.getPositionInDirection = function(direction: number): RoomPosition {
  switch (direction) {
    case TOP:
      return new RoomPosition(this.x, this.y - 1, this.roomName);
    case TOP_RIGHT:
      return new RoomPosition(this.x + 1, this.y - 1, this.roomName);
    case RIGHT:
      return new RoomPosition(this.x + 1, this.y, this.roomName);
    case BOTTOM_RIGHT:
      return new RoomPosition(this.x + 1, this.y + 1, this.roomName);
    case BOTTOM:
      return new RoomPosition(this.x, this.y + 1, this.roomName);
    case BOTTOM_LEFT:
      return new RoomPosition(this.x - 1, this.y + 1, this.roomName);
    case LEFT:
      return new RoomPosition(this.x - 1, this.y, this.roomName);
    case TOP_LEFT:
      return new RoomPosition(this.x - 1, this.y - 1, this.roomName);
    default:
      return new RoomPosition(this.x, this.y, this.roomName);
  }
};
