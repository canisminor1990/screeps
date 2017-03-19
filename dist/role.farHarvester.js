'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var room = 'W82S67';
        if (creep.room.name !== room) {
            creep.moveTo(new RoomPosition(39, 39, room));
        } else {
            var source = creep.findClosestByPath(FIND_SOURCES);
            var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 4);
            if (pickup.length > 0) {
                creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE ? creep.moveTo(pickup[0], {
                    reusePath: 8,
                    visualizePathStyle: { stroke: '#ffaa00' }
                }) : null;
            } else {
                creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(new RoomPosition(39, 39, room)) : null;
            }
        }
    } else {
        creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? creep.moveTo(Game.spawns['Spawn1']) : null;
    }
};

module.exports = exports['default'];