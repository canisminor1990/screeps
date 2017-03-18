'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskFindMiner = function taskFindMiner(source) {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role === 'miner' && creep.memory.source === source) {
            return creep;
            break;
        }
    }
};

exports.default = taskFindMiner;
module.exports = exports['default'];