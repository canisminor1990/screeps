const roleMiner = {
	run: (creep) => {
		if (creep.carry.energy < creep.carryCapacity) {
			const source = creep.room.find(FIND_SOURCES)[creep.memory.source];
			(creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
		}
		else {
			const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1);
			for (let i = 0; i < targets.length; i++) {
				if (targets[i].memory.role != 'miner') {
					let num = targets[i].carryCapacity - targets[i].carry.energy;
					creep.transfer(targets[i], RESOURCE_ENERGY, (num > creep.carry.energy) ? creep.carry.energy : num)
				}
			}

		}
	}
};

export default roleMiner;


// Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
// 	filter: (creep) => {
// 		return creep.memory.role === "miner"
// 	}
// });