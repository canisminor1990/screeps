import { RoleType } from '../../enums/creep';
import { Behaviour } from '../Behaviour';
import { Actions } from '../actions';
import { Action } from '../Action';
import { ActionType } from '../../enums/action';
import { Emoji } from '../../utils/Emoji';

export class WorkerBehavior extends Behaviour {
	private creep: Creep;

	constructor() {
		super(RoleType.worker);
	}

	private priority = [
		Actions.harvest,
		Actions.fuel,
		// Actions.build,
		Actions.upgrade,
	];

	private buildActionFlow() {
		let actionFlow = this.priority;
		if (this.creep.room.controller && this.creep.room.controller.ticksToDowngrade < 2000) {
			actionFlow.unshift(Actions.upgrade);
		}
		return actionFlow;
	}

	public run(creep: Creep): void {
		this.creep = creep;
		if (_.isUndefined(creep.action) || creep.action === ActionType.none) {
			let runNextAction = true;
			_.forEach(this.buildActionFlow(), (action: Action) => {
				if (!runNextAction) return;
				const callback = action.work(creep);
				if (callback === OK) runNextAction = false;
			});
		} else {
			Actions[creep.action as string].work(creep);
		}
		if (creep.action === ActionType.none) creep.say(Emoji.wait);
	}
}
