import { isFull, targetMaker, targetChanger } from '../_util'
import { findClosestInRange, transfer, pickup, withdraw } from '../action'
export default (creep, roomName) => {
	let target;
	// memory
	isFull(creep);
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	if (creep.pos.roomName != creep.memory.target.withdraw.pos.roomName) {
		targetChanger(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	}

	// run
	if (!creep.memory.full) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		if (withdraw(creep, creep.memory.target.withdraw)) return
	}
	else {
		target = Memory.rooms[roomName].structures.spawn
		if (target && transfer(creep, target)) return;
		if (transfer(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
}