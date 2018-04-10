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

declare const Extensions: any;
declare const Population: any;
declare const FlagDir: any;
declare const Task: any;
declare const Tower: any;
declare const Util: any;
declare const Events: any;
declare const OCSMemory: any;
declare const Grafana: any;

// declare const Visuals: any
// declare const CompressedMatrix: any

declare const LAB_REACTIONS: any[];

declare const CRAYON: {
	death: any;
	birth: any;
	error: any;
	system: any;
};
