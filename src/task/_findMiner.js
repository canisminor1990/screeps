import { pathFinder } from '../task'
const taskFindMiner = (creep) => {
	let target;

	if (creep.memory.role == "builder") {
		target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: structure => (
			(structure.structureType == (STRUCTURE_STORAGE || STRUCTURE_CONTAINER) ) &&
			structure.store["energy"] > 0)
		})
	} else if (creep.role == 'upgrader') {
		target = Game.getObjectById('58d151fe1b3da0c326b1385b')
	} else {
		target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: structure => (
			structure.structureType == STRUCTURE_CONTAINER &&
			structure.store["energy"] > 0 &&
			structure.id != '58d151fe1b3da0c326b1385b')
		})
	}

	if (creep.withdraw(target, 'energy') == ERR_NOT_IN_RANGE) {
		pathFinder(creep, target)
	}
}

export default taskFindMiner;