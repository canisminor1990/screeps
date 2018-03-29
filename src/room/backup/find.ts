export class FindClass {
  room: Room;
  state: any;

  constructor(room: Room) {
    this.room = room;
    this.state = {};
  }

  // cache-get

  get exitTop(): any[] {
    if (!this.state.exitTop) this.state.exitTop = this.room.find(FIND_EXIT_TOP);
    return this.state.exitTop;
  }

  get exitRight(): any[] {
    if (!this.state.exitRight) this.state.exitRight = this.room.find(FIND_EXIT_RIGHT);
    return this.state.exitRight;
  }

  get exitBottom(): any[] {
    if (!this.state.exitBottom) this.state.exitBottom = this.room.find(FIND_EXIT_BOTTOM);
    return this.state.exitBottom;
  }

  get exitLeft(): any[] {
    if (!this.state.exitLeft) this.state.exitLeft = this.room.find(FIND_EXIT_LEFT);
    return this.state.exitLeft;
  }

  get exit(): any[] {
    if (!this.state.exit) this.state.exit = this.room.find(FIND_EXIT);
    return this.state.exit;
  }

  get creeps(): Creep[] {
    if (!this.state.creeps) this.state.creeps = this.room.find(FIND_CREEPS);
    return this.state.creeps;
  }

  get myCreeps(): Creep[] {
    if (!this.state.myCreeps) this.state.myCreeps = this.creeps.filter((c: Creep) => c.my === true);
    return this.state.myCreeps;
  }

  get hostileCreeps(): Creep[] {
    if (!this.state.hostileCreeps)
      this.state.hostileCreeps = this.creeps.filter((c: Creep) => c.my === false);
    return this.state.hostileCreeps;
  }

  get sources(): Source[] {
    if (!this.state.sources) this.state.sources = this.room.find(FIND_SOURCES);
    return this.state.sources;
  }

  get sourcesActive(): Source[] {
    if (!this.state.sourcesActive)
      this.state.sourcesActive = this.sources.filter((s: Source) => s.energy > 0);
    return this.state.sourcesActive;
  }

  get minerals(): Mineral[] {
    if (!this.state.minerals) this.state.minerals = this.room.find(FIND_MINERALS);
    return this.state.minerals;
  }

  get droppedEnergy(): any[] {
    if (!this.state.droppedEnergy) this.state.droppedEnergy = this.room.find(FIND_DROPPED_ENERGY);
    return this.state.droppedEnergy;
  }

  get droppedResources(): any[] {
    if (!this.state.droppedResources)
      this.state.droppedResources = this.room.find(FIND_DROPPED_RESOURCES);
    return this.state.droppedResources;
  }

  get structures(): Structure[] {
    if (!this.state.structures) this.state.structures = this.room.find(FIND_STRUCTURES);
    return this.state.structures;
  }

  get myStructures(): Structure[] {
    if (!this.state.myStructures) this.state.myStructures = this.room.find(FIND_MY_STRUCTURES);
    return this.state.myStructures;
  }

  get hostileStructures(): Structure[] {
    if (!this.state.hostileStructures)
      this.state.hostileStructures = this.room.find(FIND_HOSTILE_STRUCTURES);
    return this.state.hostileStructures;
  }

  get constructionSites(): ConstructionSite[] {
    if (!this.state.constructionSites)
      this.state.constructionSites = this.room.find(FIND_CONSTRUCTION_SITES);
    return this.state.constructionSites;
  }

  get myConstructionSites(): ConstructionSite[] {
    if (!this.state.myConstructionSites)
      this.state.myConstructionSites = this.constructionSites.filter(
        (c: ConstructionSite) => c.my === true
      );
    return this.state.myConstructionSites;
  }

  get hostileConstructionSites(): ConstructionSite[] {
    if (!this.state.hostileConstructionSites)
      this.state.hostileConstructionSites = this.constructionSites.filter(
        (c: ConstructionSite) => c.my === false
      );
    return this.state.hostileConstructionSites;
  }

  get mySpawn(): StructureSpawn[] {
    if (!this.state.mySpawn) this.state.mySpawn = this.room.find(FIND_MY_SPAWNS);
    return this.state.mySpawn;
  }

  get hostileSpawn(): StructureSpawn[] {
    if (!this.state.hostileSpawn) this.state.hostileSpawn = this.room.find(FIND_HOSTILE_SPAWNS);
    return this.state.hostileSpawn;
  }

  get nukes(): StructureNuker[] {
    if (!this.state.nukes) this.state.nukes = this.room.find(FIND_NUKES);
    return this.state.nukes;
  }

  get tombstones(): Tombstone[] {
    if (!this.state.tombstones) this.state.tombstones = this.room.find(FIND_TOMBSTONES);
    return this.state.tombstones;
  }
}
