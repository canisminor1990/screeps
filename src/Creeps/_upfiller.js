import {transfer, withdraw} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName = creep.memory.roomName;
	const isFull   = Is.full(creep);
	// target
	const storage  = creep.room.storage;
	// run
	if (isFull) {
		let target = Game.getObjectById(Memory.flags[roonName].target.id)
		if (target.store.energy < target.storeCapacity) {
			if (transfer(creep, target))return
		}
	} else {
		if (withdraw(creep, storage, false))return
	}
}