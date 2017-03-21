const opt = {
    maxRooms: 1,
    plainCost: 20,
    swampCost: 100,

    roomCallback: (roomName) => {

        let room = Game.rooms[roomName];
        // In this example `room` will always exist, but since PathFinder
        // supports searches which span multiple rooms you should be careful!
        if (!room) return;
        let costs = new PathFinder.CostMatrix;

        room.find(FIND_STRUCTURES).forEach((structure) => {
            if (structure.structureType === STRUCTURE_ROAD) {
                // Favor roads over plain tiles
                costs.set(structure.pos.x, structure.pos.y, 1);
            } else if (structure.structureType !== STRUCTURE_CONTAINER &&
                (structure.structureType !== STRUCTURE_RAMPART || !structure.my)) {
                // Can't walk through non-walkable buildings
                costs.set(structure.pos.x, structure.pos.y, 0xff);
            }
        });

        // Avoid creeps in the room
        room.find(FIND_CREEPS).forEach((creep) => {
            costs.set(creep.pos.x, creep.pos.y, 0xff);
        });
        return costs;
    }
}

export default (creep, target) => {

    let goals = target.pos
    let path = PathFinder.search(creep.pos, goals, opt).path;
    creep.memory.path = path

    creep.move(creep.pos.getDirectionTo(path.shift()));
}


