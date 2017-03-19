'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mySpawn = Game.spawns['Spawn1'];
var roleMiner = {
	run: function run(creep) {
		var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
		if (pickup) {
			console.log('[Pickup]: ' + creep.pickup(pickup[0]));
		}
		if (creep.carry.energy < creep.carryCapacity) {
			var source = mySpawn.room.memory.source[creep.memory.source];
			creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
		}
		if (creep.carry.energy >= 50) {
			var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
				filter: function filter(tCreep) {
					return tCreep.memory.role !== 'miner';
				}
			});
			for (var name in targets) {
				var num = targets[name].carryCapacity - targets[name].carry.energy;
				creep.transfer(targets[name], RESOURCE_ENERGY, num > creep.carry.energy ? creep.carry.energy : num);
			}
		}
	}
};

exports.default = roleMiner;

// Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
// 	filter: (creep) => {
// 		return creep.memory.role === "miner"
// 	}
// });

module.exports = exports['default'];