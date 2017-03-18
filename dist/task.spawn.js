'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var taskSpawn = function taskSpawn(json) {
    key = Object.key(json);
    value = Object.key(json);

    var _loop = function _loop(i) {
        var roleSpawn = key[i],
            maxNum = value[i],
            roleNumber = _.filter(Game.creeps, function (creep) {
            return creep.memory.role == roleSpawn;
        }).length;
        if (roleNumber < maxNum) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], '' + roleSpawn + Math.floor(Math.random() * 10), { role: roleSpawn });
            console.log('Spawn: ' + newName);
        }
    };

    for (var i = 0; i < key.length; i++) {
        _loop(i);
    }
    // json.map(data => {
    //     const roleSpawn = data[0],
    //         maxNum = data[1],
    //         roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
    //     if (roleNumber < maxNum) {
    //         const newName = Game.spawns['Spawn1'].createCreep(
    //             [WORK,
    //                 CARRY,
    //                 MOVE],
    //             `${roleSpawn}${Math.floor(Math.random() * 10)}`,
    //             {role: roleSpawn}
    //         );
    //         console.log('Spawn: ' + newName);
    //     }
    // })
};

exports.default = taskSpawn;
module.exports = exports['default'];