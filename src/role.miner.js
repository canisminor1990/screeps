const mySpawn = Game.spawns['Spawn1'];
const roleMiner = {
	run: (creep) => {
		const pickup = creep.pos.findInRange(RESOURCE_ENERGY, 1);
		if (pickup) {
			console.log('[Pickup]: ' + creep.pickup(pickup[0]))
		}
		if (creep.carry.energy < creep.carryCapacity) {
			const source = mySpawn.room.memory.source[creep.memory.source];
			(creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) : null;
		}
		if (creep.carry.energy >= 50) {
			const targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
				filter: tCreep => tCreep.memory.role !== 'miner'
			});
			for (let name in targets) {
				let num = targets[name].carryCapacity - targets[name].carry.energy;
				creep.transfer(targets[name], RESOURCE_ENERGY, (num > creep.carry.energy) ? creep.carry.energy : num)
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