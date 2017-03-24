import { isFull } from '../_util'
import { pathFinder } from '../task'
import { harvest, transfer, build, pickup,repair } from '../action'
export default (creep, newRoom) => {
	let target;
	target = Game.getObjectById('58d564b2c4e2b16629ae028f');
	if (creep.carry.energy > 0 && target.hits < target.maxHits / 2){
		if (repair(creep,target)) return;
	}

	target = Game.getObjectById('5873bc3511e3e4361b4d7390');
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
