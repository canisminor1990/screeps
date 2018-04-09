import { Manager } from './Manager';
import { getRooms } from '../utils';
import { RoomType } from '../enums/room';
import { ActionType } from '../enums/action';
import { Task } from '../global/Task';

export class FuelManager extends Manager {
	constructor() {
		super('FuelManager');
	}

	public run(): void {
		_.forEach(getRooms(RoomType.home), (room: Room) => {
			const structures = _.filter(Array(0).concat(room.spawns, room.extensions), s => s.energy < s.energyCapacity);
			_.forEach(structures, s => {
				const task = new Task(ActionType.fuel, s.id);
				if (!task.isExist) task.create({ needEnergy: s.energyCapacity - s.energy });
			});
		});
		this.recordStats();
	}
}
