const roleMiner = {
    run: (creep) => {
        if (creep.carry.energy < creep.carryCapacity) {
            const source = creep.room.find(FIND_SOURCES)[creep.memory.source];
            (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
        }
        else {
            const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1);
            let num = targets[0].carryCapacity - targets[0].carry.energy;
            console.log(creep.transfer(targets[0], RESOURCE_ENERGY, (num > creep.carry.energy) ? creep.carry.energy : num))
        }
    }
};

export default roleMiner;
