'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = require('./task');

var roleBuilder = {
    run: function run(creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('[B]harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('[B]build');
        }
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (creep.memory.building && targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            (0, _task.taskFindMiner)(creep);
        }
    }
};

exports.default = roleBuilder;
module.exports = exports['default'];