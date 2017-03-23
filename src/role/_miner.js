import { pathFinder }from '../task'
import { harvest, pickup } from '../action'
export default (creep, sources, dropped = []) => {

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	if (creep.memory.full) {
		const canFill = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		if (canFill.length > 0) {
			( creep.transfer(canFill[0], RESOURCE_ENERGY) != OK)
				? pathFinder(creep, canFill[0]) : null
		} else if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
			const controller = creep.room.controller;
			(creep.upgradeController(controller) != OK) ? pathFinder(creep, controller) : null;
		}
	}

	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id
	}

	if (!creep.memory.full && creep.memory.harvestTarget) {

		if (dropped.length > 0) {
			let pickupTarget = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, pickupTarget)) return;
		}

		let harvestTarget = Game.getObjectById(creep.memory.harvestTarget)
		if (harvest(creep, harvestTarget)) return;

	}

}
