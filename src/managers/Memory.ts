import { Manager } from './Manager';
import { Emoji } from '../utils/Emoji';

export class MemoryManager extends Manager {
	constructor() {
		super('MemoryManager');
	}

	public run(): void {
		this.cleanCreepMemory();
		this.cleanRoomMemory();
		this.cleanTaskMemory();
		this.recordStats();
	}

	private cleanCreepMemory(): void {
		_.forEach(Memory.creeps, (creep: CreepMemory, name: string) => {
			if (!Game.creeps[name]) {
				if (creep.hasBorn) {
					delete Memory.creeps[name];
					console.log(Emoji.skull, Dye('black', creep.name, 'was dead'));
				}
			} else {
				if (!creep.hasBorn && !Game.creeps[name].spawning) {
					creep.hasBorn = true;
					Log.success(creep.name, 'was born !');
				}
			}
		});
	}

	private cleanRoomMemory(): void {
		if (_.isUndefined(Memory.rooms)) Memory.rooms = {};
		_.forEach(Object.keys(Memory.rooms), (roomMemory: any, name: string) => {
			if (Object.keys(roomMemory).length === 0) {
				delete Memory.rooms[name];
				return;
			}
			const timeCheck = roomMemory.time;
			if (!_.isUndefined(timeCheck) && timeCheck < Game.time - 10000 && !Game.rooms[name]) {
				delete Memory.rooms[name];
			}
		});
	}

	private cleanTaskMemory(): void {
		_.forEach(Memory.tasks, (typeTask, type) => {
			_.forEach(Object.keys(typeTask), (id: string) => {
				if (_.isNull(Game.getObjectById(id))) {
					delete Memory.tasks[type as string][id];
				}
			});
		});
	}
}
