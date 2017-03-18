'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var roleMiner = {
    run: function run(creep) {
        var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.room.find(FIND_SOURCES)[pos];
            creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } }) : null;
        } else {
            var targets = creep.pos.findInRange(FIND_MY_CREEPS, 3);
            creep.transform(targets[0], RESOURCE_ENERGY, creep.carry.energy);
        }
    }
};

exports.default = roleMiner;
module.exports = exports['default'];