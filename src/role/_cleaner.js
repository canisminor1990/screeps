import {pathFinder} from '../task'

export default (creep, dropped = []) => {
	if (creep.room.memory.creeps.my.harvester.length > 0 &&
			creep.room.memory.creeps.my.miner.length >0) {

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
};
