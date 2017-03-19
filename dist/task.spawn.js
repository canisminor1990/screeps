'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mySpawn = Game.spawns['Spawn1'];

var taskSpawn = function taskSpawn(number, body) {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	var _loop = function _loop(key) {
		var roleSpawn = key;

		var _loop2 = function _loop2(i) {
			var maxNum = number[key][i];
			var roleNumber = _.filter(Game.creeps, function (creep) {
				return creep.memory.role == roleSpawn && creep.memory.source == i;
			}).length;
			if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === OK) {
				var _name = '[' + roleSpawn + ']' + getNowFormatDate();
				Game.spawns['Spawn1'].createCreep(body[key], _name, { role: roleSpawn, source: i });
				console.log(['Spawn:', _name, 'Source:', i].join(' '));
			}
		};

		for (var i = 0; i < number[key].length; i++) {
			_loop2(i);
		}
	};

	for (var key in number) {
		_loop(key);
	}

	if (mySpawn.spawning) {
		var spawningCreep = Game.creeps[mySpawn.spawning.name];
		mySpawn.room.visual.text('[Spawn]' + spawningCreep.memory.role, mySpawn.pos.x + 1, mySpawn.pos.y, { align: 'left', opacity: 0.8 });
	}
};

exports.default = taskSpawn;


function getNowFormatDate() {
	var date = new Date();
	return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
}
module.exports = exports['default'];