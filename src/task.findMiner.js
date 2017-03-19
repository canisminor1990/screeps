

const taskFindMiner = (creep) => {
    const source = mySpawn.room.memory.source[creep.memory.source];
    if (source.energy != 0) {
        let minerTarget, minerEnergy = 0;
        const miner = mySpawn.room.memory.miner.filter(miner => creep.memory.source === miner.memory.source)
        for (let i = 0; i < miner.length; i++) {
            if (minerEnergy < miner[i].carry.energy) {
                minerTarget = miner[i];
                minerEnergy = miner[i].carry.energy
            }
        }

        if (minerTarget && minerEnergy >= 50) {
            creep.moveTo(minerTarget, {reusePathL: 8, visualizePathStyle: {stroke: '#ffaa00'}});
        } else {
            (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {
                    reusePathL: 8,
                    visualizePathStyle: {stroke: '#ffaa00'}
                }) : null;
        }
    } else {
        const targetsContainer = creep.room.memory.structures.filter(structure => (
                structure.structureType == STRUCTURE_CONTAINER
            ) && structure.store["energy"] < structure.storeCapacity
        )[0]
        creep.moveTo(targetsContainer, {reusePathL: 8, visualizePathStyle: {stroke: '#ffffff'}});
    }
}

export default taskFindMiner;