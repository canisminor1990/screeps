export class Clock {
	constructor({ name, initParams, func, tick, autoRun = false }) {
		// this.id = Game.time + Math.random().toFixed(3) * 1000;
		this.name = name;
		this.iniParams = initParams;
		this.func = func;
		this.tick = tick;
		this.autoRun = autoRun;
		this.init();
	}

	get params() {
		if (!_.isUndefined(Memory.Clocks[this.name])) {
			return Memory.Clocks[this.name].params;
		}
	}

	set params(value) {
		if (!_.isUndefined(Memory.Clocks[this.name])) {
			Memory.Clocks[this.name].params = value;
		}
	}

	get pause() {
		if (Memory.Clocks[this.name]) return Memory.Clocks[this.name].pause;
	}

	set pause(v) {
		if (Memory.Clocks[this.name]) Memory.Clocks[this.name].pause = v;
	}

	init() {
		if (!global.Clocks) global.Clocks = {};
		if (!Memory.Clocks) Memory.Clocks = {};

		if (!Memory.Clocks[this.name]) {
			Memory.Clocks[this.name] = {
				pause: false,
				params: {},
			};
			this.params = this.iniParams;
		} else return;

		if (this.autoRun) global.Clocks[this.name] = this;
	}

	run() {
		if (!Memory.Clocks[this.name]) this.destory();
		if (!this.pause && Game.time % this.tick === 0) {
			this.func(this.params);
		}
	}

	start() {
		this.pause = false;
	}

	stop() {
		this.pause = true;
	}

	destory() {
		delete global.Clocks[this.name];
		delete Memory.Clocks[this.name];
	}
}
