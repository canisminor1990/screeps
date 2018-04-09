type Target = RoomObject | Flag | Room;

interface Actions {}

interface ActionTask {
	id: string;
	pos: Pos;
	room: string;
	state: boolean;
	targetOf: object;
	[type: string]: any;
}
