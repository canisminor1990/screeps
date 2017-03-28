import { isFull, targetMaker, targetChanger } from '../_util'
import { findClosestInRange, transfer, pickup, withdraw } from '../action'
export default (creep, roomName) => {
	// state
	const ifFull = isFull(creep);
	// target
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	if (creep.pos.roomName != creep.memory.target.withdraw.pos.roomName) targetChanger(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	// run
	if (!ifFull) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		if (withdraw(creep, creep.memory.target.withdraw)) return
	} else {
		let spawn = Memory.rooms[roomName].structures.spawn
		if (spawn && transfer(creep, spawn)) return;
		if (transfer(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
}