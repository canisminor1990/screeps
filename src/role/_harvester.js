import { taskFindMiner, taskHarvester, pathFinder } from '../task'
export default (creep) => {

	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {

		let targetsContainer = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: structure => (
			(structure.structureType == STRUCTURE_STORAGE ) &&
			structure.store["energy"] > 0)
		})

		if (creep.withdraw(targetsContainer, 'energy') == ERR_NOT_IN_RANGE) {
			pathFinder(creep, targetsContainer)
		}
	}
	else {
		taskHarvester(creep)
	}
}