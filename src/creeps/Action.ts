import { ActionType } from '../enums/action';

export abstract class Action {
	public name: ActionType;

	constructor(name: ActionType) {
		this.name = name;
	}

	abstract run(creep: Creep): void;
}
