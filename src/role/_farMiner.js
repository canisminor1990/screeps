import {moveTo, harvest, repair, build, findInRange, pickup} from '../action'
import {isFull, targetMaker} from '../_util'
export default (creep, roomName) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	//
	target = findInRange(creep.memory.target.harvest, creep.room.memory.creeps.farMiner, 2, miner =>
		miner.id != creep.id && miner.ticksToLive > 20
	)
	if (target.length >0) targetChange(creep, creep.room.memory.sources[0].source, 'harvest')
	if (creep.memory.full) {
		target = findInRange(creep, creep.room.memory.structures.container, 2)[0];
		if (target) {
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
		} else {
			// if (creep.pos.isNearTo(creep.memory.target.harvest.pos)) {
			// 	creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
			// }
		}
		if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 2)[0]))return;
	}
	if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 2)[0])) return;
	if (harvest(creep, creep.memory.target.harvest)) return;
}
