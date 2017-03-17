'use strict';

module.exports.loop = function () {
	var _a = Game.creeps;

	var _f = function _f(name) {
		console.log(name);
		var creep = Game.creeps[name];
		if (creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			creep.harvest(sources[0]) == ERR_NOT_IN_RANGE ? creep.moveTo(sources[0]) : null;
		} else {
			creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? creep.moveTo(Game.spawns['Spawn1']) : null;
		}
	};

	var _r = [];

	for (var _i = 0; _i < _a.length; _i++) {
		_r.push(_f(_a[_i], _i, _a));
	}

	_r;
};