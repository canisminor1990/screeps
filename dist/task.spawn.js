'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskSpawn = function taskSpawn(obj) {
    var _loop = function _loop(key) {

        var roleSpawn = key,
            maxNum = obj[key],
            roleNumber = _.filter(Game.creeps, function (creep) {
            return creep.memory.role == roleSpawn;
        }).length;
        if (roleNumber < maxNum) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], '' + roleSpawn + Math.floor(Math.random() * 10), { role: roleSpawn });
            console.log('Spawn: ' + newName);
        }
    };

    for (var key in obj) {
        _loop(key);
    }
};

exports.default = taskSpawn;
module.exports = exports['default'];