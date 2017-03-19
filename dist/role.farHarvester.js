'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    if (creep.energy < creep.energyCapacity) {

        if (creep.room.name !== 'W81S66') {
            creep.moveTo(new RoomPosition(27, 21, 'W81S66'));
        } else {
            var source = creep.findClosestByPath(FIND_SOURCES);
            var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 4);
            if (pickup.length > 0) {
                creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE ? creep.moveTo(pickup[0], {
                    reusePath: 8,
                    visualizePathStyle: { stroke: '#ffaa00' }
                }) : null;
            } else {
                creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source, {
                    reusePath: 8,
                    visualizePathStyle: { stroke: '#ffaa00' }
                }) : null;
            }
        }
    } else {
        creep.transferEnergy(Game.spawns['Spawn1']) == ERR_NOT_IN_RANGE ? creep.moveTo(Game.spawns['Spawn1']) : null;
    }
};

module.exports = exports['default'];