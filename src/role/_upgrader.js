import { isFull } from '../_util'
import { withdraw, upgradeController } from '../action'
export default  (creep, controller) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		if (upgradeController(creep, controller)) return;
	}
	else {
		target = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		if (withdraw(creep, target)) return;
	}
}

