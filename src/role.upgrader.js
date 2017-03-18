const roleUpgrader = {
	run: (creep) => {

		if (creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
			creep.say('[Upgrader]harvest');
		}
		if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('[Upgrader]upgrade');
		}

		if (creep.memory.upgrading) {
			creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
			// if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			// 	creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
			// }
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}

	}
};

export default roleUpgrader;