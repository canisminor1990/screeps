declare class Clocks {
	list: string[];
	getClock(name: string): Clock;
	addClock(clock: Clock): void;
	tick(): void;
}
