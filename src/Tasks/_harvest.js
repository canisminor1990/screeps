import {findClosestByRange}from "../Action"
export default (room) => {
	let tasklist = [];
	if (room.structures.my.extractor.length > 0) {
		tasklist = room.resources.all
	} else {
		tasklist = room.resources.source
	}
	
	tasklist = _.sortByOrder(tasklist, ['energy'], ['desc'])
	
	let miners = [].concat(room.creeps.my.miner)
	
	for (let t in tasklist) {
		if (tasklist.length < 1 || miners.length < 1) break;
		let miner = findClosestByRange(tasklist[t], miners)
		if (!miner)  break
		_.remove(miners, c => c.id == miner.id)
		miner.memory.target.harvest = tasklist[t]
		tasklist[t].target          = miner
	}
	
	return tasklist
}