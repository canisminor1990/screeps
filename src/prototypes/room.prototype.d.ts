interface MemoryCache {
  id: boolean;
  time: number;
  value: any;
}

interface Room {
  memory: RoomMemory;

  // Func

  getFreeSpawn(): StructureSpawn[];

  checkCreeps(): void;

  creeps(): Creep[];

  roleCount(type: string): number;

  roleCreeps(type: string): Creep[];

  sourcesEnergyAvailable(): number;

  rcl(): number;

  isWalkable(): boolean;

  registerIsHostile(): void;

  // find

  cacheFind(findType: number, timeout: number): any[];

  cacheFilter(namespace: string, objs: any[], filter: Function, timeout: number): any[];

  constructionSite(): any[];

  // structures

  allStructuresFilter(type: string): Structure[];

  myStructuresFilter(type: string): Structure[];

  hostileStructuresFilter(type: string): Structure[];

  allStructures(): Structure[];

  myStructures(): Structure[];

  hostileStructures(): Structure[];

  containers(): StructureContainer[];

  extensions(): StructureExtension[];

  extractor(): StructureExtractor | undefined;

  labs(): StructureLab[];

  links(): StructureLink[];

  nuker(): StructureNuker | undefined;

  observer(): StructureObserver | undefined;

  powerSpawn(): StructurePowerSpawn | undefined;

  spawns(): StructureSpawn[];

  storage(): StructureStorage | undefined;

  terminal(): StructureTerminal | undefined;

  roads(): StructureRoad[];

  ramparts(): StructureRampart[];

  walls(): StructureWall[];

  // Creeps

  allCreeps(): Creep[];

  myCreeps(): Creep[];

  hostileCreeps(): Creep[];

  hasHostileCreeps(): boolean;

  // Resources

  sources(): Source[];

  mineral(): Mineral | undefined;
}
