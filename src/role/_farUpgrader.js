import { isFull, targetMaker, targetChanger } from '../_util'
import { findInRange, pickup, withdraw, upgradeController } from '../action'
export default (creep, roomName) => {
	// state
	const ifFull = isFull(creep);
	// target
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	// run
	if (!ifFull) {
		if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 2)[0])) return;
		if (withdraw(creep, Memory.rooms[roomName].structures.spawn)) return;
		if (withdraw(creep, creep.memory.target.withdraw)) return;
	} else {
		targetChanger(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
		if (upgradeController(creep, creep.room.controller)) return;
	}
}