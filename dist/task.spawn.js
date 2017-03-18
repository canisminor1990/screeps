'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var taskSpawn = function taskSpawn(number, body) {
	var _loop = function _loop(key) {
		var roleSpawn = key;
		for (var i = 0; i < number[key].length; i++) {
			var maxNum = number[key][i];
			var roleNumber = _.filter(Game.creeps, function (creep) {
				return creep.memory.role == roleSpawn;
			}).length;
			if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === OK) {
				Game.spawns['Spawn1'].createCreep(body[key], '[' + roleSpawn + ']' + getNowFormatDate(), { role: roleSpawn, source: i });
				console.log('Spawn:', roleSpawn, i);
			}
		}
	};

	for (var key in number) {
		_loop(key);
	}
};

exports.default = taskSpawn;


function getNowFormatDate() {
	var date = new Date();
	return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
}
module.exports = exports['default'];