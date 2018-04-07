import { ActionType } from '../enums/action';
import { Emoji } from '../utils/Emoji';

export abstract class Action {
	public name: ActionType;
	public creep: Creep;

	protected ERR_INVALID_ACTION: number = -100;

	constructor(name: ActionType) {
		this.name = name;
	}

	abstract run(creep: Creep): number;

	public work(creep: Creep) {
		try {
			return this.run(creep);
		} catch (e) {
			Log.debug(e);
			return this.ERR_INVALID_ACTION;
		}
	}

	// max allowed creeps per target
	abstract maxPerTarget: number;

	// range within which the action can be executed (e.g. upgrade controller = 3)
	abstract targetRange: number;

	abstract isValidTarget(): boolean;

	abstract isVaildAction(): boolean;

	public assign() {
		if (this.creep.action !== this.name && this.creep.actionStatus === false) {
			this.creep.say(Emoji[this.name]);
			this.creep.setAction(this.name);
			this.creep.setActionStatus(true);
		}
	}

	public unAssign() {
		if (this.creep.action === this.name && this.creep.actionStatus === true) {
			this.creep.setAction(undefined);
			this.creep.setActionStatus(false);
		}
	}
}
