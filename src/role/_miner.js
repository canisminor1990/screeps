import { isFull } from '../_util'
import { harvest, pickup, transfer, upgradeController } from '../action'
export default (creep) => {
	const sources = creep.room.memory.source;
	let target;
	// root
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = sources[0].source.id
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		if (transfer(creep, target[0])) return;
		if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
			target = creep.room.controller;
			if (upgradeController(creep, target)) return;
		}
	} else {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, target[0])) return;
		}
		target = Game.getObjectById(creep.memory.harvestTarget)
		if (harvest(creep, target)) return;
	}
}
