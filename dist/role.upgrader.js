'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = require('./task');

var roleUpgrader = {
	run: function run(creep) {

		if (creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
		}
		if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('[U]upgrade');
		}

		if (creep.memory.upgrading) {
			var controller = creep.room.controller;
			creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
			creep.upgradeController(controller);
		} else {
			(0, _task.taskFindMiner)(creep);
		}
	}
};

exports.default = roleUpgrader;
module.exports = exports['default'];