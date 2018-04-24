export class RoomExtra {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	extend = () => {
		this.prototypeExtend();
		this.roomManagerExtend();
	};
	prototypeExtend = () => {};
	roomManagerExtend = () => {};
	assignRoomPrototype = (value: obj) => {
		Object.defineProperties(Room.prototype, value);
	};
	assignRoomManager = (value: obj) => {
		_.assign(RoomManager, value);
	};
}
