"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (tower) {
    "use strict";

    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function filter(structure) {
            return _config2.default.repair(structure);
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