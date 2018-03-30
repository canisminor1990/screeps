import { GameObject } from '../utils/index';

Room.prototype.cacheFind = function(findType: number, timeout: number = 1): any[] {
  if (_.isUndefined(this.memory.cache)) this.memory.cache = {};

  // 从缓存中提取
  const gameTime = Game.time;
  const cacheMemory = this.memory.cache[findType] as MemoryCache | undefined;
  if (
    cacheMemory !== undefined &&
    cacheMemory.value.length > 0 &&
    gameTime - cacheMemory.time <= timeout
  ) {
    // 是id数组则转换为游戏对象，否则直接返回
    return cacheMemory.id ? GameObject.getByArray(cacheMemory.value) : cacheMemory.value;
  }

  // 重新find
  const values = this.find(findType);
  this.memory.cache[findType] = {
    id: true,
    time: gameTime,
    value: values[0].id ? GameObject.getIdArray(values) : values
  };
  return values;
};

Room.prototype.cacheFilter = function(
  namespace: string,
  objs: any[],
  filter: Function,
  timeout: number = 1
): any[] {
  // 从缓存中提取
  const gameTime = Game.time;
  const cacheMemory = this.memory.cache[namespace] as MemoryCache | undefined;
  if (
    cacheMemory !== undefined &&
    cacheMemory.value.length > 0 &&
    gameTime - cacheMemory.time <= timeout
  ) {
    // 是id数组则转换为游戏对象，否则直接返回
    return cacheMemory.id ? GameObject.getByArray(cacheMemory.value) : cacheMemory.value;
  }

  // 重新find
  const values = _.filter(objs, filter);
  this.memory.cache[namespace] = {
    id: true,
    time: gameTime,
    value: values[0].id ? GameObject.getIdArray(values) : values
  };
  return values;
};

// ConstructionSite

Room.prototype.constructionSite = function(): any[] {
  return this.cacheFind(FIND_MY_CONSTRUCTION_SITES);
};

// Structures

Room.prototype.allStructures = function(): Structure[] {
  return this.cacheFind(FIND_STRUCTURES);
};

Room.prototype.myStructures = function(): Structure[] {
  return this.cacheFind(FIND_MY_STRUCTURES);
};

Room.prototype.hostileStructures = function(): Structure[] {
  return this.cacheFind(FIND_HOSTILE_STRUCTURES);
};

Room.prototype.allStructuresFilter = function(type: string): Structure[] {
  return this.cacheFilter(type, this.allStructures(), (s: Structure) => s.structureType === type);
};

Room.prototype.myStructuresFilter = function(type: string): Structure[] {
  return this.cacheFilter(type, this.myStructures(), (s: Structure) => s.structureType === type);
};

Room.prototype.hostileStructuresFilter = function(type: string): Structure[] {
  return this.cacheFilter(
    type,
    this.hostileStructures(),
    (s: Structure) => s.structureType === type
  );
};

Room.prototype.containers = function(): StructureContainer[] {
  return this.myStructuresFilter(STRUCTURE_CONTAINER);
};

Room.prototype.extensions = function(): StructureExtension[] {
  return this.myStructuresFilter(STRUCTURE_EXTENSION);
};

Room.prototype.extractor = function(): StructureExtractor | undefined {
  return this.myStructuresFilter(STRUCTURE_EXTRACTOR)[0];
};

Room.prototype.labs = function(): StructureLab[] {
  return this.myStructuresFilter(STRUCTURE_LAB);
};

Room.prototype.links = function(): StructureLink[] {
  return this.myStructuresFilter(STRUCTURE_LINK);
};

Room.prototype.nuker = function(): StructureNuker | undefined {
  return this.myStructuresFilter(STRUCTURE_NUKER)[0];
};

Room.prototype.observer = function(): StructureObserver | undefined {
  return this.myStructuresFilter(STRUCTURE_OBSERVER)[0];
};

Room.prototype.powerSpawn = function(): StructurePowerSpawn | undefined {
  return this.myStructuresFilter(STRUCTURE_POWER_SPAWN)[0];
};

Room.prototype.spawns = function(): StructureSpawn[] {
  return this.myStructuresFilter(STRUCTURE_SPAWN);
};

Room.prototype.storage = function(): StructureStorage | undefined {
  return this.myStructuresFilter(STRUCTURE_STORAGE)[0];
};

Room.prototype.terminal = function(): StructureTerminal | undefined {
  return this.myStructuresFilter(STRUCTURE_TERMINAL)[0];
};

Room.prototype.roads = function(): StructureRoad[] {
  return this.allStructuresFilter(STRUCTURE_ROAD);
};

Room.prototype.ramparts = function(): StructureRampart[] {
  return this.allStructuresFilter(STRUCTURE_RAMPART);
};

Room.prototype.walls = function(): StructureWall[] {
  return this.allStructuresFilter(STRUCTURE_WALL);
};

// Creep
Room.prototype.allCreeps = function(): Creep[] {
  return this.cacheFind(FIND_CREEPS);
};

Room.prototype.myCreeps = function(): Creep[] {
  return this.cacheFind(FIND_MY_CREEPS);
};

Room.prototype.hostileCreeps = function(): Creep[] {
  return this.cacheFind(FIND_HOSTILE_CREEPS);
};

Room.prototype.hasHostileCreeps = function(): boolean {
  return this.hostileCreeps().length > 0;
};

// Resources

Room.prototype.sources = function(): Source[] {
  return this.cacheFind(FIND_SOURCES, Infinity) as Source[];
};

Room.prototype.mineral = function(): Mineral | undefined {
  let minerals = this.cacheFind(FIND_MINERALS, Infinity) as Mineral[];
  if (minerals.length > 0) {
    return minerals[0];
  }
  return undefined;
};

// Func

Room.prototype.getFreeSpawn = function(): StructureSpawn[] {
  const spawns = this.spawns() as StructureSpawn[];
  if (spawns.length < 1) return [];
  return _.filter(spawns, spawn => !spawn.spawning);
};

Room.prototype.typeCount = function(type: string): number {
  if (_.isUndefined(this.memory.typeCount)) this.memory.typeCount = {};
  const num = this.memory.typeCount[type];
  return _.isUndefined(num) ? 0 : num;
};

Room.prototype.rcl = function(): number {
  if (_.isUndefined(this.controller)) return 0;
  return this.controller.level;
};
