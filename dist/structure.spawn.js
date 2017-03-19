'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _role = require('./role');

exports.default = function (spawn) {

    var number = _role.roleConfig.number,
        body = _role.roleConfig.body;

    if (spawn.energy >= 300) {

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var _loop = function _loop(key) {
            var roleSpawn = key;

            var _loop2 = function _loop2(i) {
                var maxNum = number[key][i];
                var roleNumber = _.filter(Game.creeps, function (creep) {
                    return creep.memory.role == roleSpawn && creep.memory.source == i;
                }).length;
                var roleBody = buildBody(body[key]);

                if (number[key][i] > 0 && roleNumber < maxNum && Game.spawns['Spawn1'].canCreateCreep(roleBody) === OK) {
                    var _name = '[' + roleSpawn + ']' + getNowFormatDate();
                    Game.spawns['Spawn1'].createCreep(roleBody, _name, { role: roleSpawn, source: i });
                    console.log(['Spawn:', _name, 'Source:', i].join(' '));
                }
            };

            for (var i = 0; i < number[key].length; i++) {
                _loop2(i);
            }
        };

        for (var key in number) {
            _loop(key);
        }
    }

    if (spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text('[Spawn]' + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, { align: 'left', opacity: 0.8 });
    }
};

function getNowFormatDate() {
    var date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
}

function buildBody(obj) {
    var array = [];
    for (var key in obj) {
        for (var num = 0; num < obj[key]; num++) {
            array.push(key);
        }
    }
    return array;
}
module.exports = exports['default'];