import { isFull } from '../_util'
import { withdraw, upgradeController, findClosestByRange } from '../action'
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
		target = findClosestByRange(creep, creep.room.memory.structures.canWithdraw);
		if (withdraw(creep, target)) return;
	}
}

