'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var roleHarvester = {
	run: function run(creep) {

		if (creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			var source = sources[0];
			switch (creep.memory.role) {
				case 'harvester':
					source = sources[1];
					break;
				case 'upgrader':
					source = sources[0];
					break;
				case 'builder':
					source = sources[0];
					break;
			}

			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		} else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: function filter(structure) {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
				}
			});
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
	}
};

exports.default = roleHarvester;
module.exports = exports['default'];