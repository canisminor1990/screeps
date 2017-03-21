import taskContainer from './_container'
import {pathFinder} from '../task'
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
            ? pathFinder(creep,targets)
            : null;
    } else {
        taskContainer(creep)
    }
}