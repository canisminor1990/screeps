import { fullCheck } from '../_util'
import { transfer, pickup, withdraw, findInRange } from '../action'
export default (creep) => {
	let target;
	// memory
	fullCheck(creep)
	// run
	if (creep.memory.full) {
		target = creep.room.memory.structures.link.filter(link => link.id != creep.room.memory.config.linkMain)[0];
		if (transfer(creep, target, target.energy < target.energyCapacity)) return;
	} else {
		target = findInRange(creep, creep.room.memory.dropped.energy, 4)[0]
		if (pickup(creep, target)) return;
		target = findInRange(target, creep.room.memory.structures.container, 2)[0]
		if (!target) return;
		if (withdraw(creep, target, target.store.energy > 0))return;
	}
}
