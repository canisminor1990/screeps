import {findClosestByRange}from "../Action"
export default (room) => {
	const structures = room.structures.my
	let container    = ""
	try {
		container = Game.getObjectById(Memory.flags[room.name].up.id);
	} catch (e) {
	}
	let tasklist = [].concat(
		structures.spawn,
		structures.extension,
		structures.tower,
		[container],
		structures.storage,
	);
	tasklist     = _.filter(tasklist, s => s.energy < s.energyCapacity)
	let fillers  = [].concat(room.creeps.my.filler);
	fillers      = _.filter(fillers, c => c && c.memory && c.memory.full);
	
	for (let t in tasklist) {
		if (tasklist.length < 1 || fillers.length < 1) break;
		let filler = findClosestByRange(tasklist[t], fillers)
		if (!filler)  break
		_.remove(fillers, c => c.id == filler.id)
		filler.memory.target.transfer = tasklist[t]
		tasklist[t].target            = filler
	}
	
	return tasklist
}