interface obj {
	[type: string]: any;

	[type: number]: any;
}

interface Pos {
	x: number;
	y: number;
	roomName?: number;

	[type: string]: any;
}

declare namespace NodeJS {
	interface Global {
		isRoot: boolean;
		_ME: string;
		profiler: profilerMemory;

		[type: string]: any;
	}
}

declare const Population: any;
declare const Statistics: {
	run(): void;
};
declare const Tower: any;
declare const Util: any;
declare const Events: any;
declare const CMemory: any;
declare const Grafana: any;
declare const Traveler: any;
declare const traveler: any;

// declare const Visuals: any
// declare const CompressedMatrix: any
