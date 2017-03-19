'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var taskFindMiner = function taskFindMiner(creep) {

	var rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source];
	var minerTarget = void 0,
	    minerEnergy = 0;
	var creepsMiner = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
		filter: function filter(creep) {
			return creep.memory.role === "miner" && creep.memory.source === miner.memory.source;
		}
	});
	for (var _miner in creepsMiner) {
		if (minerEnergy < _miner.carry.energy) {
			minerTarget = _miner;
			minerEnergy = _miner.carry.energy;
		}
	}

	if (minerTarget.carry.energy < minerTarget.carryCapacity) {
		return creep.harvest(rawSource) === ERR_NOT_IN_RANGE ? creep.moveTo(rawSource, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
	} else {
		return creep.moveTo(minerTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
	}
};

exports.default = taskFindMiner;
module.exports = exports['default'];