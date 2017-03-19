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
        var pickup = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE ? creep.moveTo(pickup, {
            visualizePathStyle: {
                reusePath: 8,
                stroke: '#44b336'
            }
        }) : null;
    } else {
        (0, _task.taskHarvester)(creep);
    }
};

module.exports = exports['default'];