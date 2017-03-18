import {taskFindMiner} from './task'

const roleHarvester = {
    run: (creep, targets) => {

        if (creep.carry.energy < creep.carryCapacity) {
            const miner = taskFindMiner(creep.memory.source)
            const rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source]
            const sources = (miner.carry.energy < miner.carryCapacity) ? rawSource : miner;
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

export default roleHarvester;
