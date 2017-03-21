import { taskFindMiner, taskHarvester } from '../task'
export default (creep) => {

	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {

		const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
		(pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE)
			? creep.moveTo(pickup[0], {reusePath: 8, visualizePathStyle: {stroke: '#33b446'}})
			: taskFindMiner(creep)
	}
	else {
		taskHarvester(creep)
	}
}