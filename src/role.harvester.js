import {taskFindMiner} from './task'

const roleHarvester = {
	run: (creep,targets) => {

		if (creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			let source = sources[0]
			switch (creep.memory.role) {
				case 'harvester':
					source = sources[1]
					break;
				case 'upgrader':
					source = sources[0]
					break;
				case 'builder':
					source = sources[0]
					break;
			}

			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
		else {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
		}
	}
};

export default roleHarvester;
