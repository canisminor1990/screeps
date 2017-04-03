import {
	transfer,
	harvest,
	isNearTo,
	repair,
	build,
	createConstructionSite,
	findInRange,
	moveTo,
	isEqualTo
} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName    = creep.memory.roomName;
	const isFull      = Is.full(creep);
	let harvestTarget = creep.memory.target.harvest
	// run
	if (creep.room.name !== creep.memory.roomName) {
		harvestTarget = Memory.tasks[creep.memory.roomName].harvest[0];
		if (moveTo(creep, harvestTarget))return
	}
	if (isFull) {
		let link = findInRange(creep, Memory.rooms[roonName].structures.my.link, 3)
		if (link.length > 0) {
			if (transfer(creep, link))return
		}
		let container = findInRange(creep, Memory.rooms[roonName].structures.my.container, 2)[0]
		if (!isNearTo(creep, harvestTarget)) {
			moveTo(creep, harvestTarget)
		} else {
			if (container && !isEqualTo(creep, container) && moveTo(creep, container)) return;
			if (container.hits < container.maxHits && creep.carry.energy > 0) {
				repair(creep, container)
			}
		}
		let buildContainer = findInRange(creep, Memory.tasks[roonName].build, 0)[0]
		if (buildContainer && build(creep, buildContainer && creep.carry.energy > 0))return;
	}
	if (harvest(creep, harvestTarget))return
}