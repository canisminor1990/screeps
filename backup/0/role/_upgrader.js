import { fullCheck } from '../_util'
import { withdraw, upgradeController, findClosestByRange } from '../action'
export default  (creep) => {
	// state
	const isfFull = fullCheck(creep)
	// task
	if (!isfFull) {
		if (withdraw(creep, findClosestByRange(creep, creep.room.memory.structures.canWithdraw))) return;
	} else {
		if (upgradeController(creep, creep.room.controller)) return;
	}
}

