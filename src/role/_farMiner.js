import { moveTo, harvest, repair, build, pickup, findClosestInRange } from '../action'
import { isFull, targetMaker, targetFormat } from '../_util'
export default (creep, newRoom) => {
	let target;
	isFull(creep)
	//
	console.log(targetMaker(creep, Memory.rooms['W81S66'].sources[0].source))

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
	} else {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 0);
		if (pickup(creep, target[0])) return;
	}
	const harvestTarget = targetFormat(creep.memory.target.harvest)
	if (!harvestTarget) {
		moveTo(creep, creep.memory.target.harvest)
	} else {
		if (harvest(creep, harvestTarget)) return
	}

}
