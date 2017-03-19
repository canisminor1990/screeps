'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (container) {
    var targets = container.pos.findInRange(FIND_MY_CREEPS, 1, {
        filter: function filter(tCreep) {
            return tCreep.memory.role !== 'miner';
        }
    });

    var maxNum = 0,
        maxName = void 0;
    for (var name in targets) {
        var num = targets[name].carryCapacity - targets[name].carry.energy;
        if (num > maxNum) {
            maxNum = num;
            maxName = name;
        }
    }
    if (maxName, maxNum != 0) {
        creep.transfer(targets[maxName], RESOURCE_ENERGY, maxNum > container.store['energy'] ? container.store['energy'] : maxNum);
        creep.say('transfer:' + maxNum);
    }
};

module.exports = exports['default'];