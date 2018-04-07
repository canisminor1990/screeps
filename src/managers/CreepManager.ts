import { Manager } from './Manager';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
	}

	public run(): void {
		this.cleanMemory();
		this.recordStats();
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
