import { ActionType } from '../enums/action';
import { Emoji } from '../utils/Emoji';
import { Task, getTaskList } from '../global/Task';
import { getDistanseBetween } from '../utils/PathUtils';

export abstract class Action {
	public name: ActionType;
	public creep: Creep;
	public target: RoomObject;
	public task: ActionTask;

	protected ERR_INVALID_ACTION: number = -100;

	constructor(name: ActionType) {
		this.name = name;
	}

	abstract run(): number;

	abstract action(): number;

	abstract actionCheck(): boolean;

	public work(creep: Creep): number {
		this.creep = creep;
		if (this.actionCheck()) {
			this.unAssign();
			return -1;
		}
		return this.run();
	}

	get taskList() {
		return _.filter(getTaskList(this.name), (task: ActionTask) => task.state && task.room === this.creep.room.name);
	}

	public getMinDistanseTask(tasklist: ActionTask[]) {
		let minDistanseTask: any = tasklist[0];
		let minDistanse: number = 999;
		_.forEach(tasklist, (task: ActionTask) => {
			let distance = getDistanseBetween(task.pos, this.creep.pos);
			if (distance < minDistanse) {
				minDistanse = distance;
				minDistanseTask = task;
			}
		});
		return minDistanseTask;
	}

	abstract findNewTask(): any;

	public getMemoryTask(): void {
		const Target = this.creep.target;
		if (Target !== undefined) {
			this.target = Target;
		} else {
			this.findNewTask();
		}
	}

	public assign(): void {
		if (!this.task) return Log.error(this.creep.name, this.name, 'wrong task');
		const Target = Game.getObjectById(this.task.id) as RoomObject;
		if (Target === null) {
			return Log.error(this.creep.name, this.name, 'wrong target');
		} else {
			this.creep.room.visual.line(this.creep.pos, this.task.pos, { width: 0.2, opacity: 0.2 });
			this.creep.say(Emoji[this.name]);
			this.creep.setAction(this.name);
			this.creep.setTarget(Target);
			this.target = Target;
			new Task(this.name, this.task.id).addTargetOf(this.creep.name);
		}
	}

	public unAssign(): void {
		this.creep.setAction(ActionType.none);
		new Task(this.name, this.creep.memory.target as string).removeTargetOf(this.creep.name);
	}
}
