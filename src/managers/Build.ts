import { Manager } from './Manager';
import { getRooms } from '../utils';
import { RoomType } from '../enums/room';
import { ActionType } from '../enums/action';
import { Task } from '../global/Task';

export class BuildManager extends Manager {
	constructor() {
		super('BuildManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			_.forEach(room.constructionSites, (c: ConstructionSite) => {
				const task = new Task(ActionType.build, c.id);
				if (!task.isExist) task.create();
			});
		});
		this.recordStats();
	}
}
