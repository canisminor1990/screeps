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
        container.transfer(targets[maxName], RESOURCE_ENERGY, maxNum > container.store['energy'] ? container.store['energy'] : maxNum);
        console.log();
        container.room.visual.text('[Transfer]' + maxNum, container.pos.x + 1, container.pos.y, { align: 'left', opacity: 0.8 });
    }
};

module.exports = exports['default'];