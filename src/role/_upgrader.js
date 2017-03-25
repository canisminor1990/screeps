import { isFull } from '../_util'
import { withdraw, upgradeController } from '../action'
export default  (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		target = creep.room.controller;
		if (upgradeController(creep, target)) return;
	}
	else {
		target = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		if (withdraw(creep, target)) return;
	}
}

