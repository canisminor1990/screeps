'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var roleBuilder = {
	run: function run(creep) {

		if (creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
			creep.say('[B]harvest');
		}
		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('[B]build');
		}
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (creep.memory.building && targets.length) {
			var num = 0;

			switch (creep.memory.role) {
				case 'harvester':
					for (var i = 0; i < targets.length; i++) {
						if (targets[i].toString().match('road')) {
							num = i;
							break;
						}
					}
					break;
				case 'builder':
					num = 0;
					break;
			}

			if (creep.build(targets[num]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[num], { visualizePathStyle: { stroke: '#ffffff' } });
			}
		} else {
			var sources = creep.pos.find(FIND_SOURCES);
			var source = sources[0];
			switch (creep.memory.role) {
				case 'harvester':
					source = sources[1];
					break;
				case 'builder':
					source = sources[0];
					break;
			}
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

exports.default = roleBuilder;
module.exports = exports['default'];