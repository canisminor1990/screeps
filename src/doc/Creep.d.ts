interface CreepMemory {
	creepType: string;
	creepName: string;
}

interface CreepConstructor {
	resolvingError: any;
	error: obj;
	Setup: obj;
	Action: any;
	Behaviour: any;
	setup: obj;
	action: obj;
	behaviour: obj;

	spawningStarted: Event;
	spawningCompleted: Event;
	predictedRenewal: Event;
	died: Event;
	error: Event;

	extend(): void;

	bodyCosts(body: obj): number;

	multi(room: Room, params?: obj): number;

	partsComparator(a: string, b: string): number;

	formatParts(parts: string[] | obj): string[];

	formatBody(fixedBody: string[] | obj, multiBody: string[] | obj): obj;

	compileBody(room: Room, params: obj, sort: boolean = true): string[];

	bodyThreat(body: obj): number;
}

interface CreepAction {
	assign(creep: Creep, target: RoomObject): boolean;
}

interface CreepBehaviour {
	assign(creep: Creep): boolean;
}

interface Creep {
	// prototype
	data: {
		flee: boolean;
		creepType: string;
		flagName: string;
	};
	trace: boolean;
	flee: number | void;
	sum: number;
	carries: obj;
	threat: number;
	action: obj;
	behaviour: obj;
	resolvingError: obj;

	assignAction(action: CreepAction | string, target: RoomObject): boolean;

	assignBehaviour(behaviour: CreepBehaviour | string): boolean;

	findGroupMemberByType(creepType: string, flagName: string): string | null;

	findGroupMemberBy(findFunc: Function, flagName: string): string | null;

	findByType(creepType: string): string | undefined;

	getBodyparts(type: string): number;

	hasActiveBodyparts(partTypes: string): boolean;

	hasBodyparts(partTypes: string | string[], start?: number): boolean;

	run(behaviour?: any): void;

	leaveBorder(): number;

	honk(): void;

	honkEvade(): void;

	fleeMove(): void;

	idleMove(): any;

	repairNearby(): void;

	buildNearby(): void;

	controllerSign(): void;

	handleError(errorData: obj): void;

	travelTo(destination: any, options?: obj): number;

	staticCustomStrategy(actionName: string, behaviourName: string, taskName: string): any;

	customStrategy(actionName: string, behaviourName: string, taskName: string): any;

	getStrategyHandler(ids: string[], method: string, ...args: any[]);
}
