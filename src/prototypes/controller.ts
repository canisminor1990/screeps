// import * as PathfindingUtilities from '../utils/Pathfinding';

StructureController.prototype.memoryCheck = function(): void {
  if (this.room.memory === undefined) {
    this.room.memory = {};
  }
  if (this.room.memory.controller === undefined) {
    this.room.memory.controller = {};
  }
};

// 扩展 memory
Object.defineProperty(StructureController.prototype, 'memory', {
  get: function(): ControllerMemory {
    this.memoryCheck();
    return this.room.memory.controller;
  },
  set: function(value) {
    this.memoryCheck();
    this.room.memory.controller = value;
  }
});

// 获取建造 container 的位置
StructureController.prototype.getContainerPosition = function(): RoomPosition | undefined {
  // ////
  // 位置已经存在: 获取 container.pos
  if (this.memory.containerPos !== undefined) {
    let pos = this.memory.containerPos;
    return new RoomPosition(pos.x, pos.y, pos.roomName);
  }

  // ////
  // 找的新的位置: 获取 2格处可以放 container 的地方
  let positions: RoomPosition[] = this.getPossibleContainerPositions();

  // 如果没有3x3空地，则找一块空地最多的地方
  if (positions.length === 0) {
    const position = this.getOkeyContainerPosition();
    this.memory.containerPos = position.getPos();
    return position;
  }

  if (positions.length === 1) {
    const position = positions[0];
    this.memory.containerPos = position.getPos();
    return position;
  }

  // 找一块离 storage 最近的
  const spawn = this.room.getSpawn();
  if (!(spawn instanceof StructureSpawn)) {
    return undefined;
  }
  const storagePos = new RoomPosition(spawn.pos.x, spawn.pos.y + 3, spawn.pos.roomName);
  const distanceToStorage: number[] = [];
  for (let positionId in positions) {
    let position = positions[positionId];
    // TODO: replace method
    // distanceToStorage[positionId] = PathfindingUtilities.getDistanseBetween(position, storagePos);
  }

  let minDistanseId: string | undefined;
  for (let positionId in distanceToStorage) {
    if (
      minDistanseId === undefined ||
      distanceToStorage[parseInt(positionId)] < distanceToStorage[parseInt(minDistanseId)]
    ) {
      minDistanseId = positionId;
    }
  }

  if (minDistanseId !== undefined) {
    const position = positions[parseInt(minDistanseId)];
    this.memory.containerPos = position.getPos();
    return position;
  }
  return undefined;
};

// 获取距离2格处可以放 container 的地方: 3x3区域内没墙
StructureController.prototype.getPossibleContainerPositions = function(): RoomPosition[] {
  let positions: RoomPosition[] = [];
  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      let position = new RoomPosition(this.pos.x + x, this.pos.y + y, this.room.name);
      if ((Math.abs(x) === 2 || Math.abs(y) === 2) && position.hasFreeSpaceAround()) {
        positions.push(position);
      }
    }
  }
  return positions;
};

// 获取距离2格处可以放 container 的地方: 3x3区域内墙最少的地方
StructureController.prototype.getOkeyContainerPosition = function(): RoomPosition | undefined {
  let bestPos: RoomPosition | undefined;
  let freeSpace = 0;
  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      let position = new RoomPosition(this.pos.x + x, this.pos.y + y, this.room.name);
      if (Math.abs(x) === 2 || Math.abs(y) === 2) {
        let free = position.getFreeSpaceAround();
        if (position === undefined || freeSpace < free) {
          bestPos = position;
          freeSpace = free;
        }
      }
    }
  }
  return bestPos;
};

// 建造 Container
StructureController.prototype.buildControllerContainer = function(): void {
  let containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return;
  }

  containerPos.createConstructionSite(STRUCTURE_CONTAINER);
};

// 建造 Link 替换 Container(销毁)
StructureController.prototype.buildControllerLink = function(): void {
  let containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return;
  }

  let structures = containerPos.lookFor(LOOK_STRUCTURES) as Structure[];
  for (let s of structures) {
    if (s.structureType === STRUCTURE_CONTAINER) {
      s.destroy();
    }
  }

  containerPos.createConstructionSite(STRUCTURE_LINK);
};

// 检查是否存在 Container
StructureController.prototype.hasContainer = function(): boolean {
  let containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return false;
  }

  let structures = containerPos.lookFor(LOOK_STRUCTURES) as Structure[];
  for (let s of structures) {
    if (s.structureType === STRUCTURE_CONTAINER) {
      return true;
    }
  }

  return false;
};

// 检查是否存在 Link
StructureController.prototype.hasLink = function(): boolean {
  const containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return false;
  }

  const structures = containerPos.lookFor(LOOK_STRUCTURES) as Structure[];
  for (let b of structures) {
    if (b.structureType === STRUCTURE_LINK) {
      return true;
    }
  }

  return false;
};

// 获取 Container
StructureController.prototype.getContainer = function(): StructureContainer | undefined {
  const ContainerId = this.memory.container as string | undefined;
  if (ContainerId !== undefined) {
    const Container = Game.getObjectById(ContainerId) as StructureContainer | null;
    if (Container !== null) return Container;
    this.memory.container = undefined;
  }

  const containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return undefined;
  }

  const structures = containerPos.lookFor(LOOK_STRUCTURES) as Structure[];
  for (let s of structures) {
    if (s instanceof StructureContainer) {
      this.memory.container = s.id;
      return s as StructureContainer;
    }
  }
  return undefined;
};

// 获取 Container || Link
StructureController.prototype.getContainerOrLink = function():
  | StructureLink
  | StructureContainer
  | undefined {
  const ContainerId = this.memory.container as string | undefined;
  if (ContainerId !== undefined) {
    const Container = Game.getObjectById(ContainerId) as StructureContainer | null;
    if (Container !== null) return Container;
    this.memory.container = undefined;
  }
  const LinkId = this.memory.link as string | undefined;
  if (LinkId !== undefined) {
    const Link = Game.getObjectById(LinkId) as StructureLink | null;
    if (Link !== null) return Link;
    this.memory.link = undefined;
  }

  const containerPos = this.getContainerPosition() as RoomPosition;
  if (containerPos === undefined) {
    return undefined;
  }

  const structures = containerPos.lookFor(LOOK_STRUCTURES) as Structure[];
  for (let s of structures) {
    if (s instanceof StructureContainer) {
      this.memory.container = s.id;
      return s as StructureContainer;
    } else if (s instanceof StructureLink) {
      this.memory.link = s.id;
      return s as StructureLink;
    }
  }
  return undefined;
};
