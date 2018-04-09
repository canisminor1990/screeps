interface CreepMemory {
	name?: string;
	role: number;
	homeRoom: string;
	hasBorn?: boolean;
	target?: string | null;
	targetType?: number | null;
	action?: string;
	actionStatus?: boolean;
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
	actionStatus: boolean;
	target: RoomObject | Flag | Room | undefined;
	totalCarry: number;
	isEmpty: boolean;
	isFull: boolean;
	missingHits: number;
	isHurt: boolean;

	setTarget(target: RoomObject | Flag | Room): void;

	setAction(action: string): void;

	setActionStatus(status: boolean): void;

	getBodyparts(partTypes: BodyPartConstant): number;

	hasBodyparts(partTypes: BodyPartConstant | BodyPartConstant[], start?: number): boolean;

	hasActiveBodyparts(partTypes: BodyPartConstant | BodyPartConstant[]): boolean;
}
