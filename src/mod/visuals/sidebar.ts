import { VisualsBase } from './base';

class Sidebar extends VisualsBase {
	infoStyle = {
		align: 'left',
		font: '0.5 Menlo',
		backgroundColor: 'rgba(0,0,0,.5)',
	};
	objectStyle = {
		align: 'left',
		font: '0.3 Menlo',
	};

	drawRoomOrders = room => {
		const vis = new RoomVisual(room.name);
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources.orders || !_.size(room.memory.resources.orders)) {
			return;
		}

		if (VISUALS.STORAGE && room.storage) {
			y += 2 + _.size(room.storage.store) * 0.6;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += 2 + _.size(room.terminal.store) * 0.6;
		}
		vis.text('Room Orders', x, ++y, this.infoStyle);
		this._roomOrdersObject(vis, room.memory.resources.orders, x, y + 0.2);
	};
	drawRoomOffers = room => {
		const vis = new RoomVisual(room.name);
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources.offers || !_.size(room.memory.resources.offers)) {
			return;
		}
		if (VISUALS.STORAGE && room.storage) {
			y += 2 + _.size(room.storage.store) * 0.6;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += 2 + _.size(room.terminal.store) * 0.6;
		}
		if (VISUALS.ROOM_ORDERS && room.memory.resources.orders) {
			y += 2 + _.size(room.memory.resources.orders) * 0.6;
		}
		vis.text('Room Offerings', x, ++y, this.infoStyle);
		this._roomOrdersObject(vis, room.memory.resources.offers, x, y + 0.2);
	};
	drawStorageInfo = storage => {
		if (!storage || !_.size(storage.store)) return;
		const vis = new RoomVisual(storage.room.name);
		const x = 1;
		let y = 1;
		vis.text('Storage Contents', x, ++y, this.infoStyle);
		this._storageObject(vis, storage.store, x, y + 0.2);
	};
	drawTerminalInfo = terminal => {
		if (!terminal || !_.size(terminal.store)) return;
		const vis = new RoomVisual(terminal.room.name);
		const x = 1;
		let y = 1;
		if (VISUALS.STORAGE && terminal.room.storage) {
			y += 2 + _.size(terminal.room.storage.store) * 0.6;
		}
		vis.text('Terminal Contents', x, ++y, this.infoStyle);
		this._storageObject(vis, terminal.store, x, y + 0.2);
	};

	private _roomOrdersObject = (vis, store, x, startY) => {
		for (let order of store) {
			const title = order.type === RESOURCE_ENERGY ? 'E' : order.type;
			vis.text(
				`${title}: ${Util.formatNumber(order.amount)}`,
				x,
				(startY += 0.6),
				Object.assign({ color: this.getResourceColour(order.type) }, this.objectStyle),
			);
		}
	};
	private _storageObject = (vis, store, x, startY) => {
		Object.keys(store).forEach(type => {
			const title = type === RESOURCE_ENERGY ? 'E' : type;
			vis.text(
				`${title}: ${Util.formatNumber(store[type])}`,
				x,
				(startY += 0.6),
				Object.assign({ color: this.getResourceColour(type) }, this.objectStyle),
			);
		});
	};
}

export default new Sidebar();
