import { Manager } from './Manager';

export class RoomManager extends Manager {
	room: Room;

	constructor(room: Room) {
		super('RoomManager');
		this.room = room;
	}

	statistic() {}
}
