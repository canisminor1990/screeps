'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var taskFindMiner = function taskFindMiner(creep) {
	//
	// const rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source]
	var minerTarget = void 0,
	    minerEnergy = 0;
	var miner = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
		filter: function filter(miner) {
			return miner.memory.role === "miner" && creep.memory.source === miner.memory.source;
		}
	});
	for (var i = 0; i < miner.length; i++) {
		if (minerEnergy < miner[i].carry.energy) {
			minerTarget = miner[i];
			minerEnergy = miner[i].carry.energy;
		}
	}

	creep.moveTo(minerTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
};

exports.default = taskFindMiner;
module.exports = exports['default'];