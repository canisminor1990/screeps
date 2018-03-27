// find缓存
Room.prototype.cacheFind = function(findType: number, timeout: number = 1): any {
  if (this.memory.cache === undefined) this.memory.cache = {};

  // ////
  // 从缓存中提取
  const gameTime = Game.time;
  const cacheMemory = this.memory.cache[findType] as MemoryCache | undefined;
  if (
    cacheMemory !== undefined &&
    cacheMemory.value.length > 0 &&
    gameTime - cacheMemory.time <= timeout
  ) {
    // 是id数组则转换为游戏对象，否则直接返回
    if (!cacheMemory.id) return cacheMemory.value;
    const values: any[] = [];
    cacheMemory.value.forEach((id: string) => {
      const v = Game.getObjectById(id);
      if (v != null) values.push(v);
    });
    return values;
  }

  // ////
  // 重新find
  const values = this.find(findType);
  // 设置缓存
  if (values.length === 0) return [];
  if (values[0].id) {
    const valuesId = [] as number[];
    values.forEach((obj: any) => valuesId.push(obj.id));
    this.memory.cache[findType] = {
      id: true,
      time: gameTime,
      value: valuesId
    };
  } else {
    this.memory.cache[findType] = {
      id: false,
      time: gameTime,
      value: values
    };
  }

  return values;
};

Room.prototype.findMyStructures = function(type: string): Structure[] {
  if (type === STRUCTURE_ROAD || type === STRUCTURE_CONTAINER) {
    return this.cacheFind(FIND_STRUCTURES, {
      filter: (s: Structure) => s.structureType === type
    }) as Structure[];
  }
  return this.cacheFind(FIND_MY_STRUCTURES, {
    filter: (s: Structure) => s.structureType === type
  }) as Structure[];
};

Room.prototype.getHostileCreeps = function(): Creep[] {
  return this.cacheFind(FIND_HOSTILE_CREEPS) as Creep[];
};

Room.prototype.getHostileCreepsNotAtBorder = function(): Creep[] {
  return _.filter(this.getHostileCreeps(), function(c: Creep) {
    return !c.isAtBorder();
  });
};

Room.prototype.hasHostileCreeps = function(): boolean {
  return this.getHostileCreeps().length > 0;
};

Room.prototype.getSpawns = function(): StructureSpawn[] {
  return this.cacheFind(FIND_MY_SPAWNS, 5) as StructureSpawn[];
};

Room.prototype.getSpawn = function(): StructureSpawn | undefined {
  let spawns = this.getSpawns();
  if (spawns.length === 0) {
    return undefined;
  }
  return spawns[0];
};

Room.prototype.getSources = function(): Source[] {
  return this.cacheFind(FIND_SOURCES, Infinity) as Source[];
};

Room.prototype.getMineral = function(): Mineral | undefined {
  let minerals = this.cacheFind(FIND_MINERALS, Infinity) as Mineral[];
  if (minerals.length > 0) {
    return minerals[0];
  }
  return undefined;
};

Room.prototype.hasFreeSpawnCapacity = function(): boolean {
  let spawns = this.getSpawns() as StructureSpawn[];
  if (spawns === undefined || spawns.length < 1) {
    return false;
  }
  for (let spawn of spawns) {
    if (!spawn.spawning) {
      return true;
    }
  }
  return false;
};

Room.prototype.getFreeSpawn = function(): StructureSpawn | undefined {
  let spawns = this.getSpawns() as StructureSpawn[];
  if (spawns === undefined || spawns.length < 1) {
    return undefined;
  }
  for (let spawn of spawns) {
    if (!spawn.spawning) {
      return spawn;
    }
  }
  return undefined;
};

Room.prototype.getBoostLab = function(): StructureLab | undefined {
  if (this.memory.b === undefined) {
    return undefined;
  }
  let split = this.memory.b.split('-');
  let pos = new RoomPosition(+split[0], +split[1], this.name);
  let structures = new RoomPosition(pos.x + 1, pos.y + 4, pos.roomName).lookFor(
    LOOK_STRUCTURES
  ) as Structure[];
  for (let s of structures) {
    if (s.structureType === STRUCTURE_LAB) {
      return s as StructureLab;
    }
  }
  return undefined;
};

