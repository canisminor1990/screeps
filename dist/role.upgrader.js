'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

exports.default = function (creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy > 50) {
        creep.memory.upgrading = true;
        creep.say('[U]upgrade');
    }

    if (creep.memory.upgrading) {
        var controller = creep.room.controller;
        creep.moveTo(controller, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        creep.upgradeController(controller);
    } else {
        (0, _task.taskFindMiner)(creep);
    }
};

module.exports = exports['default'];