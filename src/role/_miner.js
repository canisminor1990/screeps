import { pathFinder }from '../task'
export default (creep, sources, dropped) => {

	if (creep.carry.energy == 0) {
		creep.memory.canHarvest = true;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canHarvest = false;
		const canFill           = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		(canFill.length > 0 && creep.transfer(canFill, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
			? pathFinder(creep, canFill) : null
	}

	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id
	}

	if (creep.memory.canHarvest && creep.memory.harvestTarget) {
		if (dropped.length > 0) {
			const pickupTarget = creep.pos.findInRange(dropped, 0);
			if (pickupTarget.length > 0 && creep.pickup(pickupTarget[0]) == OK) creep.say('pickup')

		} else {
			const harvestTarget = Game.getObjectById(creep.memory.harvestTarget);
			(creep.harvest(harvestTarget) == ERR_NOT_IN_RANGE) ?
			pathFinder(creep, harvestTarget) : null;
		}
	}

}
