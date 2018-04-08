export class Task {
	type: string;
	id: string;
	isExist: boolean;

	constructor(type: string, id: string) {
		this.checkMemory();
		this.type = type;
		this.id = id;
		this.isExist = !_.isUndefined(_.get(Memory.tasks, [this.type, this.id]));
	}

	private checkMemory(): void {
		if (_.isUndefined(Memory.tasks)) Memory.tasks = {};
	}

	get isExist(): boolean {
		return this.isExist;
	}

	get state(): boolean {
		return _.get(Memory.tasks, [this.type, this.id, 'state']);
	}

	get pos(): number {
		return _.get(Memory.tasks, [this.type, this.id, 'pos']);
	}

	get room(): number {
		return _.get(Memory.tasks, [this.type, this.id, 'room']);
	}

	get targetOf(): Creep[] {
		let creeps = [];
		_.forEach(_.get(Memory.tasks, [this.type, this.id, 'targetOf']), (name: string) => {
			creeps.push(Game.creeps[name]);
		});
		return _.compact(creeps);
	}

	get targetOfCount(): number {
		return _.get(Memory.tasks, [this.type, this.id, 'targetOf']).length;
	}

	public create(option?: object): void {
		const target = Game.getObjectById(this.id);
		_.set(Memory.tasks, [this.type, this.id], {
			room: target.room,
			pos: target.pos.raw,
			targetOf: {},
			state: true,
			...option,
		});
		this.isExist = true;
	}

	public setState(state: boolean): void {
		_.set(Memory.tasks, [this.type, this.id, 'state'], state);
	}

	public set(path: string, value: any): void {
		_.set(Memory.tasks, [this.type, this.id, path], value);
	}

	public addTargetOf(creep: Creep): void {
		_.set(Memory.tasks, [this.type, this.id, 'targetOf', creep.name], true);
	}

	public removeTargetOf(creep: Creep): void {
		try {
			delete Memory.tasks[this.type][this.id]['targetOf'][creep.name];
		} catch (e) {}
	}

	public remove(): void {
		try {
			delete Memory.tasks[this.type][this.id];
		} catch (e) {}
	}
}
