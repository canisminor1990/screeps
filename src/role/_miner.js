import {isFull, targetMaker, targetChange} from '../_util'
import {build, harvest, repair, findInRange, moveTo} from '../action'
export default (creep) => {
	let target;
	// root
	isFull(creep)
	//run
	targetMaker(creep, creep.room.memory.sources[0].source, 'harvest')
	const harvestTarget = Game.getObjectById(creep.memory.target.harvest.id)
	target = findInRange(harvestTarget, creep.room.memory.creeps.my.miner, 1, miner =>
		miner.id != creep.id && miner.ticksToLive > 20
	)
	if (target.length >1) targetChange(creep, creep.room.memory.sources[0].source, 'harvest')
	if (creep.memory.full) {
		target = findInRange(harvestTarget, creep.room.memory.structures.container, 2);
		if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
		if (repair(creep, target, target.hits < target.hitsMax / 2)) return;
		target = findInRange(creep, creep.room.memory.structures.needBuild, 1)[1];
		if (build(creep, target))return;
	} else {
		
	}
	if (harvest(creep, harvestTarget)) return;
}