'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mySpawn = Game.spawns['Spawn1'];

var taskFindMiner = function taskFindMiner(creep) {
	var minerTarget = void 0,
	    minerEnergy = 0;
	var miner = mySpawn.room.memory.miner.filter(function (miner) {
		return creep.memory.source === miner.memory.source;
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