'use strict';

exports.__esModule = true;
var roleUpgrader = {
	run: function run(creep) {

		if (creep.carry.energy < 50) {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.say('harvest');
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		} else {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.say('upgrade');
				creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
	}
};

exports.default = roleUpgrader;
module.exports = exports['default'];