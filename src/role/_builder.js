import {pathFinder, taskFindMiner} from '../task'
import config from '../config'
const mySpawn = Game.spawns['Spawn1'];

export default (creep) => {
    const targetsBuild = mySpawn.room.memory.constructionSites;
    if (targetsBuild.length > 0) {
        creep.memory.building = true;
    } else {
        creep.memory.building = false;
        pathFinder(creep, mySpawn)
    }

    if (creep.carry.energy == 0) {
        creep.memory.full = false;

    }
    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.full = true;
    }
    if (!creep.memory.full && creep.memory.building) {
        taskFindMiner(creep)
    }

    if (creep.memory.building && creep.carry.energy > 0) {
        const targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES),
            halfBroken = creep.pos.findInRange(FIND_STRUCTURES, 5, {
                filter: structure => config.repair(structure) &&
                structure.structureType != STRUCTURE_WALL &&
                structure.structureType != STRUCTURE_RAMPART
            })[0];

        (halfBroken && creep.repair(halfBroken) == ERR_NOT_IN_RANGE) ?
            pathFinder(creep, halfBroken) : null;

        (targets && creep.build(targets) == ERR_NOT_IN_RANGE) ?
            pathFinder(creep, targets) : null;

    }
}