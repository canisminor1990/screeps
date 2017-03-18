'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskFindMiner = function taskFindMiner(creep) {
    for (var name in Game.creeps) {
        var miner = Game.creeps[name];
        if (miner.memory.role === 'miner' && creep.memory.source === source.memory.source) {
            return miner;
            break;
        }

        var rawSource = creep.room.find(FIND_SOURCES)[creep.memory.source];
        return miner.carry.energy < miner.carryCapacity ? rawSource : miner;
    }
};

exports.default = taskFindMiner;
module.exports = exports['default'];