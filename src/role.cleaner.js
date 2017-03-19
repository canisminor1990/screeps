import {taskFindMiner} from './task'

const roleCleaner = {
    run: (creep, targets,pickup) => {
        if (creep.carry.energy < creep.carryCapacity && pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {

        } else if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const targetsContainer = mySpawn.room.memory.structures.filter(structure => (
                    structure.structureType == STRUCTURE_CONTAINER
                ) && structure.store < structure.storeCapacity
            )
            if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetsContainer, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

export default roleCleaner;
