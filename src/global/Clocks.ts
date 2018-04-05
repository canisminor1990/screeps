/// <reference path="../declarations/Clocks.d.ts" />
class Clocks {
	private l: Clock[] = [];
	get list(): string[] {
		return _.map(this.l, (clock: Clock) => `'${clock.name}'`);
	}
	addClock(clock: Clock) {
		this.l.push(clock);
	}
	tick(): void {
		const length = this.l.length;
		for (let i = 0; i < length; i += 1) {
			this.l[i].run();
		}
	}
}
export { Clocks };
