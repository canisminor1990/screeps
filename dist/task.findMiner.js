'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskFindMiner = function taskFindMiner(creep) {

    var rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source];
    var minerTarget = void 0,
        minerEnergy = void 0;
    for (var name in Game.creeps) {
        var miner = Game.creeps[name];
        if (miner.memory.role === 'miner' && creep.memory.source === miner.memory.source) {
            if (minerEnergy < miner.carry.energy) {
                minerTarget = miner;
                minerEnergy = miner.carry.energy;
            }
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