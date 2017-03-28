import {isFull, targetMaker, targetChange} from '../_util'
import {findClosestInRange,findClosestByRange, build, pickup, withdraw,upgradeController} from '../action'
export default (creep, roomName) => {
	let target;
	// memory
	isFull(creep);
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
		
	// run
	if (!creep.memory.full) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		if (withdraw(creep, creep.memory.target.withdraw)) return
	}
	else {
		targetChange(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
		if (upgradeController(creep, creep.room.controller)) return;
	}
}