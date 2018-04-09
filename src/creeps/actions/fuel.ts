import { ActionType } from '../../enums/action';
import { Action } from '../Action';
import { Task } from '../../global/Task';
import { getDistanseBetween } from '../../utils/PathUtils';

export class FuelAction extends Action {
	target: StructureSpawn | StructureExtension;

	constructor() {
		super(ActionType.fuel);
	}

	targetRange: number = 1;

	public run(): number {
		if (this.creep.action === this.name && this.creep.memory.target) {
			this.getMemoryTask();
		} else {
			if (this.findNewTask() == null) return ERR_INVALID_TARGET;
			this.assign();
			const needEnergy = this.target.energyCapacity - this.target.energy - this.creep.carry.energy;
			let task = new Task(this.name, this.task.id);
			needEnergy <= 0 ? task.remove() : task.set({ needEnergy: needEnergy });
		}
		const callback = this.action();
		if (callback !== OK || this.actionCheck()) this.unAssign();
		return callback;
	}

	findNewTask() {
		let tasks = _.filter(this.taskList, (task: ActionTask) => task.needEnergy > 0);
		if (tasks.length === 0) return null;
		this.task = this.getMinDistanseTask(tasks);
		return OK;
	}

	action(): number {
		if (getDistanseBetween(this.creep.pos, this.target.pos) <= this.targetRange) {
			return this.creep.transfer(this.target, RESOURCE_ENERGY);
		} else {
			return this.creep.travelTo(this.target);
		}
	}

	actionCheck(): boolean {
		return this.creep.isEmpty;
	}
}
