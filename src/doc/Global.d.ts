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

interface RoomConstructor {
	extend(): void;

	fresh(): void;

	analyze(): void;

	register(): void;

	run(): void;

	cleanup(): void;
}

interface CreepConstructor {
	extend(): void;

	fresh(): void;

	analyze(): void;

	register(): void;

	run(): void;

	cleanup(): void;
}

declare const Task: Component;
declare const Population: Component;
declare const Statistics: Component;
declare const Layout: Component;
declare const CMemory: Component;
declare const Grafana: Component;
declare const Traveler: Component;
declare const traveler: Component;
declare const Util: any;
