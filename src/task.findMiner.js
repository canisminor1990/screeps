const mySpawn = Game.spawns['Spawn1'];

const taskFindMiner = (creep) => {
    let minerTarget, minerEnergy = 0;
    const miner = mySpawn.room.memory.miner.filter(miner => creep.memory.source === miner.memory.source)
    for (let i = 0; i < miner.length; i++) {
        if (minerEnergy < miner[i].carry.energy) {
            minerTarget = miner[i];
            minerEnergy = miner[i].carry.energy
        }
    }
    if (minerTarget && minerTarget.carry.energy >= 50) {
        creep.moveTo(minerTarget, {reusePathL: 8, visualizePathStyle: {stroke: '#ffaa00'}});
    } else {
        const source = mySpawn.room.memory.source[creep.memory.source];
        (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {
                reusePathL: 8,
                visualizePathStyle: {stroke: '#ffaa00'}
            }) : null;
    }

}

export default taskFindMiner;