import {pathFinder}from '../task'
export default (creep, sources, dropped = []) => {

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	if (creep.memory.full){
		const canFill = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		(canFill.length > 0 && creep.transfer(canFill[0], RESOURCE_ENERGY) != OK)
				? pathFinder(creep, canFill[0]) : null
	}

	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id
	}

	if (!creep.memory.full && creep.memory.harvestTarget) {

		let pickupTarget = []
		if (dropped.length > 0) {
			pickupTarget = creep.pos.findInRange(dropped, 0);
		}
		if (pickupTarget.length > 0) {
			creep.pickup(pickupTarget[0])
			creep.say('pickup')
		} else {
			const harvestTarget = Game.getObjectById(creep.memory.harvestTarget);
			(creep.harvest(harvestTarget) != OK) ?
					pathFinder(creep, harvestTarget) : null;
		}

	}

}
