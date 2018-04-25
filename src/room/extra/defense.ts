import { RoomExtra } from '../Extra';

class DefenseExtra extends RoomExtra {
	constructor() {
		super('defense');
	}
	analyzeRoom = room => {
		if (room.hostiles.length || (room.memory.hostileIds && room.memory.hostileIds.length)) room.processInvaders();
	};
	runRoom = (memory, roomName) => {
		const room = Game.rooms[roomName];
		if (room) {
			// has sight
			room.goneInvader.forEach(this._triggerGoneInvaders);
			room.hostileIds.forEach(this._triggerKnownInvaders);
			room.newInvader.forEach(this._triggerNewInvaders);
		} else {
			// no sight
			if (memory.hostileIds) _.forEach(memory.hostileIds, this._triggerKnownInvaders);
		}
	};
	freshRoom = room => {
		room.newInvader = [];
		room.goneInvader = [];
	};
	private _triggerNewInvaders = creep => {
		// create notification
		const bodyCount = _.countBy(creep.body, 'type');
		if (NOTIFICATE_INVADER || (NOTIFICATE_INTRUDER && creep.room.my) || NOTIFICATE_HOSTILES) {
			Log.room(creep.pos.roomName, Dye(COLOR_RED, `Hostile intruder from "${creep.owner.username}".`));
			Log.table(bodyCount);
		}
		if (
			NOTIFICATE_INVADER ||
			(NOTIFICATE_INTRUDER &&
				creep.owner.username !== 'Invader' &&
				creep.owner.username !== 'Source Keeper' &&
				creep.room.my) ||
			(NOTIFICATE_HOSTILES && creep.owner.username !== 'Invader' && creep.owner.username !== 'Source Keeper')
		) {
			Game.notify(
				`Hostile intruder ${creep.id} (${JSON.stringify(bodyCount)}) from "${creep.owner.username}" in room ${
					creep.pos.roomName
				} at ${Util.toDateTimeString(Util.toLocalDate(new Date()))}`,
			);
		}
		// trigger subscribers
		RoomManager.newInvader.trigger(creep);
	};
	private _triggerKnownInvaders = id => RoomManager.knownInvader.trigger(id);
	private _triggerGoneInvaders = id => RoomManager.goneInvader.trigger(id);
}

export default new DefenseExtra();
