"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (tower) {
    if (tower.energy > 0) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: function filter(structure) {
                return _config2.default.repair(structure);
            } });
        closestDamagedStructure ? tower.repair(closestDamagedStructure) : null;
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        closestHostile && closestHostile.owner != "Ruo" ? tower.attack(closestHostile) : null;
    }
};

module.exports = exports["default"];