'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var taskSpawn = function taskSpawn(number, body) {
	var _loop = function _loop(key) {
		var roleSpawn = key;

		var _loop2 = function _loop2(i) {
			var maxNum = number[key][i];
			var roleNumber = _.filter(Game.creeps, function (creep) {
				return creep.memory.role == roleSpawn && creep.memory.source == i;
			}).length;
			if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === OK) {
				var name = '[' + roleSpawn + ']' + getNowFormatDate();
				Game.spawns['Spawn1'].createCreep(body[key], name, { role: roleSpawn, source: i });
				console.log(['Spawn:', name, 'Source:', i].join(' '));
			}
		};

		for (var i = 0; i < number[key].length; i++) {
			_loop2(i);
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