import { Manager } from './Manager';
import { Behaviours } from '../creeps/behaviours';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
	}

	public run(): void {
		_.forEach(Memory.creeps, (creep: CreepMemory) => {
			if (!creep.name || !creep.hasBorn) return;
			const Creep = Game.creeps[creep.name];
			if (_.isUndefined(Creep)) return;
			Behaviours[creep.role].run(Creep);
		});
		this.recordStats();
	}
}
