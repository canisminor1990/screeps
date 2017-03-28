import { fullCheck, targetMaker, targetChanger } from '../_util'
import { withdraw, build, pickup, transfer, repair, findInRange, findClosestByRange } from '../action'
export default (creep, roomName) => {
	// state
	const isFull  = fullCheck(creep)
	const storage = Game.getObjectById('58d07b35bfeec6256575be5d')
	// target
	if (!creep.memory.target.withdraw)targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	// task
	if (!isFull) {
		if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 3)[0])) return;
		if (withdraw(creep, creep.memory.target.withdraw))return;
	} else {
		if (creep.pos.roomName == creep.memory.target.withdraw.pos.roomName) {
			const needBuild = creep.room.memory.structures.needBuild,
			      needFix   = creep.room.memory.structures.needFix
			if (build(creep, findClosestByRange(creep, needBuild)))return;
			if (repair(creep, findClosestByRange(creep, needFix)))return;
		}
		targetChanger(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
		if (transfer(creep, storage)) return;
	}
}