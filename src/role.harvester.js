const roleHarvester = {
	run: (creep) => {

		if (creep.carry.energy < creep.carryCapacity) {
			Memory = JSON.parse(RawMemory.get());var sources = Memory.source;
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
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
				}
			});
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
	}
};

export default roleHarvester;
