import { moveTo, harvest, repair, build, pickup } from '../action'
import { isFull, targetMaker, targetPos, targetFormat } from '../_util'
export default (creep, newRoom) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, newRoom.memory.sources[0].source)
	//
	if (creep.memory.full) {
		const container = creep.pos.findInRange(creep.room.memory.structures.container, 0)[0];
		if (container) {
			if (container.hits < container.hitsMax && repair(creep, container)) return;
		} else {
			creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
		}
		const needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && build(creep, target[0]))return;
		}
	} else {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, target[0])) return;
		}
	}

	const harvestTarget = targetFormat(creep.memory.target.harvest.id)
	if (!harvestTarget && moveTo(creep, targetPos(creep.memory.target.harvest))) return
	if (harvest(creep, harvestTarget)) return

}
