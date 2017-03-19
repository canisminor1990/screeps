import * as role from './role';
import * as structure from './structure';
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
            const structureName = mySpawn.room.memory.structures[name];
            switch (structureName.structureType) {
                case 'spawn':
                    structure.spawn(structureName);
                    break;
                case 'tower':
                    structure.tower(structureName);
                    break;
                case 'container':
                    (targetsHarvest.length == 0 || targetsBuild.length > 0 ) ? structure.container(structureName) : null;
                    break;
            }
        }

        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case 'harvester':
                    (targetsHarvest.length > 0 || targetsBuild.length == 0 ) ?
                        role.harvester(creep) : role.builder(creep);
                    break;
                case 'upgrader':
                    role.upgrader(creep);
                    break;
                case 'builder':
                    role.builder(creep)
                    break;
                case 'miner':
                    role.miner(creep);
                    break;
                case 'cleaner':
                    (targetsPickup.length > 0 ) ? role.cleaner(creep) : role.harvester(creep)
                    break;
            }
        }
    }

}