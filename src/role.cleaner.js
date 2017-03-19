export default (creep) => {

    const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER
            ) && structure.energy < structure.energyCapacity
        }),

        pickup = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY)

    if (!creep.memory.pickup && pickup && creep.carry.energy < creep.carryCapacity) {
        creep.say('pickup')
    }

    if (creep.carry.energy < creep.carryCapacity && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickup, {visualizePathStyle: {reusePathL: 8, stroke: '#44b336'}});
        creep.memory.pickup = true;
    } else if (targets) {
        creep.memory.pickup = false;
        if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, {reusePathL: 8, visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        const targetsContainer = creep.room.memory.structures.filter(structure => (
                structure.structureType == STRUCTURE_CONTAINER
            ) && structure.store["energy"] < structure.storeCapacity
        )[0]
        if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetsContainer, {reusePathL: 8, visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
