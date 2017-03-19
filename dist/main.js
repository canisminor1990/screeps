'use strict';

var _role = require('./role');

var role = _interopRequireWildcard(_role);

var _structure = require('./structure');

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }

var mySpawn = Game.spawns['Spawn1'];
module.exports = {

    loop: function loop() {

        mySpawn.room.memory = {
            structures: mySpawn.room.find(FIND_STRUCTURES),
            constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
            source: mySpawn.room.find(FIND_SOURCES),
            miner: mySpawn.room.find(FIND_MY_CREEPS, { filter: function filter(miner) {
                    return miner.memory.role === "miner";
                } }),
            drop: mySpawn.room.find(FIND_DROPPED_ENERGY)
        };
        var targetsHarvest = mySpawn.room.memory.structures.filter(function (structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        });
        var halfBroken = mySpawn.room.memory.structures.filter(function (structure) {
            return structure.hits / structure.hitsMax < 0.5 && structure.hits < 5000;
        });
        var targetsBuild = mySpawn.room.memory.constructionSites;
        var targetsPickup = mySpawn.room.memory.drop;

        for (var name in mySpawn.room.memory.structures) {
            var structureName = mySpawn.room.memory.structures[name];
            switch (structureName.structureType) {
                case 'spawn':
                    structure.spawn(structureName);
                    break;
                case 'tower':
                    structure.tower(structureName);
                    break;
                case 'container':
                    targetsHarvest.length == 0 ? structure.container(structureName, targetsHarvest[0]) : null;
                    break;
            }
        }

        for (var _name in Game.creeps) {
            var creep = Game.creeps[_name];
            switch (creep.memory.role) {
                case 'harvester':
                    targetsHarvest.length > 0 || targetsBuild.length == 0 ? role.harvester(creep, targetsHarvest[0]) : role.builder(creep, targetsBuild[0]);
                    break;
                case 'upgrader':
                    role.upgrader(creep);
                    break;
                case 'builder':
                    targetsBuild.length > 0 ? role.builder(creep, targetsBuild[0], halfBroken[0]) : role.harvester(creep, targetsHarvest[0]);
                    break;
                case 'miner':
                    role.miner(creep);
                    break;
                case 'cleaner':
                    targetsPickup.length > 0 ? role.cleaner(creep, targetsHarvest[0], targetsPickup[0]) : role.harvester(creep, targetsHarvest[0]);
                    break;
            }
        }
    }

};