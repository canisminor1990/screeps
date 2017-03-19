"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tower) {
    "use strict";

    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function filter(structure) {
            return structure.hits / structure.hitsMax < 0.5 && structure.hits < 5000;
        }
    });

    if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
        tower.attack(closestHostile);
    }
};

module.exports = exports["default"];