'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mySpawn = Game.spawns['Spawn1'];
var roleCleaner = {
    run: function run(creep, targets, pickup) {

        if (!creep.memory.pickup && pickup) {
            creep.say('pickup');
        }

        if (creep.carry.energy < creep.carryCapacity && creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
            creep.moveTo(pickup, { visualizePathStyle: { reusePathL: 8, stroke: '#44b336' } });
            creep.memory.pickup = true;
        } else {
            creep.memory.pickup = false;
            if (targets && creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { reusePathL: 8, stroke: '#ffffff' } });
            } else {
                var targetsContainer = mySpawn.room.memory.structures.filter(function (structure) {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store < structure.storeCapacity;
                });
                if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsContainer, { visualizePathStyle: { reusePathL: 8, stroke: '#ffffff' } });
                }
            }
        }
    }
};

exports.default = roleCleaner;
module.exports = exports['default'];