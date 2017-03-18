'use strict';

var _role = require('./role');

var _task = require('./task');

module.exports = {

    loop: function loop() {

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        (0, _task.taskSpawn)(_role.roleConfig.number, _role.roleConfig.body);

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text('[Spawn]' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
        }

        for (var _name in Game.creeps) {
            var creep = Game.creeps[_name];
            switch (creep.memory.role) {
                case 'harvester':
                    Game.spawns['Spawn1'].energy < 300 ? _role.roleHarvester.run(creep) : _role.roleBuilder.run(creep);
                    break;
                case 'upgrader':
                    _role.roleUpgrader.run(creep);
                    break;
                case 'builder':
                    _role.roleBuilder.run(creep);
                    break;
            }
        }
    }

};