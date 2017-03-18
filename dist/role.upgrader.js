'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = require('./task');

var roleUpgrader = {
	run: function run(creep) {

		if (creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
			creep.say('[U]harvest');
		}
		if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('[U]upgrade');
		}

		if (creep.memory.upgrading) {
			creep.moveTo(28.24, { visualizePathStyle: { stroke: '#ffffff' } });
			creep.upgradeController(creep.room.controller);
		} else {
			(0, _task.taskFindMiner)(creep);
		}
	}
};

exports.default = roleUpgrader;
module.exports = exports['default'];