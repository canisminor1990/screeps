import { isFull } from '../_util'
import { transfer, pickup, withdraw, findClosestInRange } from '../action'
export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		target = creep.room.memory.structures.link.filter(link => link.id != creep.room.memory.config.linkMain)[0];
		if (transfer(creep, target, target.energy < target.energyCapacity)) return;
	} else {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 4)
		if (pickup(creep, target)) return;
		target = findClosestInRange(target, creep.room.memory.structures.container, 2)
		if(!target) return;
		if (withdraw(creep, target, target.store.energy > 0))return;
	}
}
