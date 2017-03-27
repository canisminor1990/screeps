import {isFull, targetFormat, targetMaker} from '../_util'
import {findClosestInRange, transfer, pickup, moveTo, withdraw} from '../action'
export default (creep, newRoom) => {
	let target;
	// memory
	isFull(creep);
	targetMaker(creep, newRoom.memory.structures.container[0], 'withdraw')
	// run
	if (!creep.memory.full) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		console.log(111)
		if (withdraw(creep, creep.memory.target.withdraw)) return
	}
	else {
		if (transfer(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
}