import { getGame } from '../utils';

Object.defineProperties(Room.prototype, {
	// ////////////////////////////////
	// Logging
	// ////////////////////////////////
	print: {
		get(): string {
			return '<a href="#!/room/' + Game.shard.name + '/' + this.name + '">' + this.name + '</a>';
		},
	},
	// ////////////////////////////////
	// Short Hand
	// ////////////////////////////////
	rcl: {
		get(): string {
			return this.controller.level;
		},
	},
	my: {
		get(): boolean {
			return _.get(this.controller, 'my') === true;
		},
	},
	reservedByMe: {
		get(): boolean {
			return _.get(this.controller, 'reservation.username') === ME;
		},
	},
	canReserved: {
		get(): boolean {
			return (
				this.controller &&
				_.isUndefined(_.get(this.controller, 'owner.username')) &&
				_.isUndefined(_.get(this.controller, 'reservation.username'))
			);
		},
	},
	signedByMe: {
		get(): boolean {
			return this.controller && this.controller.sign && this.controller.sign.text === CONTROLLER_SIGN_MESSAGE;
		},
	},

	// constructionSite
	constructionSite: {
		get(): ConstructionSite {
			return this.cacheFind(FIND_MY_CONSTRUCTION_SITES);
		},
	},

	// Structures
	allStructures: {
		get(): Structure[] {
			return this.cacheFind(FIND_STRUCTURES);
		},
	},
	myStructures: {
		get(): Structure[] {
			return this.cacheFind(FIND_MY_STRUCTURES);
		},
	},
	hostileStructures: {
		get(): Structure[] {
			return this.cacheFind(FIND_HOSTILE_STRUCTURES);
		},
	},
	containers: {
		get(): StructureContainer[] {
			return this.myStructuresFilter(STRUCTURE_CONTAINER);
		},
	},
	extensions: {
		get(): StructureExtension[] {
			return this.myStructuresFilter(STRUCTURE_EXTENSION);
		},
	},
	extractor: {
		get(): StructureExtractor | undefined {
			return this.myStructuresFilter(STRUCTURE_EXTRACTOR)[0];
		},
	},
	labs: {
		get(): StructureLab[] {
			return this.myStructuresFilter(STRUCTURE_LAB);
		},
	},
	links: {
		get(): StructureLink[] {
			return this.myStructuresFilter(STRUCTURE_LINK);
		},
	},
	nuker: {
		get(): StructureNuker | undefined {
			return this.myStructuresFilter(STRUCTURE_NUKER)[0];
		},
	},
	observer: {
		get(): StructureObserver | undefined {
			return this.myStructuresFilter(STRUCTURE_OBSERVER)[0];
		},
	},
	powerSpawn: {
		get(): StructurePowerSpawn | undefined {
			return this.myStructuresFilter(STRUCTURE_POWER_SPAWN)[0];
		},
	},
	spawns: {
		get(): StructureSpawn[] {
			return this.myStructuresFilter(STRUCTURE_SPAWN);
		},
	},
	freeSpawns: {
		get(): StructureSpawn[] {
			return _.filter(this.spawns(), spawn => !spawn.spawning);
		},
	},
	storage: {
		get(): StructureStorage | undefined {
			return this.myStructuresFilter(STRUCTURE_STORAGE)[0];
		},
	},
	terminal: {
		get(): StructureTerminal | undefined {
			return this.myStructuresFilter(STRUCTURE_TERMINAL)[0];
		},
	},
	roads: {
		get(): StructureRoad[] {
			return this.allStructuresFilter(STRUCTURE_ROAD);
		},
	},
	ramparts: {
		get(): StructureRampart[] {
			return this.allStructuresFilter(STRUCTURE_RAMPART);
		},
	},
	walls: {
		get(): StructureWall[] {
			return this.allStructuresFilter(STRUCTURE_WALL);
		},
	},
	KeeperLairs: {
		get(): StructureKeeperLair[] {
			return this.allStructuresFilter(STRUCTURE_KEEPER_LAIR);
		},
	},
	// Creep
	allCreeps: {
		get(): Creep[] {
			return this.cacheFind(FIND_CREEPS);
		},
	},
	myCreeps: {
		get(): Creep[] {
			return this.cacheFind(FIND_MY_CREEPS);
		},
	},
	hostileCreeps: {
		get(): Creep[] {
			return this.cacheFind(FIND_HOSTILE_CREEPS);
		},
	},
	hasHostileCreeps: {
		get(): boolean {
			return this.hostileCreeps().length > 0;
		},
	},

	// Resources
	sources: {
		get(): Source[] {
			return this.cacheFind(FIND_SOURCES, Infinity);
		},
	},
	mineral: {
		get(): Mineral | undefined {
			return this.cacheFind(FIND_MINERALS)[0];
		},
	},
});

// ////////////////////////////////
// Functions
// ////////////////////////////////
Room.prototype.allStructuresFilter = function(type: string): Structure[] {
	return this.cacheFilter(`as_${type}`, this.allStructures, (s: Structure) => s.structureType === type);
};
Room.prototype.myStructuresFilter = function(type: string): Structure[] {
	return this.cacheFilter(`ms_${type}`, this.myStructures, (s: Structure) => s.structureType === type);
};
Room.prototype.hostileStructuresFilter = function(type: string): Structure[] {
	return this.cacheFilter(`hs_${type}`, this.hostileStructures, (s: Structure) => s.structureType === type);
};

// ////////////////////////////////
// Cahce
// ////////////////////////////////
Room.prototype.cacheFilter = function(key: string, objs: any[], filter: Function, timeout: number = 1): any[] {
	const cacheResult = _.get(this.memory, ['_filter', key]) as FilterCache;
	if (!_.isUndefined(cacheResult) && Game.time - cacheResult.time <= timeout) {
		return getGame.objsByIdArray(cacheResult.value);
	}
	// 重新find
	const result = _.filter(objs, filter);
	_.set(this.memory, ['_filter', key], {
		time: Game.time,
		value: getGame.objsToIdArray(result),
	});
	return result;
};
Room.prototype.cacheFind = function(type: number, timeout: number = 1): any[] {
	if (type === (FIND_SOURCES || FIND_MINERALS)) timeout = Infinity;
	const isExit = type === (FIND_EXIT_TOP || FIND_EXIT_RIGHT || FIND_EXIT_BOTTOM || FIND_EXIT_LEFT || FIND_EXIT);
	const cacheResult = _.get(this.memory, ['_find', type]) as FindCache;
	if (!_.isUndefined(cacheResult) && Game.time - cacheResult.time <= timeout) {
		return isExit ? cacheResult.value : getGame.objsByIdArray(cacheResult.value);
	}
	// 重新find
	const result = this.find(type);
	_.get(this.memory, ['_find', type], {
		time: Game.time,
		value: isExit ? result : getGame.objsToIdArray(result),
	});
	return result;
};
