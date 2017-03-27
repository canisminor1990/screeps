import {moveTo, harvest, repair, build, findInRange, findClosestInRange,pickup} from '../action'
import {isFull, targetMaker} from '../_util'
export default (creep,roomName) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	//
	if (creep.memory.full) {
		target = findClosestInRange(creep, creep.room.memory.structures.container, 2);
		if (target) {
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
		} else {
			if (creep.pos.isNearTo(target.pos)) creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
		}
		if (build(creep, findInRange(creep, FIND_CONSTRUCTION_SITES, 2)))return;
	}
	if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 2))) return;
	if (harvest(creep, creep.memory.target.harvest)) return;
}
