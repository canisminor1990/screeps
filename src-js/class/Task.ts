export abstract class TaskComponent {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	spawnRoomMaxRange = 1;
	minControllerLevel = 1;
	creep = {};
	state = {};

	register = () => {};
	handleFlagRemoved = flagName => {};
	handleFlagFound = flag => {};
	handleSpawningStarted = flag => {};
	handleSpawningCompleted = creep => {};
	handleCreepDied = name => {};
	needsReplacement = creep => {};
	checkForRequiredCreeps = flag => {};
	findSpawning = (roomName, type) => {};
	findRunning = (roomName, type) => {};
	setupCreep = (roomName, definition) => {};
	// nextAction = creep => {}
	memory = key => {};
}
