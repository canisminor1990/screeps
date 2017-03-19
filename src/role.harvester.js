import {taskFindMiner} from './task'
export default (creep) => {

    const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => (
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER
        ) && structure.energy < structure.energyCapacity
    })

    if (creep.carry.energy < creep.carryCapacity) {
        const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
        if (pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(pickup[0], {reusePath: 8, visualizePathStyle: {stroke: '#33b446'}})
        } else {
            taskFindMiner(creep)
        }
    }
    else if (targets) {
        if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        const targetsContainer = creep.pos.findInRange(FIND_STRUCTURES,{filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity});
        if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetsContainer, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}