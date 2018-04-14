declare const Flag: FlagConstructor;

interface FlagConstructor {
	stale: obj;
	list: Flag[];

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

	flush(): void;

	execute(): void;

	cleanup(): void;

	flagType(flag: Flag): string;

	specialFlag(create: boolean): Flag;

	isSpecialFlag(object: Flag): boolean;
}
