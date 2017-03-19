'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

var mySpawn = Game.spawns['Spawn1'];
var roleHarvester = {
    run: function run(creep, targets) {
        if (creep.carry.energy < creep.carryCapacity) {
            var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
            if (pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup[0], { reusePathL: 8, visualizePathStyle: { stroke: '#33b446' } });
            } else {
                (0, _task.taskFindMiner)(creep);
            }
        } else if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { reusePathL: 8, visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            var targetsContainer = mySpawn.room.memory.structures.filter(function (structure) {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store < structure.storeCapacity;
            });
            if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetsContainer, { reusePathL: 8, visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

exports.default = roleHarvester;
module.exports = exports['default'];