import { RoleType } from '../../enums/creep';
import { Behaviour } from '../Behaviour';
import { Actions } from '../actions';
import { Action } from '../Action';

export class WorkerBehavior extends Behaviour {
	private creep: Creep;

	constructor() {
		super(RoleType.worker);
	}

	private priority = [Actions.harvest, Actions.fuel, Actions.upgrade];

	private buildActionFlow() {
		let actionFlow = this.priority;
		if (this.creep.room.controller && this.creep.room.controller.ticksToDowngrade < 2000) {
			actionFlow.unshift(Actions.upgrade);
		}
		return actionFlow;
	}

	public run(creep: Creep): void {
		this.creep = creep;
		let runNextAction = true;
		_.forEach(this.buildActionFlow(), (action: Action) => {
			if (!runNextAction) return;
			const callback = action.run(creep);
			if (callback === OK) runNextAction = false;
		});
	}
}