Room.prototype.getPowerSpawn = function(): StructurePowerSpawn | undefined {
  if (this.controller === undefined || this.controller.level < 8) {
    return undefined;
  }
  if (this.memory.powerspawn !== undefined) {
    let powerspawn = Game.getObjectById(this.memory.powerspawn);
    if (powerspawn instanceof StructurePowerSpawn) {
      return powerspawn;
    } else {
      this.memory.powerspawn = undefined;
    }
  }
  let powerspawn = this.findMyStructures(STRUCTURE_POWER_SPAWN) as StructurePowerSpawn[];
  if (powerspawn.length > 0) {
    this.memory.powerspawn = powerspawn[0].id;
    return powerspawn[0];
  }
  return undefined;
};

Room.prototype.getNuker = function(): StructureNuker | undefined {
  if (this.controller === undefined || this.controller.level < 8) {
    return undefined;
  }
  if (this.memory.nuker !== undefined) {
    let nuker = Game.getObjectById(this.memory.nuker);
    if (nuker instanceof StructureNuker) {
      return nuker;
    } else {
      this.memory.nuker = undefined;
    }
  }
  let nuker = this.findMyStructures(STRUCTURE_NUKER) as StructureNuker[];
  if (nuker.length > 0) {
    this.memory.nuker = nuker[0].id;
    return nuker[0];
  }
  return undefined;
};

Room.prototype.getObserver = function(): StructureObserver | undefined {
  if (this.controller === undefined || this.controller.level < 8) {
    return undefined;
  }
  if (this.memory.observer !== undefined) {
    let observer = Game.getObjectById(this.memory.observer);
    if (observer instanceof StructureObserver) {
      return observer;
    } else {
      this.memory.observer = undefined;
    }
  }
  let observer = this.findMyStructures(STRUCTURE_OBSERVER) as StructureObserver[];
  if (observer.length > 0) {
    this.memory.observer = observer[0].id;
    return observer[0];
  }
  return undefined;
};

Room.prototype.getBaseContainer = function(): StructureContainer | undefined {
  let c = Game.getObjectById(this.memory['roomContainer']);
  if (c instanceof StructureContainer) {
    return c;
  }
  return undefined;
};

Room.prototype.getBaseLink = function(): StructureLink | undefined {
  if (this.memory.b === undefined) {
    return undefined;
  }
  let split = this.memory.b.split('-');
  let pos = new RoomPosition(+split[0], +split[1], this.name);
  let structures = new RoomPosition(pos.x - 1, pos.y + 4, pos.roomName).lookFor(
    LOOK_STRUCTURES
  ) as Structure[];
  for (let s of structures) {
    if (s.structureType === STRUCTURE_LINK) {
      return s as StructureLink;
    }
  }
  return undefined;
};

Room.prototype.hasLabArea = function(): boolean {
  if (this.memory.lab === undefined || this.memory.lab.operational === undefined) {
    return false;
  }
  return this.memory.lab.operational === true;
};
Room.prototype.getProcessingLabs = function(): StructureLab[] {
  let labs: StructureLab[] = [];
  if (this.memory.lab !== undefined && this.memory.lab.processingLabs !== undefined) {
    labs = _.map(this.memory.lab.processingLabs, function(id: string) {
      return Game.getObjectById(id) as StructureLab;
    });
  }

  let boostLab = this.getBoostLab();
  if (this.memory.boosting !== true && boostLab !== undefined) {
    labs.push(boostLab);
  }
  return labs;
};
Room.prototype.getSupplyingLabs = function(): StructureLab[] {
  if (this.memory.lab === undefined || this.memory.lab.supplyingLabs === undefined) {
    return [];
  }
  return _.map(this.memory.lab.supplyingLabs, function(id: string) {
    return Game.getObjectById(id) as StructureLab;
  });
};

Room.prototype.isExpansion = function(): boolean {
  return this.memory.isExpansion === true;
};

Room.prototype.hasExpansion = function(): boolean {
  return this.memory.expansion !== undefined;
};

Room.prototype.isAbandoned = function(): boolean {
  return this.memory.isBeingDismantled === true;
};

Room.prototype.isUnderSiege = function(): boolean {
  return this.memory.defcon !== undefined && this.memory.defcon > 1;
};
