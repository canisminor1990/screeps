import { ActionType } from '../enums/action';

export abstract class Action {
	public name: ActionType;
	public creep: Creep;

	protected ERR_INVALID_ACTION: number = -100;

	constructor(name: ActionType) {
		this.name = name;
	}

	abstract run(creep: Creep): number;

	// max allowed creeps per target
	abstract maxPerTarget: number;

	// range within which the action can be executed (e.g. upgrade controller = 3)
	abstract targetRange: number;

	abstract isValidTarget(): boolean;

	abstract isVaildAction(): boolean;

	public assign() {
		this.creep.setAction(this.name);
		this.creep.say(ActionType[this.name]);
	}
}
