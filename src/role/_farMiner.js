import { moveTo, harvest, repair, build, findInRange, pickup } from '../action'
import { isFull, targetMaker } from '../_util'
export default (creep, roomName) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	//

	if (creep.memory.full) {
		try {
			target = findInRange(creep, creep.room.memory.structures.container, 2)[0];
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
			if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 2)[0]))return;
		} catch (e) {

		}
	}

	if (harvest(creep, creep.memory.target.harvest)) return;
}
