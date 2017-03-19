"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    "use strict";

    var targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function filter(structure) {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
        } });
    if (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetsContainer, { reusePath: 8, visualizePathStyle: { stroke: '#3f51b5' } });
        console.log(creep.transfer(targetsContainer, RESOURCE_ENERGY));
    }
};

module.exports = exports["default"];