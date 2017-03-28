import { moveTo, harvest, repair, build, findInRange, pickup } from '../action'
import { fullCheck, targetMaker } from '../_util'
export default (creep, roomName) => {
	// state
	const ifFull = fullCheck(creep);
	// target
	if (!creep.memory.target.harvest)targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	// task
	if (ifFull) {
		try {
			const container = findInRange(Game.getObjectById(creep.memory.target.harvest.id), creep.room.memory.structures.container, 2)[0];
			if (container && !creep.pos.isEqualTo(container.pos) && moveTo(creep, container)) return;
			if (repair(creep, container, target.hits < target.hitsMax))return;
			if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 3)[0]))return;
		} catch (e) {}
	} else {
		if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	}
	if (harvest(creep, creep.memory.target.harvest)) return;
}
