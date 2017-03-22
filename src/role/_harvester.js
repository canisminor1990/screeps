import { pathFinder } from '../task'
export default (creep, dropped) => {

	if (creep.carry.energy == 0) {
		creep.memory.canTransfer = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canTransfer = true
	}

	if (!creep.memory.canTransfer) {
		if (dropped.length > 0) {
			const pickupTarget = creep.pos.findInRange(dropped, 5);
			if (pickupTarget.length > 0 && creep.pickup(pickupTarget[0]) == OK) creep.say('pickup')
		} else {
			const transferTarget = creep.room.memory.structures.container.sort((a, b) => b.store.enengy - a.store.enengy);
			(transferTarget && creep.withdraw(transferTarget[0]) === ERR_NOT_IN_RANGE)
				? pathFinder(creep, transferTarget[0]) : null
		}
	}
	else {
		const needFill = creep.pos.findClosestByRange(creep.room.memory.structures.needFill);
		(needFill && creep.transfer(needFill, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
			? pathFinder(creep, needFill) : null
	}
}