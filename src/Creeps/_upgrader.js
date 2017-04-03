import {pickup, withdraw, upgradeController, findInRange, transfer, findClosestByRange} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName = creep.memory.roomName;
	const isFull   = Is.full(creep);
	// run
	if (isFull) {
		if (creep.carry.energy == 0) transfer(creep, creep.room.storage);
		if (upgradeController(creep, Memory.tasks[roonName].upgrade))return
	} else {
		if (pickup(creep, findInRange(creep, Memory.tasks[roonName].pickup, 4))) return
		const withdrawTarget = [].concat(Memory.tasks[roonName].withdraw, [creep.room.storage]);
		if (withdraw(creep, findClosestByRange(creep, withdrawTarget), false))return
	}
	if (upgradeController(creep, Memory.tasks[roonName].upgrade))return
}