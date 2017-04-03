import {findClosestByRange}from "../Action"
export default (room) => {
	const structures = room.structures.my;
	let tasklist     = structures.container
	tasklist         = _.filter(tasklist, s => _.sum(s.store) > 50)
	
	let transers = [].concat(room.creeps.my.transer);
	transers     = _.filter(transers, c => !c.memory.full);
	for (let t in tasklist) {
		if (tasklist.length < 1 || transers.length < 1) break;
		let transer = findClosestByRange(tasklist[t], transers)
		if (!transer)  break
		_.remove(transers, c => c.id == transer.id)
		transer.memory.target.withdraw = tasklist[t]
		tasklist[t].target             = transer
	}
	
	return tasklist;
}