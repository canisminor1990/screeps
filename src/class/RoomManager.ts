export class RoomManager {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	extend = () => {
		this.prototypeExtend();
		this.roomExtend();
	};
	prototypeExtend = () => {};
	roomExtend = () => {};
	assignRoomPrototype = (value: obj) => {
		Object.defineProperties(Room.prototype, value);
	};
	assignRoom = (value: obj) => {
		_.assign(Room, value);
	};
}
