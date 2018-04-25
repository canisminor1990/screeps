import { RoomExtra } from '../Extra';

class LayoutExtra extends RoomExtra {
	constructor() {
		super('layout');
	}
	prototypeExtend = () => {
		this.assignRoomPrototype({
			resetLayout: {
				value(): void {
					this.memory.RBL = 0;
					this.memory.RDL = 0;
					Log.success(this.name, 'RBL/RDL are reseted.');
				},
			},
			resetCenter: {
				value(): void {
					delete this.memory.center;
					Log.success(this.name, 'center is reset.');
				},
			},
			setCenter: {
				value(x: number, y: number): void {
					this.memory.center = { x, y };
					Log.success(this.name, 'center set at', x, y);
				},
			},
		});
	};
}

export default new LayoutExtra();
