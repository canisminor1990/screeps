/**
 * 时钟
 */
declare class Clock {
	constructor(name: string, initParams: object, func: Function, tick: number, autoRun: boolean);

	name: string;
	initParams: object;
	func: Function;
	T: number;
	autoRun: boolean;

	run(): void;

	start(): void;

	pause(): void;

	destory(): void;

	restart(): void;
}
