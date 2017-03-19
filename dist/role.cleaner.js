'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var roleCleaner = {
    run: function run(creep, targets, pickup) {
        if (creep.carry.energy < creep.carryCapacity && pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {} else if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            var targetsContainer = mySpawn.room.memory.structures.filter(function (structure) {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store < structure.storeCapacity;
            });
            if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetsContainer, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

exports.default = roleCleaner;
module.exports = exports['default'];