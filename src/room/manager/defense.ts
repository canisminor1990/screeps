import { RoomManager } from '../../class';

class DefenseManager extends RoomManager {
	constructor() {
		super('defense');
	}
	analyzeRoom = room => {
		if (room.hostiles.length || (room.memory.hostileIds && room.memory.hostileIds.length))
			room.processInvaders();
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
		const bodyCount = JSON.stringify(_.countBy(creep.body, 'type'));
		if (
			DEBUG ||
			NOTIFICATE_INVADER ||
			(NOTIFICATE_INTRUDER && creep.room.my) ||
			NOTIFICATE_HOSTILES
		)
			Util.logSystem(
				creep.pos.roomName,
				`Hostile intruder (${bodyCount}) from "${creep.owner.username}".`,
			);
		if (
			NOTIFICATE_INVADER ||
			(NOTIFICATE_INTRUDER &&
				creep.owner.username !== ('Invader' && 'Source Keeper') &&
				creep.room.my) ||
			(NOTIFICATE_HOSTILES && creep.owner.username !== ('Invader' && 'Source Keeper'))
		) {
			Game.notify(
				`Hostile intruder ${creep.id} (${bodyCount}) from "${creep.owner.username}" in room ${
					creep.pos.roomName
				} at ${Util.toDateTimeString(Util.toLocalDate(new Date()))}`,
			);
		}
		// trigger subscribers
		Room.newInvader.trigger(creep);
	};
	private _triggerKnownInvaders = id => Room.knownInvader.trigger(id);
	private _triggerGoneInvaders = id => Room.goneInvader.trigger(id);
}

export default new DefenseManager();
