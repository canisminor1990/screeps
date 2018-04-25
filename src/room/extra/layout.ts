import { RoomExtra } from '../Extra';

class LayoutExtra extends RoomExtra {
	constructor() {
		super('layout');
	}
	prototypeExtend = () => {
		this.assignRoomPrototype({
			setCenter: {
				value(roomName: string, x: number, y: number): void {
					this.memory.center = { x, y };
					Log.success(roomName, 'center set at', x, y);
				},
			},
		});
	};
}

export default new LayoutExtra();
