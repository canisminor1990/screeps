import {taskFindMiner} from './task'

const roleBuilder = {
    run: (creep) => {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('[B]build');
        }
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (creep.memory.building && targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            taskFindMiner(creep)
        }
    }
}

export default roleBuilder;