export default (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
        const room = 'W82S67'
        if (creep.room.name !== room) {
            creep.moveTo(new RoomPosition(39, 39, room));
        } else {
            const source = creep.findClosestByPath(FIND_SOURCES)
            const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 4);
            if (pickup.length > 0) {
                (creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE) ? creep.moveTo(pickup[0], {
                        reusePath: 8,
                        visualizePathStyle: {stroke: '#ffaa00'}
                    }) : null;
            } else {
                (creep.harvest(source) == ERR_NOT_IN_RANGE) ? creep.moveTo(new RoomPosition(39, 39, room)) : null;
            }
        }
    }
    else {
        (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ? creep.moveTo(Game.spawns['Spawn1']) : null;

    }
}