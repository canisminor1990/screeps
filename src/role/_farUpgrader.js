import { isFull, targetMaker, targetChange } from '../_util'
import { findClosestInRange, findClosestByRange, build, pickup, withdraw, upgradeController } from '../action'
export default (creep, roomName) => {
	let target;
	// memory
	const ifFull = isFull(creep);
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	// run
	(!ifFull)
		? () => {
			if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
			if (withdraw(creep, Memory.rooms[roomName].structures.spawn)) return;
			if (withdraw(creep, creep.memory.target.withdraw)) return;
		}
		: () => {
			targetChange(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
			if (upgradeController(creep, creep.room.controller)) return;
		}
}