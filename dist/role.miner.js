'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mySpawn = Game.spawns['Spawn1'];
var roleMiner = {
	run: function run(creep) {

		if (creep.carry.energy < creep.carryCapacity) {
			var source = mySpawn.room.memory.source[creep.memory.source];
			creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
		}

		var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1);
		for (var i = 0; i < targets.length; i++) {
			if (targets[i].memory.role != 'miner') {
				var num = targets[i].carryCapacity - targets[i].carry.energy;
				creep.transfer(targets[i], RESOURCE_ENERGY, num > creep.carry.energy ? creep.carry.energy : num);
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