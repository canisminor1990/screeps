import { ActionType } from '../../enums/action';
import { Action } from '../Action';

export class HarvestAction extends Action {
	private creep: Creep;

	constructor() {
		super(ActionType.harvest);
	}

	public run(creep: Creep): void {
		this.creep = creep;
	}
}
