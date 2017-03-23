import {pathFinder} from '../task'

export default (creep, dropped = []) => {
	if (creep.room.memory.creeps.my.miner.length > 0) {

		if (creep.carry.energy < creep.carryCapacity) {
			if (dropped.length > 0) {
				const pickupTarget = creep.pos.findClosestByPath(dropped);
				(pickupTarget && creep.pickup(pickupTarget) != OK)
						? pathFinder(creep, pickupTarget) : null;
			} else {
				const transferTarget = creep.room.memory.structures.container.sort((a, b) => b.store.enengy - a.store.enengy);
				(transferTarget && creep.withdraw(transferTarget[0], RESOURCE_ENERGY) != OK)
						? pathFinder(creep, transferTarget[0]) : null
			}
		} else {

			const needFill = creep.room.memory.structures.needFill;
			let needFillTarget;
			if (needFill.length > 0) {
				needFillTarget = creep.pos.findClosestByRange(needFill);
			} else {
				needFillTarget = creep.room.storage
			}
			(needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK)
					? pathFinder(creep, needFillTarget) : null

		}
	} else {
		if(creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
							structure.energy < structure.energyCapacity;
				}
			});
			if(targets.length > 0) {
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
	}
};
