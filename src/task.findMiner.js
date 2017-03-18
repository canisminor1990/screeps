const taskFindMiner = (creep) => {
    for (let name in Game.creeps) {
        const miner = Game.creeps[name];
        if (miner.memory.role === 'miner' && creep.memory.source === source.memory.source) {
            return miner;
            break;
        }

        const rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source]
        return (miner.carry.energy < miner.carryCapacity) ? rawSource : miner;
    }
}

export default taskFindMiner;