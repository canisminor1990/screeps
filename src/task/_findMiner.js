import {pathFinder} from '../task'
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
			pathFinder(creep,minerTarget)
		} else {
			(creep.harvest(source) == ERR_NOT_IN_RANGE) ?
			pathFinder(creep,source): null;
		}

	} else {
		const targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
			                     structure.store["energy"] > 0
		})
		pathFinder(creep,targetsContainer)

	}
}

export default taskFindMiner;