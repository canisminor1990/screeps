import { pathFinder }from '../task'
export default (creep, sources, dropped = []) => {



	if (creep.carry.energy == creep.carryCapacity) {
		const canFill           = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		(canFill.length > 0 && creep.transfer(canFill[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
			? pathFinder(creep, canFill[0]) : null
	}

	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id
	}

	if (creep.carry.energy < creep.carryCapacity && creep.memory.harvestTarget) {


        const harvestTarget = Game.getObjectById(creep.memory.harvestTarget);
        (creep.harvest(harvestTarget) == ERR_NOT_IN_RANGE) ?
            pathFinder(creep, harvestTarget) : null;
	}

}
