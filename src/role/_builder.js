import {pathFinder} from '../task'

export default (creep, needBuild, newRoom) => {

	if (creep.carry.energy == 0) {
		creep.memory.canBuild = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canBuild = true;
	}

	if (needBuild.length > 0) {
		if (creep.memory.canBuild) {
			const buildTarget = creep.pos.findClosestByRange(needBuild);
			(buildTarget && creep.build(buildTarget) != OK)
					? pathFinder(creep, buildTarget) : null;
		} else {
			const canWithdraw = creep.room.storage;
			(canWithdraw && creep.withdraw(canWithdraw, RESOURCE_ENERGY) != OK)
					? pathFinder(creep, canWithdraw) : null
		}
	} else {
		if (creep.carry.energy < 50) {
			const transferTarget = creep.room.storage;
			(creep.withdraw(transferTarget, RESOURCE_ENERGY) != OK)
					? pathFinder(creep, transferTarget) : null
		} else {
			const needFill = creep.room.memory.structures.needFill;
			let needFillTarget = creep.pos.findClosestByRange(needFill);
			(needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK)
					? pathFinder(creep, needFillTarget) : null

		}
	}
}