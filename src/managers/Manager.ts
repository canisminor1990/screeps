export abstract class Manager {
	private name: string;

	constructor(name: string) {
		this.name = name;
		this.memoryCheck();
	}

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
}
