'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {

    if (creep.carry.energy < creep.carryCapacity) {
        var source = creep.room.memory.source[creep.memory.source];
        var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 0);
        if (pickup.length > 0 && creep.pickup(pickup[0]) == OK) {
            creep.say('pickup');
        } else {
            creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, {
                reusePathL: 8,
                visualizePathStyle: { stroke: '#ffaa00' }
            }) : null;
        }
    }
    if (creep.carry.energy >= 50) {
        var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: function filter(tCreep) {
                return tCreep.memory.role !== 'miner';
            }
        });
        var farTargets = creep.pos.findInRange(FIND_MY_CREEPS, 4, {
            filter: function filter(tCreep) {
                return tCreep.memory.role !== 'miner';
            }
        });

        var maxNum = 0,
            maxName = void 0;
        for (var name in targets) {
            var num = targets[name].carryCapacity - targets[name].carry.energy;
            if (num > maxNum) {
                maxNum = num;
                maxName = name;
            }
        }

        if (maxName, maxNum != 0) {
            creep.transfer(targets[maxName], RESOURCE_ENERGY, maxNum > creep.carry.energy ? creep.carry.energy : maxNum);
            creep.say('transfer:' + maxNum);
        } else if (!farTargets[0]) {
            var targetsContainer = creep.pos.findInRange(FIND_STRUCTURES, 6, { filter: function filter(structure) {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
                } })[0];
            if (targetsContainer) {
                if (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsContainer, { reusePathL: 8, visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var targetsBuild = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 6)[0];
                if (creep.build(targetsBuild) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsBuild, { visualizePathStyle: { reusePathL: 8, stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = exports['default'];