import {moveTo, harvest, repair, build,pickup} from '../action'
import {isFull} from '../_util'
export default (creep, newRoom) => {
	let target;
	isFull(creep)
	//
	if (creep.memory.full) {
		const needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && build(creep, target[0]))return;
		}
	}
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, target[0])) return;
		}
	}
	target = Game.getObjectById('58d564b2c4e2b16629ae028f');
	if (target && creep.carry.energy >= 50 && target.hits < target.hitsMax) {
		if (repair(creep, target)) return;
	}
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = '5873bc3511e3e4361b4d7390';
	target = Game.getObjectById(creep.memory.harvestTarget)
	if (!target) {
		moveTo(creep, newRoom.pos)
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
	// 		moveTo(creep, newRoom.pos)
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
