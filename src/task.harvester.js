import taskContainer from './task.container'

export default (creep) => {
    "use strict";
    const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => (
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER
        ) && structure.energy < structure.energyCapacity
    })

    if (targets) {
        (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            ? creep.moveTo(targets, {
                reusePath: 8,
                visualizePathStyle: {stroke: '#ffffff'}
            })
            : null;
    } else {
        taskContainer(creep)
    }
}