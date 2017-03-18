'use strict';

exports.__esModule = true;
var taskSpawn = function taskSpawn(roleSpawn, maxNum) {
	var roleNumber = _.filter(Game.creeps, function (creep) {
		return creep.memory.role == roleSpawn;
	}).length;
	if (roleNumber < maxNum) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], '' + roleSpawn + Math.floor(Math.random() * 10), { role: roleSpawn });
		console.log('Spawn: ' + newName);
	}
};

exports.default = taskSpawn;
module.exports = exports['default'];