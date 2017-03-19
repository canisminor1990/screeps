'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

exports.default = function (creep) {

    if (creep.carry.energy == 0) {
        creep.memory.full = false;
    }
    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.full = true;
    }

    if (!creep.memory.full) {
        var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
        pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE ? creep.moveTo(pickup[0], { reusePath: 8, visualizePathStyle: { stroke: '#33b446' } }) : (0, _task.taskFindMiner)(creep);
    } else {
        (0, _task.taskHarvester)(creep);
    }
};

module.exports = exports['default'];