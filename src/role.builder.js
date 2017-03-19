import {taskFindMiner} from './task'

const roleBuilder = {
	run: (creep, targets) => {

		if (creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
		}
		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('[B]build');
		}

		if (creep.memory.building && creep.build(targets) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
		} else {
			taskFindMiner(creep)
		}
	}
}

export default roleBuilder;