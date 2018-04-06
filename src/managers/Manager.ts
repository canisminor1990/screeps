export abstract class Manager {
	private name: string;

	constructor(name: string) {
		this.name = name;
		this.memoryCheck();
	}

	abstract run(): void;

	protected memoryCheck() {
		if (_.isUndefined(Memory.manager)) Memory.manager = {};
		if (_.isUndefined(Memory.manager[this.name])) Memory.manager[this.name] = {};
	}

	protected get memory(): any {
		return Memory.manager[this.name];
	}

	protected set memory(value: any) {
		Memory.manager[this.name] = value;
	}

	protected getValue(manager: string, path: string) {
		return _.get(Memory.manager, [manager, path]);
	}

	protected setValue(manager: string, path: string, value: any): void {
		_.set(Memory.manager, [manager, path], value);
	}

	protected recordStats() {
		// TODO: 添加其他运行信息
		this.memory.time = Game.time;
	}
}
