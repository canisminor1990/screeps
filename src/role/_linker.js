import { isFull } from '../_util'
import { transfer, pickup, withdraw, findClosestInRange } from '../action'
export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		target = creep.room.memory.structures.link.filter(link => link.id != creep.room.memory.config.linkMain)[0];
		if (withdraw(creep, target, target.energy > 0)) return;
		transfer(creep, target)
	} else {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 4)
		if (pickup(creep, target)) return;
		target = Game.getObjectById('58d6a0f58f53422d7fea1d52')
		if (withdraw(creep, target, target.store.energy > 0))return;
	}
}
