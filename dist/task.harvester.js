'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

exports.default = function (creep) {
    "use strict";

    var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function filter(structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    });

    if (targets) {
        creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? creep.moveTo(targets, {
            reusePath: 8,
            visualizePathStyle: { stroke: '#ffffff' }
        }) : null;
    } else {
        (0, _task.taskContainer)(creep);
    }
};

module.exports = exports['default'];