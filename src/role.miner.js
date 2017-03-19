const mySpawn = Game.spawns['Spawn1'];
const roleMiner = {
	run: (creep) => {

		if (creep.carry.energy < creep.carryCapacity) {
			const source = mySpawn.room.memory.source[creep.memory.source];
			const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 0);
			if (pickup.length > 0 && pickup[0] == OK) {
				creep.say('pickup')
			} else {
				(creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
			}
		}
		if (creep.carry.energy >= 50) {
			const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
				filter: tCreep => tCreep.memory.role !== 'miner'
			});
			let maxNum = 0, maxName;
			for (let name in targets) {
				let num = targets[name].carryCapacity - targets[name].carry.energy;
				if (num > maxNum) {
					maxNum = num;
					maxName = name
				}
			}

			if (maxName, maxNum != 0) {
				creep.transfer(targets[maxName], RESOURCE_ENERGY, (maxNum > creep.carry.energy) ? creep.carry.energy : maxNum);
				creep.say('transfer:' + maxNum)
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