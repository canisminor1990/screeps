const taskFindMiner = (creep) => {

    const rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source]
    let minerTarget;
    for (let name in Game.creeps) {
        let miner = Game.creeps[name];
        if (miner.memory.role === 'miner' && creep.memory.source === creep.memory.source) {
            minerTarget = miner;
            break;
        }
    }

    if (minerTarget.carry.energy < minerTarget.carryCapacity) {
        return (creep.harvest(rawSource) === ERR_NOT_IN_RANGE) ? creep.moveTo(rawSource, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
    } else {
        return creep.moveTo(minerTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

export default taskFindMiner;