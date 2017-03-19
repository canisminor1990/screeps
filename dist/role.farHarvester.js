'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var room = 'W81S66';
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(new RoomPosition(39, 39, room)) : null;
    } else {
        creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? creep.moveTo(Game.spawns['Spawn1']) : null;
    }
};

module.exports = exports['default'];