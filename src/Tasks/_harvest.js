import {findClosestByRange}from "../Action"
export default (room) => {
	let tasklist = [];
	if (room.structures.my.extractor.length > 0) {
		tasklist = room.resources.all
	} else {
		tasklist = room.resources.source
	}
	_.filter(tasklist, r =>
		(r.energy && r.energy > 0) ||
		(r.mineralAmount && r.mineralAmount > 0)
	)
	
	let miners = [].concat(room.creeps.my.miner)
	// miners     = _.filter(miners, c => !c.memory.target.harvest);
	
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