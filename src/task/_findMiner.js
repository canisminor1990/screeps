import { pathFinder } from '../task'
const taskFindMiner = (creep) => {

	if (creep.memory.role != "builder") {
		const source = creep.room.memory.source[creep.memory.source];
		if (source.energy > 0) {
			let targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: structure => (
				structure.structureType == STRUCTURE_CONTAINER &&
				structure.store["energy"] > 0)
			})
			if (creep.withdraw(targetsContainer, 'energy') == ERR_NOT_IN_RANGE) {

				pathFinder(creep, targetsContainer)
			}
		} else {
			let targetsSoorage;
			if (creep.role != 'harvester') {
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