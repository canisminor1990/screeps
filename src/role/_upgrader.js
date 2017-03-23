import { isFull } from '../_util'
import { withdraw, upgradeController } from '../action'
export default  (creep, controller) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		upgradeController(creep, controller)
	}
	else {
		target = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		withdraw(creep, target)
	}
}

