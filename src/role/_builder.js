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


    if (creep.memory.building && creep.memory.full) {
        const targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        (targets && creep.build(targets) == ERR_NOT_IN_RANGE) ?
            pathFinder(creep, targets) : null;

    } else {
        taskFindMiner(creep)
    }
}