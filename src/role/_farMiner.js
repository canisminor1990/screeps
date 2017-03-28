import {moveTo, harvest, repair, build, findInRange,findClosestInRange, pickup} from '../action'
import {fullCheck, targetMaker, createConstructionSite} from '../_util'
export default (creep, roomName) => {
	// state
	const ifFull = fullCheck(creep);
	// target
	targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	// task
	if (ifFull) {
		try {
			const container = findClosestInRange(Game.getObjectById(creep.memory.target.harvest.id), creep.room.memory.structures.container, 2);
			if (container && !creep.pos.isEqualTo(container.pos) && moveTo(creep, container)) return;
			// const pos = creep.memory.target.harvest.pos
			// if (!container && creep.isNearTo(pos.x, pos.y)) {
			// 	createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER)
			// }
			if (repair(creep, container, container.hits < container.hitsMax))return;
			if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 3)[0]))return;
		} catch (e) {
		}
	} else {
		if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	}
	if (harvest(creep, creep.memory.target.harvest)) return;
}
