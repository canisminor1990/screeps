import { targetChange } from  '../../_util'
export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   let minerArray = []
		                   miner.forEach(creep => {
			                   console.log(creep)
			                   if (creep.memory.target.harvest && creep.memory.target.harvest.id && creep.memory.target.harvest.id == source.id) {
				                   console.log(creep.memory.target.harvest.id)
				                   minerArray.push(creep.id)
			                   }
		                   })

		                   sources.push({
			                                source: source,
			                                miner : minerArray
		                                })
	                   }
	)
	if (sources.length > 0) {
		sources.sort((a, b) => b.source.energy - a.source.energy).sort((a, b) => a.miner.length - a.miner.length)
	}
	if (sources.length > 1 && sources[0].miner.length == 0 && sources[sources.length - 1].miner.length > 1) {
		const targetSource = sources[sources.length - 1],
		      targetCreep  = Game.getObjectById(targetSource.miner[targetSource.miner.length - 1]);
		targetChange(targetCreep, sources[0].source, 'harvest')
	}
	return sources
}