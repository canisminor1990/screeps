import {isFull, targetFormat, targetMaker} from '../_util'
import {findClosestInRange, transfer, pickup, moveTo, withdraw} from '../action'
export default (creep, newRoom) => {
	let target;
	// memory
	isFull(creep);
	targetMaker(creep, newRoom.memory.structures.container[0], 'withdraw')
	// run
	if (!creep.memory.full) {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 4);
		if (pickup(creep, target[0])) return;
		const withdrawTarget = targetFormat(creep.memory.target.withdraw)
		if (!withdrawTarget) {
			moveTo(creep, creep.memory.target.withdraw)
		} else {
			if (withdraw(creep, withdrawTarget)) return
		}
		return;
	}
	else {
		target = Game.getObjectById('58d07b35bfeec6256575be5d')
		if (transfer(creep, target)) return;
	}
}