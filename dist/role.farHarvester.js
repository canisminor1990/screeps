'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    var room = 'W81S66';
    var myRoom = Game.spawns['Spawn1'];
    if (creep.carry.energy < creep.carryCapacity) {

        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(new RoomPosition(27, 21, room), {
            reusePath: 8,
            visualizePathStyle: { stroke: '#ffffff' }
        }) : null;
    } else {
        if (creep.room.name !== myRoom.room.name) {
            creep.moveTo(myRoom, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        } else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function filter(structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            if (targets) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                var targetsContainer = creep.room.memory.structures.filter(function (structure) {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
                })[0];
                if (targetsContainer && creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsContainer, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = exports['default'];