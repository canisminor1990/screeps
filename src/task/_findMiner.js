import { pathFinder } from '../task'
const taskFindMiner = (creep) => {

	if (creep.memory.role != "builder") {
		let targetsSoorage;
		if (creep.role == 'upgrader') {
			targetsSoorage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: structure => (
				structure.structureType == STRUCTURE_STORAGE &&
				structure.store["energy"] > 0)
			})
		} else {
			targetsSoorage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: structure => (
				structure.structureType == STRUCTURE_STORAGE &&
				structure.store["energy"] > 0 &&
				structure.id != '58d151fe1b3da0c326b1385b')
			})
		}
		if (creep.withdraw(targetsSoorage, 'energy') == ERR_NOT_IN_RANGE) {
			pathFinder(creep, targetsSoorage)
		}

	}
	else {
		let targetsContainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: structure => (
			(structure.structureType == STRUCTURE_STORAGE ) &&
			structure.store["energy"] > 0)
		})

		if (creep.withdraw(targetsContainer, 'energy') == ERR_NOT_IN_RANGE) {
			pathFinder(creep, targetsContainer)
		}
	}
}

export default taskFindMiner;