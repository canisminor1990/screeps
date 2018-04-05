declare class Clock {
	name: string;
	initParams: object;
	func: Function;
	tick: number;
	autoRun: boolean = false;
	start(): void;
	stop(): void;
}
