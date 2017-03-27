import {isFull, targetMaker} from '../_util'
import {withdraw, build, pickup, transfer, repair, findClosestInRange, moveTo} from '../action'
export default (creep, newRoom) => {
	let target;
	const storage = Game.getObjectById('58d07b35bfeec6256575be5d')
	isFull(creep)
	targetMaker(creep, newRoom.memory.structures.container[0], 'withdraw')
	// run
	const needBuild    = creep.room.memory.structures.needBuild,
	      needFix      = creep.room.memory.structures.needFix
	// run
	let withdrawTarget = creep.memory.target.withdraw
	if (creep.pos.roomName != withdrawTarget.pos.roomName) moveTo(creep, withdrawTarget)
	
	if (needBuild.length > 0 || needFix.length > 0) {
		if (!creep.memory.full) {
			target = findClosestInRange(creep, creep.room.memory.dropped.energy, 3);
			if (pickup(creep, target)) return;
			if (withdraw(creep, storage))return;
		} else {
			if (repair(creep, findClosestInRange(creep, needBuild)))return;
			if (build(creep, findClosestInRange(creep, needFix)))return;
		}
	} else {
		if (!creep.memory.full) {
			if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
			if (withdraw(creep, withdrawTarget)) return
		}
		else {
			if (transfer(creep, storage)) return;
		}
	}
}