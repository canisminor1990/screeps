'use strict';

var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');

module.exports.loop = function () {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	var harvesters = _.filter(Game.creeps, function (creep) {
		return creep.memory.role == 'harvester';
	});
	console.log('Harvesters: ' + harvesters.length);

	if (harvesters.length < 2) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' });
		console.log('Spawning new harvester: ' + newName);
	}

	if (Game.spawns['Spawn1'].spawning) {
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
	}

	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
	}
};