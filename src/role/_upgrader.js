import { pathFinder } from '../task'

export default  (creep, controller) => {
	if (creep.memory.upgrading && creep.carry.energy == 0) {
		creep.memory.upgrading = false;
	}
	if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
		creep.memory.upgrading = true;
		creep.say('UP');
	}

	if (creep.memory.upgrading) {
		if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) pathFinder(creep, controller)
	}
	else {
		const canWithdraw = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		(canWithdraw && creep.withdraw(canWithdraw) === ERR_NOT_IN_RANGE)
			? pathFinder(creep, canWithdraw) : null
	}
}