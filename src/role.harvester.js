import {taskFindMiner} from './task'
const mySpawn = Game.spawns['Spawn1'];
const roleHarvester = {
    run: (creep, targets) => {
        if (creep.carry.energy < creep.carryCapacity) {
            const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
            if (pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup[0], {reusePathL: 8, visualizePathStyle: {stroke: '#33b446'}})
            } else {
                taskFindMiner(creep)
            }
        }
        else if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {reusePathL: 8, visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const targetsContainer = mySpawn.room.memory.structures.filter(structure => (
                    structure.structureType == STRUCTURE_CONTAINER
                ) && structure.store < structure.storeCapacity
            )
            if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetsContainer, {reusePathL: 8, visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

export default roleHarvester;
