import { Manager } from './Manager';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
	}

	public run(): void {
		this.cleanMemory();
		_.forEach(Game.creeps, (creep: Creep) => {
			this.work(creep);
		});
		this.recordStats();
	}

	private work(creep: Creep): void {
		// TODO: 简单试例
		// if (_.isUndefined(creep.target)) return;
	}

	private cleanMemory(): void {
		_.forEach(Memory.creeps, (creep: CreepMemory, name: string) => {
			if (!Game.creeps[name]) {
				if (creep.hasBorn) delete Memory.creeps[name];
			} else {
				if (!Game.creeps[name].spawning) creep.hasBorn = true;
			}
		});
	}
}
