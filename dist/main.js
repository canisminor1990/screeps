'use strict';

var _role = require('./role');

var _task = require('./task');

function taskBuild(x, y, type) {
	if (x && y && type) {
		Game.spawns['Spawn1'].room.createConstructionSite(x, y, 'STRUCTURE_' + type.toUpperCase());
		console.log('[Build] STRUCTURE_' + type.toUpperCase() + ' in x:' + x + ' y:' + y);
	} else {
		console.log('You can build: ' + ['spawn', 'extension', 'road', 'constructedWall', 'rampart', 'keeperLair', 'portal', 'controller', 'link', 'storage', 'tower', 'observer', 'powerBank', 'powerSpawn', 'extractor', 'lab', 'terminal', 'container', 'nuker'].join('|'));
	}
}

module.exports = {
	taskBuild: taskBuild,
	loop: function loop() {

		for (var name in Memory.creeps) {
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

		(0, _task.taskSpawn)('harvester', 2);
		(0, _task.taskSpawn)('upgrader', 1);
		(0, _task.taskSpawn)('builder', 1);

		if (Game.spawns['Spawn1'].spawning) {
			var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
			Game.spawns['Spawn1'].room.visual.text('[Spawn]' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
		}

		for (var _name in Game.creeps) {
			var creep = Game.creeps[_name];
			switch (creep.memory.role) {
				case 'harvester':
					Game.spawns['Spawn1'].energy < 300 ? _role.roleHarvester.run(creep) : _role.roleUpgrader.run(creep);
					break;
				case 'upgrader':
					_role.roleUpgrader.run(creep);
					break;
				case 'builder':
					_role.roleBuilder.run(creep);
					break;
			}
		}
	}

};