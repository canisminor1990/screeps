const mySpawn = Game.spawns['Spawn1'];

const taskFindMiner = (creep) => {
	let minerTarget, minerEnergy = 0;
	const miner = mySpawn.room.memory.miner.filter( miner => creep.memory.source === miner.memory.source)
	for (let i = 0; i < miner.length; i++) {
		if (minerEnergy < miner[i].carry.energy) {
			minerTarget = miner[i];
			minerEnergy = miner[i].carry.energy
		}
	}

	creep.moveTo(minerTarget, {visualizePathStyle: {stroke: '#ffaa00'}});

}

export default taskFindMiner;