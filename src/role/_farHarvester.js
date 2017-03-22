import {pathFinder} from '../task'
export default (creep,newRoom) => {
    const room = Game.spawns['Spawn1'].room;
    const farMiner = newRoom.creeps.my.farMiner;


    if (creep.carry.energy == 0) {
        creep.memory.full = false
    }
    if (creep.carry.energy == creep.carryCapacity || !farMiner.length > 0) {
        creep.memory.full = true
    }

    if (!creep.memory.full) {

        const farMinerTarget = Game.getObjectById(farMiner[0].id);
        pathFinder(creep, farMinerTarget)
    }
    else {
        ( creep.transfer(room.storage, RESOURCE_ENERGY) !== OK)
            ? pathFinder(creep, room.storage) : null
    }
}