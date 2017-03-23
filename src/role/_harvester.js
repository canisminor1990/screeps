import { isFull } from '../_util'
import { transfer, pickup,withdraw } from '../action'
export default (creep, dropped = []) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (!creep.memory.full) {
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if (pickup(creep, target[0])) return;
		}
		target = _.filter(creep.room.memory.structures.container,
		                  container => container.id != '58d31e9dbbb5793fe9d0ad71' &&
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