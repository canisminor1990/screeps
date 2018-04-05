/// <reference path="../declarations/Clocks.d.ts" />
class Clocks {
	private l = {};
	get list(): string[] {
		return _.map(this.l, (clock: Clock) => `'${clock.name}'`);
	}
	getClock(name: string): Clock {
		return this.l[name];
	}
	addClock(clock: Clock) {
		this.l[clock.name] = clock;
	}
	tick = (): void => {
		_.each(this.l, (clock: Clock) => {
			clock.run();
		});
	};
}
export { Clocks };
