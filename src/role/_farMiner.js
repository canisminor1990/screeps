import { isFull } from '../_util'
import { pathFinder } from '../task'
import { harvest, repair } from '../action'
export default (creep, newRoom) => {
	let target;

	target = newRoom.memory.constructor.container;
	target = creep.pos.findClosestByRange(target, 0);
	if (target && target.hits < target.hitsMax / 2) {
		if (repair(creep, target)) return
	}
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = newRoom.memory.sources[0].source.id;
	target = Game.getObjectById(creep.memory.harvestTarget)
	if (!target) {
		pathFinder(creep, newRoom.pos)
		return;
	} else {
		if (harvest(creep, target)) return
	}

	// // memory
	// isFull(creep)
	// // run
	// if (!creep.memory.full) {
	// 	const dropped = creep.room.memory.dropped.energy;
	// 	if (dropped.length > 0) {
	// 		target = creep.pos.findInRange(dropped, 0);
	// 		if (pickup(creep, target[0])) return;
	// 	}
	// 	target = Game.getObjectById('5873bc3511e3e4361b4d7390');
	// 	if (!target) {
	// 		pathFinder(creep, newRoom.pos)
	// 	} else {
	// 		if (harvest(creep, target)) return;
	// 	}
	// } else {
	// 	target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
	// 	if (transfer(creep, target[0])) return;
	// 	target = newRoom.memory.structures.needBuild;
	// 	if (build(creep, target[0])) return;
	// }
}
