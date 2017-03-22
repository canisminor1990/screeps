import {pathFinder} from "../task"
export default (creep, newRoom) => {

    if (creep.carry.energy == 0) {
        creep.memory.canHarvest = true;
    }


    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.canHarvest = false;
        const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: targetCreep => targetCreep.carry.energy < targetCreep.carryCapacity
        });
        if (targets.length > 0) {
            creep.transfer(targets[0], RESOURCE_ENERGY)
        } else {
            const needBuild = creep.room.memory.structures.needBuild;
            const buildTarget = creep.pos.findClosestByRange(needBuild);
            (buildTarget && creep.build(buildTarget) == ERR_NOT_IN_RANGE)
                ? pathFinder(creep, buildTarget) : null;
        }
    }

    if (creep.memory.canHarvest) {
        const source = Game.getObjectById('5873bc3511e3e4361b4d7390');
        if (!source) {
            pathFinder(creep, newRoom)

        } else {
            (creep.harvest(source) !== OK) ? pathFinder(creep, source) : null;
        }
    }
}
