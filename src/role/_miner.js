import { harvest, pickup, transfer, upgradeController } from '../action'
export default (creep, sources, dropped = []) => {
	// root
	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	if (creep.memory.full) {
		const canFill = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		if (transfer(creep, canFill)) return;
		if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
			const controller = creep.room.controller;
			if (upgradeController(creep, controller)) return;
		}
	} else {
		if (dropped.length > 0) {
			const pickupTarget = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, pickupTarget)) return;
		}
		const harvestTarget = Game.getObjectById(creep.memory.harvestTarget)
		if (harvest(creep, harvestTarget)) return;
	}
}
