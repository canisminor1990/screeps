import {taskFindMiner} from './task'

export default (creep, targets, halfBroken) => {


    if (creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
        creep.say('[B]build');
    }

    if (creep.memory.building) {
        if (halfBroken) {
            if (creep.repair(halfBroken) == ERR_NOT_IN_RANGE) {
                creep.moveTo(halfBroken, {visualizePathStyle: {reusePathL: 8, stroke: '#ffffff'}});
            }
        } else {
            if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {reusePathL: 8, stroke: '#ffffff'}});
            }
        }
    } else {
        taskFindMiner(creep)
    }
}