import {targetChange} from  '../../_util'
import {findInRange} from  '../../action'
export default (room, miner) => {
	const rawSources = room.find(FIND_SOURCES);
	let sources      = []
	rawSources.forEach(source => sources.push({
		source: source,
		miner : findInRange(source, FIND_MY_CREEPS, 2, creep => creep.memory.role.match('iner'))
	}))
	if (sources.length > 0) {
		sources.sort((a, b) => b.source.energy - a.source.energy)
			.sort((a, b) => a.miner.length - b.miner.length);
	}
	if (sources.length > 1 && sources[0].miner.length == 0 && sources[sources.length - 1].miner.length > 1) {
		const targetSource = sources[sources.length - 1],
		      targetCreep  = Game.getObjectById(targetSource.miner[targetSource.miner.length - 1].id);
		targetChange(targetCreep, sources[0].source, 'harvest')
	}
	return sources
}