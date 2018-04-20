import { VisualsBase } from './base';

export class Sidebar extends VisualsBase {
	private infoStyle: TextStyle = {
		align: 'left',
		font: '0.8 Hack',
		backgroundColor: 'rgba(0,0,0,.5)',
	};
	private objectStyle: TextStyle = {
		align: 'left',
		font: '0.6 Hack',
		backgroundColor: 'rgba(0,0,0,.1)',
		backgroundPadding: 0.2,
	};
	private titleStyle: TextStyle = {
		align: 'left',
		font: 'bold 0.5 Hack',
		color: 'rgba(0,0,0,.7)',
		backgroundPadding: 0.2,
	};
	private subStyle: TextStyle = {
		align: 'left',
		font: '0.4 Hack',
		opacity: 0.7,
	};
	private Y_PADDING: number = 3;
	private Y_MAEGIN: number = 1.2;
	private Y_LIST_MARGIN: number = 1;

	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		if (VISUALS.ROOM_ORDERS) this.drawRoomOrders(room, 'orders');
		if (VISUALS.ROOM_OFFERS) this.drawRoomOrders(room, 'offers');
		if (VISUALS.STORAGE) this.drawStoreInfo(room, 'storage');
		if (VISUALS.TERMINAL) this.drawStoreInfo(room, 'terminal');
	};
	private drawRoomOrders = (room: Room, type: string) => {
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources[type] || !_.size(room.memory.resources[type])) {
			return;
		}
		if (VISUALS.STORAGE && room.storage) {
			y += this.Y_PADDING + _.size(room.storage.store) * this.Y_LIST_MARGIN;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += this.Y_PADDING + _.size(room.terminal.store) * this.Y_LIST_MARGIN;
		}
		if (type === 'offers' && VISUALS.ROOM_ORDERS && room.memory.resources.orders) {
			y += this.Y_PADDING + _.size(room.memory.resources.orders) * this.Y_LIST_MARGIN;
		}
		this.vis.text(`Room ${_.capitalize(type)}`, x, ++y, this.infoStyle);
		this._roomOrdersObject(room.memory.resources[type], x, y + this.Y_MAEGIN - 0.5);
	};
	private drawStoreInfo = (room: Room, type: string): void => {
		const structure: StructureStorage | StructureTerminal = room[type];
		if (!structure || !_.size(structure.store)) return;
		const x = 1;
		let y = 1;
		if (type === 'terminal' && VISUALS.STORAGE && room.storage) {
			y += this.Y_PADDING + _.size(room.storage.store) * this.Y_LIST_MARGIN;
		}
		this.vis.text(`${_.capitalize(type)} Contents`, x, ++y, this.infoStyle);
		const sum = structure.sum;
		const capacity = structure.storeCapacity;
		const text1 = `L: ${Util.formatNumber(capacity - sum)}`;
		const text2 = `${Util.formatNumber(sum)}/${Util.formatNumber(capacity)}`;
		this.vis.text(`${text1} (${text2})`, x, y + 1.2, this.subStyle);
		this._storageObject(structure.store, x, y + this.Y_MAEGIN);
	};
	private _drawList = (x, y, type, amount) => {
		const title: string = type === RESOURCE_ENERGY ? 'E' : type;
		const backgroundColor = this.getResourceColour(type);
		this.vis.text(`${title}`, x, y, _.assign({ backgroundColor }, this.titleStyle));
		this.vis.text(`${Util.formatNumber(amount)}`, x + 2, y, _.assign({ backgroundColor }, this.objectStyle));
	};
	private _roomOrdersObject = (store: obj, x: number, startY: number) => {
		_.forEach(store, order => this._drawList(x, (startY += this.Y_LIST_MARGIN), order.type, order.amount));
	};
	private _storageObject = (store: obj, x: number, startY: number) => {
		_.forEach(Object.keys(store), type => this._drawList(x, (startY += this.Y_LIST_MARGIN), type, store[type]));
	};
}
