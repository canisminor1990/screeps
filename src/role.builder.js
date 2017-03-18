const roleBuilder = {
	run: (creep) => {

		if (creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
			creep.say('[B]harvest');
		}
		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('[B]build');
		}

		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
		else {
			var sources = creep.room.find(FIND_SOURCES);
			let source = sources[0];
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
	}
}

export default roleBuilder;