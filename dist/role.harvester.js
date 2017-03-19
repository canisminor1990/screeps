'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

var roleHarvester = {
    run: function run(creep, targets) {
        if (creep.carry.energy < creep.carryCapacity) {
            var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
            if (pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup[0], { visualizePathStyle: { stroke: '#33b446' } });
            } else {
                (0, _task.taskFindMiner)(creep);
            }
        } else {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

exports.default = roleHarvester;
module.exports = exports['default'];