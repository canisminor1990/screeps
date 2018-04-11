interface CreepConstructor {
	resolvingError: any;
	error: obj;
	Action: any;
	Behaviour: any;
	action: obj;
	behaviour: obj;
	setup: obj;

	bodyCosts(body: obj): number;

	multi(room: Room, params?: obj): number;

	partsComparator(a: string, b: string): number;

	formatParts(parts: string[] | obj): string[];

	formatBody(fixedBody: string[] | obj, multiBody: string[] | obj): obj;

	compileBody(room: Room, params: obj, sort: boolean = true): string[];

	bodyThreat(body: obj): number;
}

interface Creep {
	// prototype
	data: obj;
	flee: number | void;
	_sumSet: number;
	_sum: number;
	sum: number;
	_carrySet: number;
	_carries: obj;
	carries: obj;
	_threat: number;
	threat: number;
	trace: boolean;
	action: obj;
	behaviour: obj;
	resolvingError: obj;

	assignAction(action: any, target: any): any;

	assignBehaviour(behaviour: any): any;

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

	repairNearby(): void;

	buildNearby(): void;

	controllerSign(): void;

	handleError(errorData: obj): void;

	travelTo(destination: any, options?: obj): number;

	staticCustomStrategy(actionName: string, behaviourName: string, taskName: string): any;

	customStrategy(actionName: string, behaviourName: string, taskName: string): any;
}

interface CreepMemory {
	creepType: string;
	creepName: string;
}
