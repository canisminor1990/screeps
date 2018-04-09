type Target = RoomObject | Flag | Room;

interface Action {
	[type: string]: any;

	name: string;

	work(creep: Creep): number;
}

interface Actions {
	harvest: Action;
	fuel: Action;
	build: Action;
	repair: Action;
	upgrade: Action;
}

interface ActionTask {
	id: string;
	pos: RoomPosition;
	room: string;
	state: boolean;
	targetOf: object;

	[type: string]: any;
}
