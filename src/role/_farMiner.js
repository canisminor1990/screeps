import { moveTo, harvest, repair, build, findInRange, pickup } from '../action'
import { isFull, targetChanger } from '../_util'
export default (creep, roomName) => {
	let target;
	const ifFull = isFull(creep);
	//
	targetChanger(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	//
	if (ifFull) {
		try {
			target = findInRange(Game.getObjectById(creep.memory.target.harvest.id), creep.room.memory.structures.container, 2)[0];
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
			if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 3)[0]))return;
		} catch (e) {}
	}
	if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	if (harvest(creep, creep.memory.target.harvest)) return;
}
