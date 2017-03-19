'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = require('./task');

var roleHarvester = {
	run: function run(creep, targets, container) {
		if (creep.carry.energy < creep.carryCapacity) {
			(0, _task.taskFindMiner)(creep);
		} else {
			if (targets && creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
			} else if (container && creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
	}
};

exports.default = roleHarvester;
module.exports = exports['default'];