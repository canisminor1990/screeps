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
    });

    if (creep.carry.energy < creep.carryCapacity) {
        var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
        if (pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(pickup[0], { reusePath: 8, visualizePathStyle: { stroke: '#33b446' } });
        } else {
            (0, _task.taskFindMiner)(creep);
        }
    } else if (targets) {
        if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        var targetsContainer = creep.pos.findInRange(FIND_STRUCTURES, { filter: function filter(structure) {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
            } });
        if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetsContainer, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};

module.exports = exports['default'];