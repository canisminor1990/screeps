import { ActionType } from '../../enums/action';
import { Action } from '../Action';
import { getDistanseBetween } from '../../utils/PathUtils';

export class UpgradeAction extends Action {
	target: StructureController;

	constructor() {
		super(ActionType.upgrade);
	}

	maxPerTarget: number = 9;

	targetRange: number = 3;

	public run(): number {
		if (this.creep.action === this.name && this.creep.memory.target) {
			this.getMemoryTask();
		} else {
			if (this.findNewTask() == null) return ERR_INVALID_TARGET;
			this.assign();
		}
		const callback = this.action();
		if (callback !== OK || this.actionCheck()) this.unAssign();
		return callback;
	}

	findNewTask() {
		let tasks = _.filter(this.taskList, (task: ActionTask) => Object.keys(task.targetOf).length < this.maxPerTarget);
		if (tasks.length === 0) return null;
		this.task = this.getMinDistanseTask(tasks);
		return OK;
	}

	action(): number {
		if (getDistanseBetween(this.creep.pos, this.target.pos) <= this.targetRange) {
			return this.creep.upgradeController(this.target);
		} else {
			return this.creep.travelTo(this.target);
		}
	}

	actionCheck(): boolean {
		return this.creep.isEmpty;
	}
}
