import { ActionType } from '../../enums/action';
import { Action } from '../Action';
import { getDistanseBetween } from '../../utils/PathUtils';
import { Task } from '../../global/Task';

export class RepairAction extends Action {
	target: Structure;

	constructor() {
		super(ActionType.repair);
	}

	maxPerTarget: number = 1;

	targetRange: number = 3;

	public run(): number {
		if (this.creep.action === this.name && this.creep.memory.target) {
			this.getMemoryTask();
			if (_.isUndefined(this.target)) this.unAssign();
		} else {
			if (this.findNewTask() == null) return ERR_INVALID_TARGET;
			this.assign();
		}
		const callback = this.action();
		if (callback !== OK || this.actionCheck()) this.unAssign();
		if (this.target.hits === this.target.hitsMax || this.target.hits >= MAX_REPAIR_LIMIT[this.creep.room.rcl]) {
			new Task(this.name, this.target.id).remove();
			this.unAssign();
		}
		return callback;
	}

	findNewTask(): any {
		let tasks = _.filter(this.taskList, (task: ActionTask) => Object.keys(task.targetOf).length < this.maxPerTarget);
		if (tasks.length === 0) return null;
		this.task = this.getMinDistanseTask(tasks);
		return OK;
	}

	action(): number {
		if (getDistanseBetween(this.creep.pos, this.target.pos) <= this.targetRange) {
			return this.creep.repair(this.target);
		} else {
			return this.creep.travelTo(this.target);
		}
	}

	actionCheck(): boolean {
		return this.creep.isEmpty;
	}
}
