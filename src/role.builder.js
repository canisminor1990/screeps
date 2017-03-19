import {taskFindMiner} from './task'

const roleBuilder = {
    run: (creep, targets, halfBroken) => {


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
                    creep.moveTo(halfBroken, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            taskFindMiner(creep)
        }
    }
}

export default roleBuilder;