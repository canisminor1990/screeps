import {taskFindMiner} from './task'

const roleHarvester = {
    run: (creep, targets) => {
        if (creep.carry.energy < creep.carryCapacity) {
            taskFindMiner(creep)
        }
        else {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

export default roleHarvester;
