import {pathFinder} from '../task'
export default (creep) => {

    const dropped = creep.memory.dropped.energy;

    if (creep.carry.energy == 0) {
        creep.memory.full = false
    }

    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.full = true
    }


    if (!creep.memory.full) {
        if (dropped.length > 0) {
            const pickupTarget = creep.pos.findInRange(dropped, 5);
            console.log(pickupTarget);
            (pickupTarget.length > 0 && creep.pickup(pickupTarget[0]) === ERR_NOT_IN_RANGE) ? pathFinder(creep, pickupTarget[0]) : null
        } else {
            const transferTarget = creep.room.memory.structures.container.sort((a, b) => b.store.enengy - a.store.enengy);
            (transferTarget && creep.withdraw(transferTarget[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                ? pathFinder(creep, transferTarget[0]) : null
        }
    }

    if (creep.memory.full) {
        const needFill = creep.room.memory.structures.needFill;
        let needFillTarget;
        if (needFill.length > 0) {
            needFillTarget = creep.pos.findClosestByRange(needFill);
        } else {
            needFillTarget = creep.room.storage
        }
        (needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
            ? pathFinder(creep, needFillTarget) : null

    }
}