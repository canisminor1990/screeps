const taskFindMiner = (creep) => {
    for (let name in Game.creeps) {
        let miner = Game.creeps[name];
        if (miner.memory.role === 'miner' && creep.memory.source === creep.memory.source) {
            return miner;
            break;
        }


    }
    if (miner.carry.energy < miner.carryCapacity) {
        return (creep.harvest(rawSource) === ERR_NOT_IN_RANGE) ? creep.moveTo(rawSource, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
    } else {
        return  creep.moveTo(miner, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

export default taskFindMiner;