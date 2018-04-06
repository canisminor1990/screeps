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
			if (creep.hasBorn && !Game.creeps[name]) delete Memory.creeps[name];
		});
	}
}
