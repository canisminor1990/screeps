interface FindCache {
	time: number;
	value: any;
}

interface Room {
	print: string;
	rcl: number;
	my: boolean;
	reservedByMe: boolean;
	canReserved: boolean;
	signedByMe: boolean;

	// constructionSite
	constructionSite: ConstructionSite[];

	// structures
	allStructuresFilter(type: string): Structure[];
	myStructuresFilter(type: string): Structure[];
	hostileStructuresFilter(type: string): Structure[];
	allStructures: Structure[];
	myStructures: Structure[];
	hostileStructures: Structure[];
	containers: StructureContainer[];
	extensions: StructureExtension[];
	extractor: StructureExtractor | undefined;
	labs: StructureLab[];
	links: StructureLink[];
	nuker: StructureNuker | undefined;
	observer: StructureObserver | undefined;
	powerSpawn: StructurePowerSpawn | undefined;
	spawns: StructureSpawn[];
	freeSpawns: StructureSpawn[];
	storage: StructureStorage | undefined;
	terminal: StructureTerminal | undefined;
	roads: StructureRoad[];
	ramparts: StructureRampart[];
	walls: StructureWall[];

	// Creeps
	allCreeps: Creep[];
	myCreeps: Creep[];
	hostileCreeps: Creep[];
	hasHostileCreeps: boolean;

	// Resources
	sources: Source[];
	mineral: Mineral | undefined;

	// Funcitons
	cacheFind(type: number, timeout?: number): any[];
}
