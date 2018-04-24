declare const MemoryManager: {
	extend(): void;
	fresh(): void;
	cleanup(): void;
	activateSegment(id: obj | number, reset?: boolean): void;
	deactivateSegment(id: number): void;
	cacheValid(id: number): boolean;
	processSegment(id: number, process: Function): void;
	processSegments(): void;
	saveSegment(range: obj, inputData: obj): void;
};

interface Memory {
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
