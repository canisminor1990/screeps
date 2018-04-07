interface CreepMemory {
	name: string;
	role: number;
	homeRoom: string;
	hasBorn: boolean;
	target: string | null;
	targetType: number | null;
	action: string;
}

interface CreepOrder {
	priority: number;
	body: BodyPartConstant[];
	memory: CreepMemory;
}

interface BodySetup {
	[type: string]: number;
}

interface Creep {
	target: RoomObject | Flag | Room | undefined;

	setTarget(target: RoomObject | Flag | Room): void;
}
