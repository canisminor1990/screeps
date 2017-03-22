import { pathFinder } from '../task'

export default (creep, needBuild) => {

	if (creep.carry.energy == 0) {
		creep.memory.canBuild = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canBuild = true;
	}

	if (needBuild.length > 0) {
		if (creep.memory.canBuild) {
			const buildTarget = creep.pos.findClosestByRange(needBuild);
			(buildTarget && creep.build(buildTarget) == ERR_NOT_IN_RANGE)
				? pathFinder(creep, buildTarget) : null;
		} else {
			const canWithdraw = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
			(canWithdraw && creep.withdraw(canWithdraw) === ERR_NOT_IN_RANGE)
				? pathFinder(creep, canWithdraw) : null
		}
	}
}