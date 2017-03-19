const taskFindMiner = (creep) => {

	const rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source]
	let minerTarget, minerEnergy = 0;
	const creepsMiner = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
		filter: (creep) => {
			return creep.memory.role === "miner" && creep.memory.source === miner.memory.source
		}
	});
	for (let miner in creepsMiner) {
		if (minerEnergy < miner.carry.energy) {
			minerTarget = miner;
			minerEnergy = miner.carry.energy
		}
	}

	if (minerTarget.carry.energy < minerTarget.carryCapacity) {
		return (creep.harvest(rawSource) === ERR_NOT_IN_RANGE) ? creep.moveTo(rawSource, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
	} else {
		return creep.moveTo(minerTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
	}
}

export default taskFindMiner;