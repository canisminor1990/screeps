interface CreepMemory {
	name: string;
	role: number;
	homeRoom: string;
	hasBorn: boolean;
}

interface CreepOrder {
	priority: number;
	body: BodyPartConstant[];
	memory: CreepMemory;
}

interface BodySetup {
	[type: string]: number;
}
