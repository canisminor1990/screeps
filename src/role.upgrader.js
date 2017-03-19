import {taskFindMiner} from './task'

const roleUpgrader = {
	run: (creep) => {

		if (creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
		}
		if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('[U]upgrade');
		}

		if (creep.memory.upgrading) {
			const controller = creep.room.controller
			creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}})
			creep.upgradeController(controller)
		}
		else {
            taskFindMiner(creep)
		}

	}
};

export default roleUpgrader;