import {pickup, transfer, withdraw, findInRange} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName       = creep.memory.roomName;
	const isFull         = Is.full(creep);
	// target
	const transferTarget = creep.memory.target.transfer
	const storage        = creep.room.storage;
	// run
	if (isFull) {
		if (creep.carry.energy == 0) transfer(creep, storage);
		if (transferTarget && transferTarget.energy < transferTarget.energyCapacity) {
			if (transfer(creep, transferTarget, false))return
		}
		if (transfer(creep, storage))return
	} else {
		try {
			const link = Game.getObjectById(Memory.flags[creep.room.name].link.id);
			if (link.energy > 0 && withdraw(creep, link, false))return
		} catch (e) {}
		if (pickup(creep, findInRange(creep, Memory.tasks[roonName].pickup, 4))) return
		if (transferTarget && storage && storage.store.energy > 0) {
			if (withdraw(creep, storage, false))return
		} else {
			if (withdraw(creep, Memory.tasks[roonName].withdraw, false))return
		}
	}
}