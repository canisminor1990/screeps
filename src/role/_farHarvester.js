import {isFull, targetFormat} from '../_util'
import {findClosestInRange, transfer, pickup, moveTo, withdraw} from '../action'
export default (creep, newRoom) => {
	let target;
	// memory
	isFull(creep);
	// run
	if (!creep.memory.full) {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 4);
		if (pickup(creep, target[0])) return;
		target = targetFormat(newRoom.memory.structures.canWithdraw);
		if (withdraw(creep, target)) return;
		target = targetFormat(newRoom.memory.creeps.my.farMiner);
		moveTo(creep, target);
		return;
	}
	else {
		target = Game.getObjectById('58d07b35bfeec6256575be5d')
		if (transfer(creep, target)) return;
	}
}