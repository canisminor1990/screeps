import { targetChange } from  '../../_util'
export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   let miner = []
		                   miner.forEach(creep => {
			                   if (creep.target.harvest && creep.target.harvest.id == source.id) miner.push(creep.id)
		                   })

		                   sources.push({
			                                source: source,
			                                miner : miner
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