import { pathFinder } from '../task'

export default (creep, dropped) => {

	if (creep.carry.energy == 0) {
		creep.memory.canPick = true
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canPick = false
	}

	if (creep.memory.canPick) {
		if (dropped.length > 0) {
			const pickupTarget = creep.pos.findClosestByPath(dropped);
			(pickupTarget && creep.pickup(pickupTarget) == ERR_NOT_IN_RANGE)
				? pathFinder(creep, pickupTarget) : null;
		}
	}
};
