export abstract class Manager {
	private name: string;

	constructor(name: string) {
		this.name = name;
		this.memoryCheck();
	}

	abstract run(): void;

	protected memoryCheck() {
		if (_.isUndefined(Memory.managers)) Memory.managers = {};
		if (_.isUndefined(Memory.managers[this.name])) Memory.managers[this.name] = {};
	}

	protected get memory(): any {
		return Memory.managers[this.name];
	}

	protected set memory(value: any) {
		Memory.managers[this.name] = value;
	}

	protected getValue(manager: string, path: string) {
		return _.get(Memory.managers, [manager, path]);
	}

	protected setValue(manager: string, path: string, value: any): void {
		_.set(Memory.managers, [manager, path], value);
	}

	protected recordStats() {
		// TODO: 添加其他运行信息
		this.memory.time = Game.time;
	}
}
