'use strict';

var _role = require('./role.harvester');

var _role2 = _interopRequireDefault(_role);

var _role3 = require('./role.upgrader');

var _role4 = _interopRequireDefault(_role3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoSpawn(roleSpawn, maxNum) {
	var roleNumber = _.filter(Game.creeps, function (creep) {
		return creep.memory.role == roleSpawn;
	}).length;
	if (roleNumber < maxNum) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], '' + roleSpawn + (roleNumber + 1), { role: roleSpawn });
		console.log('Spawn: ' + newName);
	}
}

module.exports.loop = function () {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	autoSpawn('harvester', 2);
	autoSpawn('upgrader', 1);

	if (Game.spawns['Spawn1'].spawning) {
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text('[Spawn]' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
	}

	for (var _name in Game.creeps) {
		var creep = Game.creeps[_name];
		switch (creep.memory.role) {
			case 'harvester':
				Game.spawns['Spawn1'].energy < 300 ? _role2.default.run(creep) : _role4.default.run(creep);
				break;
			case 'upgrader':
				_role4.default.run(creep);
				break;
		}
	}
};