'use strict';

var _role = require('./role');

var _task = require('./task');

var mySpawn = Game.spawns['Spawn1'];
module.exports = {

    loop: function loop() {
        (0, _task.taskSpawn)(_role.roleConfig.number, _role.roleConfig.body);
        if (mySpawn.spawning) {
            var spawningCreep = Game.creeps[mySpawn.spawning.name];
            mySpawn.room.visual.text('[Spawn]' + spawningCreep.memory.role, mySpawn.pos.x + 1, mySpawn.pos.y, { align: 'left', opacity: 0.8 });
        }
        mySpawn.room.memory = {
            structures: mySpawn.room.find(FIND_STRUCTURES),
            constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
            source: mySpawn.room.find(FIND_SOURCES),
            miner: mySpawn.room.find(FIND_MY_CREEPS, { filter: function filter(miner) {
                    return miner.memory.role === "miner";
                } }),
            drop: creep.room.find(FIND_DROPPED_ENERGY)
        };

        var targetsHarvest = mySpawn.room.memory.structures.filter(function (structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        });

        var halfBroken = mySpawn.room.memory.structures.filter(function (structure) {
            return structure.hits / structure.hitsMax < 0.5 && structure.hits < 5000;
        });

        var targetsBuild = mySpawn.room.memory.constructionSites;

        var targetsPickup = mySpawn.room.memory.drop;

        for (var name in Game.creeps) {
            var _creep = Game.creeps[name];
            switch (_creep.memory.role) {
                case 'harvester':
                    targetsHarvest.length > 0 ? _role.roleHarvester.run(_creep, targetsHarvest[0]) : _role.roleBuilder.run(_creep, targetsBuild[0]);
                    break;
                case 'upgrader':
                    _role.roleUpgrader.run(_creep);
                    break;
                case 'builder':
                    targetsBuild.length > 0 ? _role.roleBuilder.run(_creep, targetsBuild[0], halfBroken[0]) : _role.roleHarvester.run(_creep, targetsHarvest[0]);
                    break;
                case 'miner':
                    _role.roleMiner.run(_creep);
                    break;
                case 'cleaner':
                    targetsPickup.length > 0 ? _role.roleMiner.run(_creep, targetsHarvest[0], targetsPickup[0]) : _role.roleHarvester.run(_creep, targetsHarvest[0]);
                    break;
            }
        }
    }

};