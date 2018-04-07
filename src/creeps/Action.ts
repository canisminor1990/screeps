import { ActionType } from '../enums/action';
import { Emoji } from '../utils/Emoji';

export abstract class Action {
	public name: ActionType;
	public creep: Creep;
	public target: RoomObject;

	protected ERR_INVALID_ACTION: number = -100;

	constructor(name: ActionType) {
		this.name = name;
	}

	abstract run(): number;

	public work(creep: Creep): number {
		if (_.isUndefined(creep.actionStatus)) creep.setActionStatus(false);
		if (_.isUndefined(creep.action)) creep.setAction(this.name);
		this.creep = creep;
		return this.run();
	}

	// max allowed creeps per target
	abstract maxPerTarget: number;

	// range within which the action can be executed (e.g. upgrade controller = 3)
	abstract targetRange: number;

	abstract isValidTarget(): boolean;

	abstract isVaildAction(): boolean;

	public assign() {
		this.creep.room.visual.line(this.creep.pos, this.target.pos, { width: 0.2, opacity: 0.2 });
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
