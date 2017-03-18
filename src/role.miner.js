const roleMiner = {
    run: (creep, pos = 0) => {
        if (creep.carry.energy < creep.carryCapacity) {
            const source = creep.room.find(FIND_SOURCES)[pos];
            (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
        }
        else {
            const targets = creep.pos.findInRange(FIND_MY_CREEPS, 3);
            creep.transform(targets[0], RESOURCE_ENERGY, creep.carry.energy)
        }
    }
};

export default roleMiner;
