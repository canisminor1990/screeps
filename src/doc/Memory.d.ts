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
		creepName: string;
	};
	cloaked: obj;
	parameters: obj;
	cacheValid: {
		[type: string]: boolean;
	};
	controllers: obj;
	population: {
		[type: string]: CreepMemory;
	};
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
	pavementArt: obj;
	pathfinder?: obj;
}
