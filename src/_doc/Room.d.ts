declare const RoomManager: {
	manager: obj;

	newInvader: Event;
	knownInvader: Event;
	goneInvader: Event;
	collapsed: Event;
	costMatrixInvalid: Event;
	RCLChange: Event;

	extend(): void;

	fresh(): void;

	analyze(): void;

	register(): void;

	run(): void;

	cleanup(): void;
};

interface RoomMemory {
	hostile?: boolean | number;
	hostileIds: string[];
	initialized: number;
	spawns: string[];
	RCL: number;
	RBL: number;
	RDL: number;
	center: Pos;
	spawnDelay: {
		High: number;
		Medium: number;
		Low: number;
	};
	spawnQueueHigh: string[];
	spawnQueueMedium: string[];
	spawnQueueLow: string[];
	sources: string[];
	myTotalSites: number;
	myTotalStructures: number;
	statistics: {
		tick: number;
		time: number;
		store: any;
		controllerProgress: number;
		controllerProgressTotal: number;
		invaders: string[];
	};
	resources: any;
	lastViewed: any;
	heatmap: obj;
	towers: string[];
	nukers: string[];
	spawns: string[];
	extensions: string[];
	observer: string;
}

interface Room {
	structures: {
		all: Structure[];
		my: Structure[];
		towers: StructureTower[];
		container: StructureContainer[];
		links: StructureLink[];
		labs: StructureLab[];
		spawns: StructureSpawn[];
		powerSpawns: StructurePowerSpawn[];
		nuker: StructureNuker;
		nukers: StructureNuker[];
		observer: StructureObserver;
		feedable: (StructureExtension | StructureSpawn)[];
		repairable: Structure[];
		urgentRepairable: Structure[];
		fortifyable: Structure[];
		fuelable: StructureTower[];
		piles(): Flag[];
		virtual(): (Structure | FlagManager)[];
	};

	print: string;

	my: boolean;

	ally: boolean;

	RCL: number | undefined;

	checkRCL(): void;

	skip: boolean;

	reservation(): string | boolean;

	myReservation: boolean;

	reserved: boolean;

	owner: string | boolean;

	creeps: Creep[];

	allCreeps: Creep[];

	immobileCreeps: Creep[];

	combatCreeps: Creep[];

	hurtCreeps: Creep[];

	hostile: boolean | number | undefined;

	registerIsHostile(): void;

	hostiles: Creep[];

	hostileIds: string[];

	newInvader: Creep[];

	goneInvader: string[];

	hostileThreatLevel: number;

	processInvaders(): void;

	lowDefenseEnergy: boolean;

	defenseLevel: RoomDefenseLevel;

	countMySites(): void;

	countMyStructures(): void;

	flags: Flag[];

	newFlag(flagColour: obj, pos: RoomPosition, name: string): string | number | void;

	isCriticallyFortifyable: boolean;

	relativeEnergyAvailable: boolean;

	relativeRemainingEnergyAvailable: boolean;

	remainingEnergyAvailable: number;

	reservedSpawnEnergy: number;

	situation: RoomSituation;

	collapsed: boolean;

	adjacentRooms: string[];

	find(type: string | string[], opt?: obj): any[];

	privateerMaxWeight: number;

	claimerMaxWeight: number;

	findRoute(dest: string, checkOwner?: boolean, preferHighway?: boolean, allowSK?: boolean): RoomRoute[];

	getBorder(roomName: string): number;

	exits(findExit: number, point: boolean | number): Pos[];

	isWalkable(x: number, y: number, look?: LookAtResult): boolean;

	highwayHasWalls: boolean;

	roadConstructionTrace: { [type: string]: number };

	recordMove(creep: Creep): void;

	structureMatrix: CostMatrix;

	getCreepMatrix(structureMatrix?: CostMatrix): CostMatrix;

	invalidateCostMatrix(): void;

	avoidSKMatrix(): CostMatrix;

	getAvoidMatrix(toAvoid: { [type: string]: Creep[] }): CostMatrix;

	showCostMatrix(matrix?: CostMatrix, aroundPos?: Pos): void;

	isTargetAccessible(object: RoomObject | RoomPosition, target: RoomObject | RoomPosition): boolean;

	targetAccessible(target: RoomObject | RoomPosition): boolean;

	pavementArt: any[];
}

interface RoomSituation {
	noEnergy: boolean;
	invasion: boolean;
}

interface RoomDefenseLevel {
	towers: number;
	creeps: number;
	sum: number;
}

interface RoomRoute {
	exit: ExitConstant;
	room: string;
}
