import {findClosestByRange}from "../Action"
export default (room) => {
	const structures = room.structures.my;
	let tasklist     = structures.container
	let container = ""
	try{
		container = Memory.flags[room.name].up.id
	} catch (e){}
	tasklist         = _.filter(tasklist, s => _.sum(s.store) > 300 && s.id != container)

	let transers = [].concat(room.creeps.my.transer);

	transers     = _.filter(transers, c => !c.memory.full && c.memory.roomName == room.name);
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