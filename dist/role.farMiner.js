'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {

    if (creep.carry.energy < creep.carryCapacity) {
        var source = Game.getObjectById('5873bc3511e3e4361b4d7390');
        creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, {
            reusePath: 8,
            visualizePathStyle: { stroke: '#ffffff' }
        }) : null;
    }
    if (creep.carry.energy >= 50) {
        var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
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
            creep.transfer(targets[maxName], RESOURCE_ENERGY, maxNum > creep.carry.energy ? creep.carry.energy : maxNum);
            creep.say('transfer:' + maxNum);
        }
    }
};

module.exports = exports['default'];