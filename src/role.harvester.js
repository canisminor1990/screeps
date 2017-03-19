import {taskFindMiner} from './task'

const roleHarvester = {
	run: (creep, targets, container) => {
		if (creep.carry.energy < creep.carryCapacity) {
			taskFindMiner(creep)
		}
		else {
			if (targets && creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
			} else if (container && creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
	}
};

export default roleHarvester;
