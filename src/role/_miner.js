import { isFull, targetMaker } from '../_util'
import { build, harvest, repair, findInRange, moveTo } from '../action'
export default (creep) => {
	let target;
	// root
	isFull(creep)
	//run
	targetMaker(creep, creep.room.memory.sources[0].source, 'harvest')
	const harvestTarget = Game.getObjectById(creep.memory.target.harvest.id)
	if (creep.memory.full) {
		try {
			target = findInRange(harvestTarget, creep.room.memory.structures.container, 2)[0];
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax)) return;
			if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 3)[0]))return;
		} catch (e) {}

	}
	if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	if (harvest(creep, harvestTarget)) return;
}