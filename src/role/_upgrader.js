import {taskFindMiner} from '../task'
export default  (creep) => {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy > 50) {
        creep.memory.upgrading = true;
        creep.say('[U]upgrade');
    }

    if (creep.memory.upgrading) {
        const controller = creep.room.controller
        creep.moveTo(controller, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}})
        creep.upgradeController(controller)
    }
    else {
        taskFindMiner(creep)
    }
}