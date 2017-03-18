'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var roleMiner = {
    run: function run(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.room.find(FIND_SOURCES)[creep.memory.source];
            creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
        } else {
            var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1);
            for (var i = 0; i < targets.length; i++) {
                var num = targets[i].carryCapacity - targets[i].carry.energy;
                creep.transfer(targets[i], RESOURCE_ENERGY, num > creep.carry.energy ? creep.carry.energy : num);
            }
        }
    }
};

exports.default = roleMiner;
module.exports = exports['default'];