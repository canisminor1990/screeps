export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => {
		                   let minerNumber = 0;
		                   miner.forEach(creep => {
			                                 if (creep.memory.target.harvest.id == source.id && creep.ticksToLive > 100) minerNumber++;
		                                 }
		                   )

		                   sources.push({
			                                source     : source,
			                                minerNumber: minerNumber
		                                })
	                   }
	)
	if (sources.length > 0) {
		sources.sort((a, b) => b.source.energy - a.source.energy)
	}
	return sources
}