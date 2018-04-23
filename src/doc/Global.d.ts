declare namespace NodeJS {
	interface Global {
		[type: string]: any;
	}
}

interface obj {
	[type: string]: any;

	[type: number]: any;
}

interface Event {
	handlers: any[];

	on(handler: any): void;

	off(handler: any): void;

	trigger(data: any): void;
}

interface Pos {
	x: number;
	y: number;
	roomName?: number;

	[type: string]: any;
}

interface Component {
	extend(): void;

	fresh(): void;

	analyze(): void;

	register(): void;

	run(): void;

	cleanup(): void;
}

declare const Population: Component;
declare const Statistics: Component;
declare const Layout: Component;
declare const Grafana: Component;
declare const Traveler: Component;
declare const Util: any;

declare const CMemory: {
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

declare const CompressedMatrix: {
	state: obj;
	serialize(costMatrix: CostMatrix): number;
	deserialize(data: string): CostMatrix;
	compareEfficiency(count: number, costMatrix?: CostMatrix, verbose?: boolean): void;
};
