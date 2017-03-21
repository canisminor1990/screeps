import taskContainer from './_container'
import {pathFinder} from '../task'
export default (creep) => {
    "use strict";
    const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => (
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER
        ) && structure.energy < structure.energyCapacity
    })

    if (targets) {
        (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            ? pathFinder(creep,targets)
            : null;
    } else {
        const targetsBuild = creep.room.memory.constructionSites;
        if (creep.role != "builder" && targetsBuild.length > 0){
           const builderTargets =  creep.pos.findInRange(FIND_MY_CREEPS,5,{filter:creep => creep.role =="builder" && creep.carry['energy'] < creep.carryCapacity})[0];
            (builderTargets && creep.transfer(builderTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ?
                pathFinder(creep,builderTargets) : null
        } else {
            taskContainer(creep)
        }

    }
}