interface profilerMemory {
	totalCPU: number;
	totalTicks: number;
	types: obj;
	validTick: number;
}

interface Memory {
	profiler: profilerMemory;
	CPU_CRITICAL: boolean;
	debugTrace: {
		error: boolean;
		no: obj;
	};
	cloaked: obj;
	parameters: obj;
	cacheValid: {
		[type: string]: boolean;
	};
	controllers: obj;
	population: obj;
	tasks: obj;
	flags: obj;
	boostTiming: obj;
	sources: obj;
	statistics: {
		reports: any[];
		tick: number;
		time: number;
		bucket: number;
	};
	heatmap: boolean;
}

interface RoomMemory {
	initialized: number;
	spawns: string[];
	RCL: number;
	spawnDelay: {
		High: number;
		Medium: number;
		Low: number;
	};
	spawnQueueHigh: string[];
	spawnQueueMedium: string[];
	spawnQueueLow: string[];
	sources: string[];
	myTotalStructures: number;
	statistics: {
		tick: number;
		time: number;
		store: any;
		controllerProgress: number;
		controllerProgressTotal: number;
		invaders: string[];
	};
	// TODO
	resources: any;
	lastViewed: any;
}
