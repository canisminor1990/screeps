const mod = {};
module.exports = mod;
mod.analyzeRoom = function(room) {
	if (room.hostiles.length || (room.memory.hostileIds && room.memory.hostileIds.length)) room.processInvaders();
};
const triggerNewInvaders = creep => {
	// create notification
	const bodyCount = JSON.stringify(_.countBy(creep.body, 'type'));
	if (DEBUG || NOTIFICATE_INVADER || (NOTIFICATE_INTRUDER && creep.room.my) || NOTIFICATE_HOSTILES)
		Util.logSystem(creep.pos.roomName, `Hostile intruder (${bodyCount}) from "${creep.owner.username}".`);
	if (
		NOTIFICATE_INVADER ||
		(NOTIFICATE_INTRUDER && creep.owner.username !== ('Invader' && 'Source Keeper') && creep.room.my) ||
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
const triggerKnownInvaders = id => Room.knownInvader.trigger(id);
const triggerGoneInvaders = id => Room.goneInvader.trigger(id);
mod.runRoom = function(memory, roomName) {
	const room = Game.rooms[roomName];
	if (room) {
		// has sight
		room.goneInvader.forEach(triggerGoneInvaders);
		room.hostileIds.forEach(triggerKnownInvaders);
		room.newInvader.forEach(triggerNewInvaders);
	} else {
		// no sight
		if (memory.hostileIds) _.forEach(memory.hostileIds, triggerKnownInvaders);
	}
};
mod.extend = function() {};
mod.freshRoom = function(room) {
	room.newInvader = [];
	room.goneInvader = [];
};
