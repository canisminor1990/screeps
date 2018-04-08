import { Manager } from './Manager';
import { Emoji } from '../utils/Emoji';
import { Behaviours } from '../creeps/behaviours';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
	}

	public run(): void {
		this.cleanMemory();
		_.forEach(Memory.creeps, (creep: CreepMemory) => {
			if (!creep.name || !creep.hasBorn) return;
			const Creep = Game.creeps[creep.name];
			if (_.isUndefined(Creep)) return;
			Behaviours[creep.role].run(Creep);
		});
		this.recordStats();
	}

	private cleanMemory(): void {
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
}
