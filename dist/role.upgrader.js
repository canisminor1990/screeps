'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
			creep.moveTo(28, 24, { visualizePathStyle: { stroke: '#ffffff' } });
			// creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
			creep.upgradeController(creep.room.controller);
			// if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			// 	creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
			// }
		} else {
			var sources = creep.pos.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

exports.default = roleUpgrader;
module.exports = exports['default'];