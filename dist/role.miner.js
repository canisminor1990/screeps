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
            var targets = creep.pos.findInRange(FIND_MY_CREEPS, 3);
            console.log(creep.transfer(targets[0], RESOURCE_ENERGY, creep.carry.energy));
        }
    }
};

exports.default = roleMiner;
module.exports = exports['default'];