import { taskHarvester, pathFinder } from '../task'

export default (creep) => {

	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {
		const pickup = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
		(pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE)
			? pathFinder(creep, pickup) : null;

	} else {
		taskHarvester(creep)
	}

};
