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
	private Y_LISTMARGIN: number = 1;

	public run = (room: Room): void => {
		this.vis = new RoomVisual(room.name);
		if (VISUALS.ROOM_ORDERS) this.drawRoomOrders(room, 'orders');
		if (VISUALS.ROOM_OFFERS) this.drawRoomOrders(room, 'offers');
		if (VISUALS.STORAGE) this.drawStoreInfo(room.storage);
		if (VISUALS.TERMINAL) this.drawStoreInfo(room.terminal);
	};
	private drawRoomOrders = (room: Room, type: string) => {
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources[type] || !_.size(room.memory.resources[type])) {
			return;
		}
		if (VISUALS.STORAGE && room.storage) {
			y += this.Y_PADDING + _.size(room.storage.store) * this.Y_LISTMARGIN;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += this.Y_PADDING + _.size(room.terminal.store) * this.Y_LISTMARGIN;
		}
		this.vis.text(`Room ${type}`, x, ++y, this.infoStyle);
		this._storageObject(room.memory.resources[type], x, y + this.Y_MAEGIN - 0.5);
	};
	private drawStoreInfo = (type: StructureStorage | StructureTerminal): void => {
		if (!type || !_.size(type.store)) return;
		const x = 1;
		let y = 1;
		this.vis.text(`Storage Contents`, x, ++y, this.infoStyle);
		const sum = type.sum;
		const capacity = type.storeCapacity;
		const text1 = `L: ${Util.formatNumber(capacity - sum)}`;
		const text2 = `${Util.formatNumber(sum)}/${Util.formatNumber(capacity)}`;
		this.vis.text(`${text1} (${text2})`, x, y + 1.2, this.subStyle);
		this._storageObject(type.store, x, y + this.Y_MAEGIN);
	};
	private _storageObject = (store: obj, x: number, startY: number) => {
		Object.keys(store).forEach(type => {
			const title: string = type === RESOURCE_ENERGY ? 'E' : type;
			this.vis.text(
				`${title}`,
				x,
				(startY += this.Y_LISTMARGIN),
				_.assign({ backgroundColor: this.getResourceColour(type) }, this.titleStyle),
			);
			this.vis.text(
				`${Util.formatNumber(store[type])}`,
				x + 2,
				startY,
				_.assign({ color: this.getResourceColour(type) }, this.objectStyle),
			);
		});
	};
}
