import { GameObject } from '../utils/index';
import { RoleType } from '../enums/role';

// rcl
Room.prototype.rcl = function(): number {
  if (_.isUndefined(this.controller)) return 0;
  return this.controller.level;
};

// 获取空闲spawn
Room.prototype.getFreeSpawn = function(): StructureSpawn[] {
  const spawns = this.spawns() as StructureSpawn[];
  if (spawns.length < 1) return [];
  return _.filter(spawns, spawn => !spawn.spawning);
};

// 可以挖的energy
Room.prototype.sourcesEnergyAvailable = function(): number {
  let energy = 0;
  _.forEach(this.sources(), (s: Source) => (energy += s.energy));
  return energy;
};

// 检查是否是敌人的房间
// TODO:Whitelist
Room.prototype.registerIsHostile = function(): void {
  if (this.controller) {
    if (this.controller.owner && !this.controller.my) {
      this.memory.hostile = this.controller.level;
    } else {
      delete this.memory.hostile;
    }
  }
};

// creeps缓存
Room.prototype.checkCreeps = function(): void {
  if (_.isUndefined(this.memory.creeps)) this.memory.creeps = { all: [], role: {}, time: 0 };
  const creeps = this.memory.creeps;
  if (creeps.time !== Game.time || creeps.all.length === 0) {
    const List = _.filter(Game.creeps, (creep: Creep) => creep.homeRoom() === this.roomName);
    const RoleList: { [type: string]: string[] } = {};
    _.forEach(List, (creep: Creep) => {
      if (!RoleList[creep.role()]) RoleList[creep.role()] = [];
      RoleList[creep.role()].push(creep.id);
    });
    this.memory.creeps.role = RoleList;
    this.memory.creeps.all = GameObject.getIdArray(List);
    this.memory.creeps.time = Game.time;
  }
};

// 所属房间的creeps
Room.prototype.creeps = function(): Creep[] {
  this.checkCreeps();
  return GameObject.getByArray(this.memory.creeps.all);
};

// creeps角色数量
Room.prototype.roleCount = function(roleType: RoleType): number {
  this.checkCreeps();
  const role = this.memory.creeps.role[roleType] as string[];
  return _.isUndefined(role) ? 0 : role.length;
};

// creeps角色数组
Room.prototype.roleCreeps = function(roleType: RoleType): Creep[] {
  this.checkCreeps();
  const role = this.memory.creeps.role[roleType] as string[];
  return _.isUndefined(role) ? [] : GameObject.getByArray(role);
};

// 检查是否可以通过
Room.prototype.isWalkable = function(x: number, y: number, look?: any): boolean {
  const Look = look ? look[y][x] : this.lookAt(x, y);
  let invalidObject = (o: any) =>
    (o.type === LOOK_TERRAIN && o.terrain === 'wall') ||
    _.includes(OBSTACLE_OBJECT_TYPES, o[o.type].structureType);
  return Look.filter(invalidObject).length === 0;
};

// find 缓存
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

// filter 缓存

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

// shorthand
Object.assign(Room.prototype, {
  // ConstructionSite
  constructionSite: function(): any[] {
    return this.cacheFind(FIND_MY_CONSTRUCTION_SITES);
  },

  // Structures
  allStructures: function(): Structure[] {
    return this.cacheFind(FIND_STRUCTURES);
  },

  myStructures: function(): Structure[] {
    return this.cacheFind(FIND_MY_STRUCTURES);
  },

  hostileStructures: function(): Structure[] {
    return this.cacheFind(FIND_HOSTILE_STRUCTURES);
  },

  containers: function(): StructureContainer[] {
    return this.myStructuresFilter(STRUCTURE_CONTAINER);
  },

  extensions: function(): StructureExtension[] {
    return this.myStructuresFilter(STRUCTURE_EXTENSION);
  },

  extractor: function(): StructureExtractor | undefined {
    return this.myStructuresFilter(STRUCTURE_EXTRACTOR)[0];
  },

  labs: function(): StructureLab[] {
    return this.myStructuresFilter(STRUCTURE_LAB);
  },

  links: function(): StructureLink[] {
    return this.myStructuresFilter(STRUCTURE_LINK);
  },

  nuker: function(): StructureNuker | undefined {
    return this.myStructuresFilter(STRUCTURE_NUKER)[0];
  },

  observer: function(): StructureObserver | undefined {
    return this.myStructuresFilter(STRUCTURE_OBSERVER)[0];
  },

  powerSpawn: function(): StructurePowerSpawn | undefined {
    return this.myStructuresFilter(STRUCTURE_POWER_SPAWN)[0];
  },

  spawns: function(): StructureSpawn[] {
    return this.myStructuresFilter(STRUCTURE_SPAWN);
  },

  storage: function(): StructureStorage | undefined {
    return this.myStructuresFilter(STRUCTURE_STORAGE)[0];
  },

  terminal: function(): StructureTerminal | undefined {
    return this.myStructuresFilter(STRUCTURE_TERMINAL)[0];
  },

  roads: function(): StructureRoad[] {
    return this.allStructuresFilter(STRUCTURE_ROAD);
  },

  ramparts: function(): StructureRampart[] {
    return this.allStructuresFilter(STRUCTURE_RAMPART);
  },

  walls: function(): StructureWall[] {
    return this.allStructuresFilter(STRUCTURE_WALL);
  },

  // Creep
  allCreeps: function(): Creep[] {
    return this.cacheFind(FIND_CREEPS);
  },

  myCreeps: function(): Creep[] {
    return this.cacheFind(FIND_MY_CREEPS);
  },

  hostileCreeps: function(): Creep[] {
    return this.cacheFind(FIND_HOSTILE_CREEPS);
  },

  hasHostileCreeps: function(): boolean {
    return this.hostileCreeps().length > 0;
  },

  // Resources
  sources: function(): Source[] {
    return this.cacheFind(FIND_SOURCES, Infinity) as Source[];
  },

  mineral: function(): Mineral | undefined {
    let minerals = this.cacheFind(FIND_MINERALS, Infinity) as Mineral[];
    if (minerals.length > 0) {
      return minerals[0];
    }
    return undefined;
  }
});
