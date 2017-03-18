const roleMiner = {
    run: (creep) => {
        if (creep.carry.energy < creep.carryCapacity) {
            const source = creep.room.find(FIND_SOURCES)[creep.memory.source];
            (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
        }
        else {
            const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1);
            for (let i = 0 ; i < targets.length; i++){
                let num = targets[i].carryCapacity - targets[i].carry.energy;
                console.log(creep.transfer(targets[i], RESOURCE_ENERGY, (num > creep.carry.energy) ? creep.carry.energy : num))
            }

        }
    }
};

export default roleMiner;
