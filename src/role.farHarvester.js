export default (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
        const room = 'W82S67';
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(new RoomPosition(39, 39, room)) : null;
        console.log(creep.harvest(source))
    }
    else {
        (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ? creep.moveTo(Game.spawns['Spawn1']) : null;

    }
}