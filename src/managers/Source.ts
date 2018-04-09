import { Manager } from './Manager';
import { getRooms } from '../utils';
import { RoomType } from '../enums/room';
import { ActionType } from '../enums/action';
import { Task } from '../global/Task';

export class SourceManager extends Manager {
	constructor() {
		super('SourceManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			_.forEach(room.sources, (source: Source) => {
				const task = new Task(ActionType.harvest, source.id);
				if (!task.isExist) task.create({ maxPerTarget: source.pos.getFreeSpaces(1).length });
				task.setState(source.active);
			});
		});
		this.recordStats();
	}
}
