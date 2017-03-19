export default (creep) => {
    const room = 'W81S66';
    const myRoom = Game.spawns['Spawn1']
    if (creep.carry.energy < creep.carryCapacity) {

        const source = Game.getObjectById('5873bc3511e3e4361b4d7390');
        const miner = creep.pos.findInRange(FIND_MY_CREEPS, 5, {filter: creepRole => creepRole.role == 'farMiner'})[0]

        if (!miner) {
            (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {
                    reusePath: 8,
                    visualizePathStyle: {stroke: '#ffffff'}
                }) : null;
        } else {
            creep.moveTo(miner, {
                reusePath: 8,
                visualizePathStyle: {stroke: '#ffffff'}})
        }
    }
    else {
        if (creep.room.name !== myRoom.room.name) {
            creep.moveTo(myRoom, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}})
        } else {
            const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER
                ) && structure.energy < structure.energyCapacity
            })

            if (targets) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                const targetsContainer = creep.room.memory.structures.filter(structure => (
                        structure.structureType == STRUCTURE_CONTAINER
                    ) && structure.store["energy"] < structure.storeCapacity
                )[0]
                if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsContainer, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}