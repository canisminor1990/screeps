import { isFull } from '../_util'
import { withdraw, upgradeController, findClosestByRange } from '../action'
export default  (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		if (upgradeController(creep, creep.room.controller)) return;
	}
	else {
		if (withdraw(creep, findClosestByRange(creep, creep.room.memory.structures.canWithdraw))) return;
	}
}

