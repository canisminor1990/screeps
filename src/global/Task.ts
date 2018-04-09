import { ActionType } from '../enums/action';

export class Task {
	type: string;
	id: string;
	exist: boolean;

	constructor(type: string, id: string) {
		this.checkMemory();
		this.type = type;
		this.id = id;
		this.exist = !_.isUndefined(_.get(Memory.tasks, [this.type, this.id]));
	}

	private checkMemory(): void {
		if (_.isUndefined(Memory.tasks)) Memory.tasks = {};
	}

	get isExist(): boolean {
		return this.exist;
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
		let creeps: Creep[] = [];
		_.forEach(_.get(Memory.tasks, [this.type, this.id, 'targetOf']), (name: string) => {
			creeps.push(Game.creeps[name]);
		});
		return _.compact(creeps);
	}

	get targetOfCount(): number {
		const targetOf = _.get(Memory.tasks, [this.type, this.id, 'targetOf']);
		return Object.keys(targetOf).length;
	}

	public create(option?: { [type: string]: any }): void {
		const target = Game.getObjectById(this.id) as any;
		if (target === null) return Log.error(ERR_INVALID_TARGET);
		const value = {
			id: target.id,
			room: target.room.name,
			pos: target.pos.raw,
			targetOf: {},
			state: true,
			...option,
		};
		_.set(Memory.tasks, [this.type, this.id], value);
		this.exist = true;
	}

	public setState(state: boolean): void {
		_.set(Memory.tasks, [this.type, this.id, 'state'], state);
	}

	public set(value: { [type: string]: any }): void {
		const Value = _.assign(_.get(Memory.tasks, [this.type, this.id]), value);
		_.set(Memory.tasks, [this.type, this.id], Value);
	}

	public addTargetOf(name: string): void {
		_.set(Memory.tasks, [this.type, this.id, 'targetOf', name], true);
	}

	public removeTargetOf(name: string): void {
		try {
			delete Memory.tasks[this.type][this.id]['targetOf'][name];
		} catch (e) {}
	}

	public remove(): void {
		try {
			delete Memory.tasks[this.type][this.id];
		} catch (e) {}
	}
}

export function getTaskList(type: ActionType) {
	return Memory.tasks[type];
}
