const taskFindMiner = (creep) => {
	const source = creep.room.memory.source[creep.memory.source];
	if (source.energy > 0) {

		const miner = creep.room.memory.miner.filter(miner => creep.memory.source === miner.memory.source)

		let minerTarget, minerEnergy = 0;

		for (let i = 0; i < miner.length; i++) {
			if (minerEnergy < miner[i].carry.energy) {
				minerTarget = miner[i];
				minerEnergy = miner[i].carry.energy
			}
		}

		if (minerTarget && minerEnergy >= 50) {
			creep.moveTo(minerTarget, {reusePath: 8, visualizePathStyle: {stroke: '#ffaa00'}});
		} else {
			(creep.harvest(source) == ERR_NOT_IN_RANGE) ?
			creep.moveTo(source, {reusePath: 8, visualizePathStyle: {stroke: '#ffaa00'}}) : null;
		}

	} else {
		const targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
			                     structure.store["energy"] > 0
		})
		creep.moveTo(targetsContainer, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
	}
}

export default taskFindMiner;