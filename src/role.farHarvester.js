export default (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
        const room = 'W81S66';
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(new RoomPosition(27, 21, room), {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}}) : null;

    }
    else {
        (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ? creep.moveTo(Game.spawns['Spawn1']) : null;

    }
}