'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskSpawn = function taskSpawn(number, body) {
    var _loop = function _loop(key) {
        var roleSpawn = key;
        for (var i = 0; i < number[key].length; i++) {
            var maxNum = number[key][i - 1],
                roleNumber = _.filter(Game.creeps, function (creep) {
                return creep.memory.role == roleSpawn;
            }).length;
            if (roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(body[key]) === 0) {
                var newName = Game.spawns['Spawn1'].createCreep(body[key], '' + roleSpawn + Math.floor(Math.random() * 100), { role: roleSpawn, source: i - 1 });
                console.log('Spawn: ' + newName);
            }
        }
    };

    for (var key in number) {
        _loop(key);
    }
};

exports.default = taskSpawn;
module.exports = exports['default'];