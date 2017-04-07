import { findClosestByRange, findInRange }from '../Action';
export default (room) => {
	let tasklist = [];
	if (room.structures.my.extractor.length > 0) {
		tasklist = [].concat(room.resources.all);
	} else {
		tasklist = [].concat(room.resources.source);
	}

	let miners = [].concat(room.creeps.my.miner);

	_.forEach(tasklist, t => {
		let miner = findInRange(t, miners, 1)[0];
		if (miner) {
			_.remove(miners, c => c.id == miner.id);
			_.remove(tasklist, c => c.id == t.id);
		}
	});



	//miners = _.filter(miners, c => !c.pos.isNearTo(c.memory.target.harvest.pos.x, c.memory.target.harvest.pos.y));

	for (let t in tasklist) {
		if (tasklist.length < 1 || miners.length < 1 || !tasklist[t] || !tasklist[t].pos) continue
		let miner = findClosestByRange(tasklist[t], miners);
		if (!miner) continue
		_.remove(miners, c => c.id == miner.id);
		miner.memory.target.harvest = tasklist[t];
		tasklist[t].target          = miner;
	}

	return tasklist;
};