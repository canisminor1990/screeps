'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mySpawn = Game.spawns['Spawn1'];

var taskFindMiner = function taskFindMiner(creep) {
    var source = mySpawn.room.memory.source[creep.memory.source];
    if (source.energy != 0) {
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

        if (minerTarget && minerEnergy >= 50) {
            creep.moveTo(minerTarget, { reusePathL: 8, visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, {
                reusePathL: 8,
                visualizePathStyle: { stroke: '#ffaa00' }
            }) : null;
        }
    } else {
        var targetsContainer = mySpawn.room.memory.structures.filter(function (structure) {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
        })[0];
        creep.moveTo(targetsContainer, { reusePathL: 8, visualizePathStyle: { stroke: '#ffffff' } });
    }
};

exports.default = taskFindMiner;
module.exports = exports['default'];