export enum StructurePriority {
	spawn,
	extension,
	tower,
	extractor,
	link,
	container,
	terminal,
	lab,
	observer,
	powerSpawn,
	nuker,
	road,
	constructedWall,
	rampart,
}

export enum ManagerPriority {
	CreepManager = 1,
	RoomManager = 2,
}

export enum RolePriority {
	// home
	worker = 1,
	miner = 2,
	hauler = 3,
	upgrader = 4,
	// defend
	defender = 10,
	// remote
	claimer = 20,
	reserver = 21,
	remoteMiner = 22,
	remoteHauler = 23,
	// soldier
	melee = 100,
	ranger = 101,
	healer = 102,
}
