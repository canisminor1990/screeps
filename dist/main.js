'use strict';

var _role = require('./role');

var _task = require('./task');

module.exports = {

	loop: function loop() {

		for (var name in Memory.creeps) {
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

		(0, _task.taskSpawn)(_role.roleConfig.number, _role.roleConfig.body);

		if (Game.spawns['Spawn1'].spawning) {
			var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
			Game.spawns['Spawn1'].room.visual.text('[Spawn]' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
		}

		// Game.spawns['Spawn1'].room.memory = Game.spawns['Spawn1'].room
		Game.spawns['Spawn1'].room.memory.structures = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);

		var targetsHarvest = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
			filter: function filter(structure) {
				return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
			}
		});
		var targetsBuild = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);

		for (var _name in Game.creeps) {
			var creep = Game.creeps[_name];

			switch (creep.memory.role) {
				case 'harvester':
					targetsHarvest.length > 0 ? _role.roleHarvester.run(creep, targetsHarvest[0]) : _role.roleBuilder.run(creep);
					break;
				case 'upgrader':
					_role.roleUpgrader.run(creep);
					break;
				case 'builder':

					targetsBuild.length > 0 ? _role.roleBuilder.run(creep, targetsBuild[0]) : _role.roleHarvester.run(creep, targetsHarvest[0]);

					break;
				case 'miner':
					_role.roleMiner.run(creep);
					break;
			}
		}
	}

};