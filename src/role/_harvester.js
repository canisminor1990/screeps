import { isFull } from '../_util'
import { transfer, pickup,withdraw } from '../action'
export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 6);
			if (pickup(creep, target[0])) return;
		}
		target = _.filter(creep.room.memory.structures.container,
		                  container => container.id != '58d4d78f1b7445f663aacaca' &&
		                               container.store.energy > 0
		).sort((a, b) => b.store.energy - a.store.energy)

		if (withdraw(creep, target[0])) return;
	} else {
		target = creep.room.memory.structures.needFill;
		if (target.length > 0) {
			target = creep.pos.findClosestByRange(target);
		} else {
			target = creep.room.storage
		}
		if (transfer(creep, target)) return;
	}

}