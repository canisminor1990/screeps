declare const SpawnManager: {
	priorityHigh: string[];
	priorityLow: string[];

	register(): void;

	handleSpawningCompleted(creep: Creep): void;

	run(): void;
};
