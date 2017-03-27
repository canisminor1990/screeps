export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   sources.push({
			                                source     : source,
			                                minerNumber: source.pos.findInRange(source.room.memory.creeps.miner, 2).length
		                                })
	                   }
	)
	if (sources.length > 0) {
		sources.sort((a, b) => b.source.energy - a.source.energy).sort((a, b) => a.minerNumber - b.minerNumber)
	}
	return sources
}