/**
 * 时钟对象 能够暂停，重启，清空，销毁
 */
class Clock {
	public name: string;
	public initParams: object;
	public tick: number;
	private func: Function;
	public autoRun: boolean;

	constructor(name: string, initParams: object, func: Function, tick: number, autoRun: boolean = false) {
		this.name = name;
		this.initParams = initParams;
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

	get isPause() {
		if (Memory.Clocks[this.name]) return Memory.Clocks[this.name].isPause;
	}

	set isPause(v) {
		if (Memory.Clocks[this.name]) Memory.Clocks[this.name].isPause = v;
	}

	init() {
		if (!Memory.Clocks) Memory.Clocks = {};

		if (!Memory.Clocks[this.name]) {
			Memory.Clocks[this.name] = {
				isPause: false,
				params: {},
			};
			this.params = this.initParams;
		} else return;

		if (this.autoRun) global.Clocks.addClock(this);
	}

	run() {
		if (!Memory.Clocks[this.name]) this.destory();
		if (!this.isPause && Game.time % this.tick === 0) {
			this.func(this.params);
		}
	}

	start() {
		this.isPause = false;
	}

	pause() {
		this.isPause = true;
	}

	destory() {
		delete global.Clocks[this.name];
		delete Memory.Clocks[this.name];
	}

	clean() {
		this.params = this.initParams;
	}
}

export { Clock };
