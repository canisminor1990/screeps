import { pathFinder } from '../task'

export default (creep, dropped = []) => {


    if (creep.carry.length >1) {
        (creep.transfer(creep.room.storage, RESOURCE_GHODIUM_OXIDE) != OK)
            ? pathFinder(creep, creep.room.storage) : null
    }

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
};
