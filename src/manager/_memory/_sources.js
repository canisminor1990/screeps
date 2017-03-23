export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   let minerNumber = 0;
		                   miner.forEach(creep => {
			                                 (creep.memory.harvestTarget == source.id) ?
			                                 minerNumber++ : null
		                                 }
		                   )
		                   sources.push({
			                                source     : source,
			                                minerNumber: minerNumber
		                                })
	                   }
	)
	if (sources.length > 0) {
		sources.sort((a, b) => a.minerNumber - b.minerNumber)
	}
	return sources
}