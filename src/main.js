import {roleHarvester, roleUpgrader, roleBuilder, roleMiner, roleCleaner} from './role';
import {structureTower, structureContainer} from './structure';
const mySpawn = Game.spawns['Spawn1'];
module.exports = {

    loop: () => {


        mySpawn.room.memory = {
            structures: mySpawn.room.find(FIND_STRUCTURES),
            constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
            source: mySpawn.room.find(FIND_SOURCES),
            miner: mySpawn.room.find(FIND_MY_CREEPS, {filter: (miner) => miner.memory.role === "miner"}),
            drop: mySpawn.room.find(FIND_DROPPED_ENERGY)
        }
        const targetsHarvest = mySpawn.room.memory.structures.filter(structure => (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER
            ) && structure.energy < structure.energyCapacity
        )
        const halfBroken = mySpawn.room.memory.structures.filter(structure =>
            (structure.hits / structure.hitsMax) < 0.5 && structure.hits < 5000
        )
        const targetsBuild = mySpawn.room.memory.constructionSites;
        const targetsPickup = mySpawn.room.memory.drop;


        for (let name in mySpawn.room.memory.structures) {
            const structure = mySpawn.room.memory.structures[name];
            switch (structure.structureType) {
                case 'spawn':
                    structureSpawn(structure);
                    break;
                case 'tower':
                    structureTower(structure);
                    break;
                case 'container':
                    (targetsHarvest.length == 0 ) ? structureContainer(structure, targetsHarvest[0]) : null;
                    break;
            }
        }

        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case 'harvester':
                    (targetsHarvest.length > 0 || targetsBuild.length == 0 ) ?
                        roleHarvester(creep, targetsHarvest[0]) : roleBuilder(creep, targetsBuild[0]);
                    break;
                case 'upgrader':
                    roleUpgrader(creep);
                    break;
                case 'builder':
                    (targetsBuild.length > 0) ? roleBuilder(creep, targetsBuild[0], halfBroken[0]) : roleHarvester(creep, targetsHarvest[0])
                    break;
                case 'miner':
                    roleMiner(creep);
                    break;
                case 'cleaner':
                    (targetsPickup.length > 0 ) ? roleCleaner(creep, targetsHarvest[0], targetsPickup[0]) : roleHarvester(creep, targetsHarvest[0])
                    break;
            }
        }
    }

}