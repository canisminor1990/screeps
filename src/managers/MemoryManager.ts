import { Manager } from './Manager';

export class MemoryManager extends Manager {
	readonly ROOM_MEMORY_TIMECHECK = 100000;

	constructor() {
		super('MemoryManager');
	}

	public run(): void {
		this.cleanCreepsMemory();
		this.cleanRoomsMemory();
	}

	private cleanCreepsMemory(): void {
		_.forEach(Object.keys(Memory.creeps), (name: string) => {
			if (!Game.creeps[name]) delete Memory.creeps[name];
		});
	}

	private cleanRoomsMemory(): void {
		_.forEach(Object.keys(Memory.rooms), (roomMemory: any, name: string) => {
			if (Object.keys(roomMemory).length === 0) {
				delete Memory.rooms[name];
				return;
			}
			const timeCheck = roomMemory._time;
			if (!_.isUndefined(timeCheck) && timeCheck < Game.time - this.ROOM_MEMORY_TIMECHECK && !Game.rooms[name]) {
				delete Memory.rooms[name];
			}
		});
	}
}
