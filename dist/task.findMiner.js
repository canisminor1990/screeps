'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskFindMiner = function taskFindMiner(creep) {
    for (var name in Game.creeps) {
        var _miner = Game.creeps[name];
        if (_miner.memory.role === 'miner' && creep.memory.source === creep.memory.source) {
            return _miner;
            break;
        }
    }
    if (miner.carry.energy < miner.carryCapacity) {
        return creep.harvest(rawSource) === ERR_NOT_IN_RANGE ? creep.moveTo(rawSource, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
    } else {
        return creep.moveTo(miner, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};

exports.default = taskFindMiner;
module.exports = exports['default'];