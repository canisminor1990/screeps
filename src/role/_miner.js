import {isFull} from '../_util'
import {build, harvest, repair} from '../action'
export default (creep) => {
	const memory = creep.room.memory;
	let target;
	// root
	isFull(creep)
	//run
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = memory.sources[0].source.id;
	const harvestTarget = Game.getObjectById(creep.memory.harvestTarget)
	if (creep.memory.full) {
		const container = harvestTarget.pos.findInRange(memory.structures.container, 1)
		if (container && container.length > 0 && container[0].hits < container[0].hitsMax / 2) {
			if (repair(creep, container[0])) return;
		}
		const needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && build(creep, target[0]))return;
		}
	}
	if (harvest(creep, harvestTarget)) return;
}
