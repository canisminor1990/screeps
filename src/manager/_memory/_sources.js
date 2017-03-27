import { targetChange } from  '../../_util'
export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   let minerArray = source.findInRange(miner, 2)
		                   sources.push({
			                                source: source,
			                                miner : minerArray
		                                })
	                   }
	)
	if (sources.length > 0) {
		sources.sort((a, b) => b.source.energy - a.source.energy).sort((a, b) => a.miner.length - b.miner.length)
	}
	if (sources.length > 1 && sources[0].miner.length == 0 && sources[sources.length - 1].miner.length > 1) {
		const targetSource = sources[sources.length - 1],
		      targetCreep  = Game.getObjectById(targetSource.miner[targetSource.miner.length - 1].id);
		targetChange(targetCreep, sources[0].source, 'harvest')
	}
	return sources
}