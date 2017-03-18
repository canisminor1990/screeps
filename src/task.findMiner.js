const taskFindMiner = (source) => {
    for (let name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'miner' && creep.memory.source === source) {
            return creep;
            break;
        }
    }
}

export default taskFindMiner;