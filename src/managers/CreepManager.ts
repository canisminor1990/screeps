import { Manager } from './Manager';

export class CreepManager extends Manager {
	constructor() {
		super('CreepManager');
	}

	public run(): void {
		this.cleanMemory();
	}

	private cleanMemory(): void {
		_.forEach(Object.keys(Memory.creeps), (name: string) => {
			if (!Game.creeps[name]) delete Memory.creeps[name];
		});
	}
}
