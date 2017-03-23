import {isFull} from '../_util'
import {pickup, transfer, withdraw} from '../action'

export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findClosestByRange(dropped);
			if (pickup(creep, target)) return;
		}
		target = creep.room.storage;
		if (withdraw(creep, target)) return;
	} else {
		target = creep.room.memory.structures.needFill;
		target = creep.pos.findClosestByRange(target);
		if (transfer(creep,target)) return;
	}
};
