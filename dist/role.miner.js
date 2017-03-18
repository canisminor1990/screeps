'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var roleHarvester = {
    run: function run(creep, source) {

        if (targets.length > 0) {
            creep.transfer(targets[0], RESOURCE_ENERGY, creep.carry.energy);
        }

        if (creep.carry.energy < creep.carryCapacity) {

            var _source = sources[0];
            switch (creep.memory.role) {
                case 'harvester':
                    _source = sources[1];
                    break;
                case 'upgrader':
                    _source = sources[0];
                    break;
                case 'builder':
                    _source = sources[0];
                    break;
            }

            if (creep.harvest(_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(_source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function filter(structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

exports.default = roleHarvester;
module.exports = exports['default'];