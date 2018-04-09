import { Manager } from './Manager';
import { getRooms } from '../utils';
import { RoomType } from '../enums/room';
import { ActionType } from '../enums/action';
import { Task } from '../global/Task';

export class UpgradeManager extends Manager {
	constructor() {
		super('UpgradeManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			if (room.controller) {
				const task = new Task(ActionType.upgrade, room.controller.id);
				if (!task.isExist) task.create();
			}
		});
		this.recordStats();
	}
}
