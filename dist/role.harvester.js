'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = require('./task');

var roleHarvester = {
	run: function run(creep, targets) {

		if (creep.carry.energy < creep.carryCapacity) {
			var sources = (0, _task.taskFindMiner)(creep.memory.source);
			creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
		} else {
			if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
	}
};

exports.default = roleHarvester;
module.exports = exports['default'];