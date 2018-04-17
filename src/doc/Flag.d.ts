interface FlagList {
	name: string;
	color: string;
	secondaryColor: string;
	roomName: string;
	x: number;
	y: number;
	cloaking: number;
	filter?: FlagFilter;
}
interface FlagFilter {
	color: string;
	secondaryColor: string;
}

interface FlagConstructor {
	list: FlagList[];
	stale: string[];

	// Event
	found: Event;
	FlagRemoved: Event;

	// Loop
	fresh(): void;

	register(): void;

	analyze(): boolean;

	run(): void;

	cleanup(): void;

	// Extend
	flagFilter(flagColour: obj): obj | void;

	findName(flagColor: Function | obj, pos: RoomPosition | Room, local?: boolean, mod?: Function, modArgs?: any): any;

	find(flagColor: Function | obj, pos: RoomPosition | Room, local?: boolean, mod?: Function, modArgs?: any): Flag;

	removeFromDir(name: string): void;

	count(flagColor: Function | obj, pos: RoomPosition | Room, local?: boolean): number;

	filter(flagColor: Function | obj, pos: RoomPosition | Room, local?: boolean): Flag[];

	filterCustom(filter: Function): Flag[];

	rangeMod(range: number, flagItem: Flag, args: obj): number;

	exploitMod(range: number, flagItem: Flag, creepName: string): number;

	_hasInvasionFlag: boolean;

	hasInvasionFlag(): boolean;

	extend(): void;

	fresh(): void;

	run(): void;

	cleanup(): void;

	flagType(flag: Flag): string;

	specialFlag(create: boolean): Flag;

	isSpecialFlag(object: Flag): boolean;
}

interface Flag {
	targetOf: CreepMemory[];
	creeps: obj;
	print: string;
	cloaking: number;

	compareTo(flag: Flag): boolean;
}
