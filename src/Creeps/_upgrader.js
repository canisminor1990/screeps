import {pickup, withdraw, upgradeController, findInRange, transfer} from  '../Action'
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
		const storage = creep.room.storage;
		if (storage && storage.store.energy > 0) {
			if (withdraw(creep, storage, false))return
		} else {
			if (withdraw(creep, Memory.tasks[roonName].withdraw, false))return
		}
	}
	if (upgradeController(creep, Memory.tasks[roonName].upgrade))return
}