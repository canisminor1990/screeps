import { VisualsBase } from './base';

class Sidebar extends VisualsBase {
	infoStyle = {
		align: 'left',
		font: '0.8 Hack',
		backgroundColor: 'rgba(0,0,0,.5)',
	};
	objectStyle = {
		align: 'left',
		font: '0.6 Hack',
		backgroundColor: 'rgba(0,0,0,.1)',
		backgroundPadding: '0.2',
	};
	titleStyle = {
		align: 'left',
		font: 'bold 0.5 Hack',
		color: 'rgba(0,0,0,.7)',
		backgroundPadding: '0.2',
	};
	subStyle = {
		align: 'left',
		font: '0.4 Hack',
		opacity: '0.7',
	};
	yPading = 3;
	yMargin = 1.2;
	yListMargin = 1;

	drawRoomOrders = room => {
		const vis = new RoomVisual(room.name);
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources.orders || !_.size(room.memory.resources.orders)) {
			return;
		}

		if (VISUALS.STORAGE && room.storage) {
			y += this.yPading + _.size(room.storage.store) * this.yListMargin;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += this.yPading + _.size(room.terminal.store) * this.yListMargin;
		}
		vis.text('Room Orders', x, ++y, this.infoStyle);
		this._roomOrdersObject(vis, room.memory.resources.orders, x, y + this.yMargin - 0.5);
	};
	drawRoomOffers = room => {
		const vis = new RoomVisual(room.name);
		const x = 1;
		let y = 1;
		if (!room.memory.resources || !room.memory.resources.offers || !_.size(room.memory.resources.offers)) {
			return;
		}
		if (VISUALS.STORAGE && room.storage) {
			y += this.yPading + _.size(room.storage.store) * this.yListMargin;
		}
		if (VISUALS.TERMINAL && room.terminal) {
			y += this.yPading + _.size(room.terminal.store) * this.yListMargin;
		}
		if (VISUALS.ROOM_ORDERS && room.memory.resources.orders) {
			y += this.yPading + _.size(room.memory.resources.orders) * this.yListMargin;
		}
		vis.text('Room Offerings', x, ++y, this.infoStyle);
		this._roomOrdersObject(vis, room.memory.resources.offers, x, y + this.yMargin - 0.5);
	};
	drawStorageInfo = storage => {
		if (!storage || !_.size(storage.store)) return;
		const vis = new RoomVisual(storage.room.name);
		const x = 1;
		let y = 1;
		vis.text(`Storage Contents`, x, ++y, this.infoStyle);
		const sum = storage.sum;
		const capacity = storage.storeCapacity;
		const text1 = `L: ${Util.formatNumber(capacity - sum)}`;
		const text2 = `${Util.formatNumber(sum)}/${Util.formatNumber(capacity)}`;
		vis.text(`${text1} (${text2})`, x, y + 1.2, this.subStyle);
		this._storageObject(vis, storage.store, x, y + this.yMargin);
	};
	drawTerminalInfo = terminal => {
		if (!terminal || !_.size(terminal.store)) return;
		const vis = new RoomVisual(terminal.room.name);
		const x = 1;
		let y = 1;
		if (VISUALS.STORAGE && terminal.room.storage) {
			y += this.yPading + _.size(terminal.room.storage.store) * this.yListMargin;
		}
		vis.text('Terminal Contents', x, ++y, this.infoStyle);
		const sum = terminal.sum;
		const capacity = terminal.storeCapacity;
		const text1 = `L: ${Util.formatNumber(capacity - sum)}`;
		const text2 = `${Util.formatNumber(sum)}/${Util.formatNumber(capacity)}`;
		vis.text(`${text1} (${text2})`, x, y + 1.2, this.subStyle);
		this._storageObject(vis, terminal.store, x, y + this.yMargin);
	};

	private _roomOrdersObject = (vis, store, x, startY) => {
		for (let order of store) {
			const title = order.type === RESOURCE_ENERGY ? 'E' : order.type;
			vis.text(
				`${title}`,
				x,
				(startY += this.yListMargin),
				Object.assign({ backgroundColor: this.getResourceColour(order.type) }, this.titleStyle),
			);
			vis.text(
				`${Util.formatNumber(order.amount)}`,
				x + 2,
				startY,
				Object.assign({ color: this.getResourceColour(order.type) }, this.objectStyle),
			);
		}
	};
	private _storageObject = (vis, store, x, startY) => {
		Object.keys(store).forEach(type => {
			const title = type === RESOURCE_ENERGY ? 'E' : type;
			vis.text(
				`${title}`,
				x,
				(startY += this.yListMargin),
				Object.assign({ backgroundColor: this.getResourceColour(type) }, this.titleStyle),
			);
			vis.text(
				`${Util.formatNumber(store[type])}`,
				x + 2,
				startY,
				Object.assign({ color: this.getResourceColour(type) }, this.objectStyle),
			);
		});
	};
}

export default new Sidebar();
