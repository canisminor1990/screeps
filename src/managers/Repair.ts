import { Manager } from './Manager';
import { getRooms } from '../utils';
import { RoomType } from '../enums/room';
import { ActionType } from '../enums/action';
import { Task } from '../global/Task';

export class RepairManager extends Manager {
	constructor() {
		super('RepairManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			const needRepairs = _.filter(
				Array(0).concat(room.containers, room.roads),
				(s: Structure) => s.hits < Math.floor(s.hitsMax / 2),
			);

			const needRepairsDefend = _.filter(
				Array(0).concat(room.walls, room.ramparts),
				(s: Structure) => s.hits < MAX_REPAIR_LIMIT[room.rcl],
			);

			_.forEach(Array(0).concat(needRepairs, needRepairsDefend), (c: Structure) => {
				const task = new Task(ActionType.repair, c.id);
				if (!task.isExist) task.create();
			});
		});
		this.recordStats();
	}
}
