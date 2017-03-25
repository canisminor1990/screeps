import {isFull} from '../_util'
import {build, harvest} from '../action'
export default (creep) => {
	const memory = creep.room.memory;
	let target;
	// root
	isFull(creep)
	//run
	if (creep.memory.full) {
		if (!creep.memory.harvestTarget) creep.memory.harvestTarget = memory.sources[0].source.id;
		const needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && build(creep, target[0]))return;
		}
	}
	target        = Game.getObjectById(creep.memory.harvestTarget)
	let container = target.pos.findClosestByRange(target.room.memory.structures.container)
	if (container && creep.carry.energy >= 50 && target.hits < target.hitsMax) {
		if (repair(creep, container)) return;
	}
	if (harvest(creep, target)) {
		// if (!creep.memory.position) {
		// 	target = creep.pos.findInRange(memory.structures.container, 0)
		// 	if (target.length > 0) creep.memory.position = true;
		// 	target = creep.pos.findClosestByRange(memory.structures.container)
		// 	moveTo(creep, target)
		// } else {
		// 	return
		// }
		// return
	}
	
	// // memory
	// isFull(creep)
	// // run
	// if (creep.memory.full) {
	// 	target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
	// 	if (transfer(creep, target[0])) return;
	// 	if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
	// 		target = creep.room.controller;
	// 		if (upgradeController(creep, target)) return;
	// 	}
	// } else {
	// 	const dropped = creep.room.memory.dropped.energy;
	// 	if (dropped.length > 0) {
	// 		target = creep.pos.findInRange(dropped, 0);
	// 		if (pickup(creep, target[0])) return;
	// 	}
	// 	target = Game.getObjectById(creep.memory.harvestTarget)
	// 	if (harvest(creep, target)) return;
	// }
}
