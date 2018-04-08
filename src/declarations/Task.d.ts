declare class Task {
	constructor(type: string, id: string);
	isExist: boolean;
	state: boolean;
	pos: number;
	room: number;
	targetOf: Creep[];
	targetOfCount: number;
	create(option?: object): void;
	setState(state: boolean): void;
	set(path: string, value: any): void;
	addTargetOf(creep: Creep): void;
	removeTargetOf(creep: Creep): void;
	remove(): void;
}
