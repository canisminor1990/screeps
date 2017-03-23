import { isFull } from '../_util'
import { harvest, pickup, transfer, upgradeController } from '../action'
export default (creep, sources, dropped) => {
	let target;
	// root
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = sources[0].source.id
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		if (transfer(creep, target)) return;
		if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
			target = creep.room.controller;
			if (upgradeController(creep, target)) return;
		}
	} else {
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, target)) return;
		}
		target = Game.getObjectById(creep.memory.harvestTarget)
		if (harvest(creep, target)) return;
	}
}
