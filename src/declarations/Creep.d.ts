interface CreepMemory {
	name?: string;
	role: number;
	homeRoom: string;
	hasBorn?: boolean;
	target?: string | null;
	targetType?: number | null;
	action?: string;
}

interface CreepOrder {
	priority: number;
	body: BodyPartConstant[];
	memory: CreepMemory;
}

interface Creep {
	role: number;
	homeRoom: Room;
	isInHomeRoom: boolean;
	action: string;
	target: RoomObject | Flag | Room | undefined;
	totalCarry: number;
	isEmpty: boolean;
	isFull: boolean;
	missingHits: number;
	isHurt: boolean;

	setTarget(target: RoomObject | Flag | Room): void;

	setAction(action: string): void;

	getBodyparts(partTypes: BodyPartConstant): number;

	hasBodyparts(partTypes: BodyPartConstant | BodyPartConstant[], start?: number): boolean;

	hasActiveBodyparts(partTypes: BodyPartConstant | BodyPartConstant[]): boolean;
}
