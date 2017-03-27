import { isFull, targetMaker } from '../_util'
import { build, harvest, repair, findClosestInRange } from '../action'
export default (creep) => {
	const memory = creep.room.memory;
	let target;
	// root
	isFull(creep)
	//run
	targetMaker(creep, memory.sources[0].source, 'harvest')
	const harvestTarget = Game.getObjectById(creep.memory.target.harvest.id)
	if (creep.memory.full) {
		target = findClosestInRange(harvestTarget, creep.room.memory.structures.container, 1)
		if (repair(creep, target, target.hits < target.hitsMax / 2)) return;
		target = findClosestInRange(creep, creep.room.memory.structures.needBuild, 0);
		if (build(creep, target))return;
	}
	if (harvest(creep, harvestTarget)) return;
}
