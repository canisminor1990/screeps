import {isFull, targetMaker} from '../_util'
import {withdraw, build, pickup, transfer, repair, findClosestInRange, findClosestByRange} from '../action'
export default (creep, newRoom) => {
	let target;
	const storage = Game.getObjectById('58d07b35bfeec6256575be5d')
	isFull(creep)
	targetMaker(creep, newRoom.memory.structures.container[0], 'withdraw')
	// run
	const needBuild = Memory.rooms['W81S66'].structures.needBuild,
	      needFix   = Memory.rooms['W81S66'].structures.needFix
	// run
	if (needBuild.length > 0 || needFix.length > 0 ) {
		if (!creep.memory.full) {
			target = findClosestInRange(creep, creep.room.memory.dropped.energy, 3);
			if (pickup(creep, target)) return;
			if (withdraw(creep, storage))return;
		} else {
			if (repair(creep, findClosestByRange(needFix)))return;
			if (build(creep, findClosestByRange(needBuild)))return;
		}
	} else {
		if (!creep.memory.full) {
			if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
			if (withdraw(creep, creep.memory.target.withdraw)) return
		}
		else {
			if (transfer(creep, storage)) return;
		}
	}
}