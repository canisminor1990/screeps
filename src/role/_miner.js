import { isFull, targetMaker } from '../_util'
import { build, harvest, repair, findInRange, moveTo } from '../action'
export default (creep) => {
	const memory = creep.room.memory;
	let target;
	// root
	isFull(creep)
	//run
	targetMaker(creep, memory.sources[0].source, 'harvest')
	const harvestTarget = Game.getObjectById(creep.memory.target.harvest.id)
	if (creep.memory.full) {
		target = findInRange(harvestTarget, creep.room.memory.structures.container, 2);
		if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
		if (repair(creep, target, target.hits < target.hitsMax / 2)) return;
		target = findInRange(creep, creep.room.memory.structures.needBuild, 0);
		if (build(creep, target))return;
		console.log(1)
	}
	if (harvest(creep, harvestTarget)) return;
}