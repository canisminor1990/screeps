'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

exports.default = function (creep) {

    var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function filter(structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    }),
        pickup = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);

    if (!creep.memory.pickup && pickup && creep.carry.energy < creep.carryCapacity) {
        creep.say('pickup');
    }

    if (creep.carry.energy < creep.carryCapacity && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
        creep.moveTo(pickup, { visualizePathStyle: { reusePath: 8, stroke: '#44b336' } });
        creep.memory.pickup = true;
    } else if (targets) {
        creep.memory.pickup = false;
        if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        (0, _task.taskContainer)(creep);
    }
};

module.exports = exports['default'];