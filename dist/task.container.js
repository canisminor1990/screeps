"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    "use strict";

    var targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function filter(structure) {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
        } });
    if (targetsContainer) {
        if (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetsContainer, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};

module.exports = exports["default"];