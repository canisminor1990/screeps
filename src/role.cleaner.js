export default (creep, targets, pickup) => {

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
