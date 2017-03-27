import {moveTo, harvest, repair, build, pickup, findClosestInRange} from '../action'
import {isFull, targetMaker, targetFormat} from '../_util'
export default (creep) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, Memory.rooms['W81S66'].sources[0].source, 'harvest')
	//
	if (creep.memory.full) {
		target = findClosestInRange(creep, creep.room.memory.structures.container, 2);
		if (target) {
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
		} else {
			creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
		}
		target = findClosestInRange(creep, creep.room.memory.structures.needBuild, 0);
		if (build(creep, target))return;
	}
	console.log(1)
	if (harvest(creep, creep.memory.target.harvest)) return;
}
