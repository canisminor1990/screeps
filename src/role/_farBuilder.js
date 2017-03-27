import {isFull, targetMaker} from '../_util'
import {withdraw, build, pickup, transfer, repair, findClosestInRange, moveTo} from '../action'
export default (creep, newRoom) => {
	let target;
	const storage = Game.getObjectById('58d07b35bfeec6256575be5d')
	isFull(creep)
	targetMaker(creep, newRoom.memory.structures.container[0], 'withdraw')
	// run

	let withdrawTarget = creep.memory.target.withdraw
	if (!creep.memory.full) {
		if (creep.pos.roomName != withdrawTarget.pos.roomName) {
			moveTo(creep, withdrawTarget)
			return
		} else {
			if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 3))) return;
			if (withdraw(creep, withdrawTarget))return;
		}
	} else {
		const needBuild    = creep.room.memory.structures.needBuild,
		      needFix      = creep.room.memory.structures.needFix
		
		if (repair(creep, findClosestInRange(creep, needBuild)))return;
		if (build(creep, findClosestInRange(creep, needFix)))return;
		if (transfer(creep, storage)) return;
	}
}