const opt = {
    maxRooms: 1,// We need to set the defaults costs higher so that we
    // can set the road cost lower in `roomCallback`
    plainCost: 2,
    swampCost: 10,

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
    const Pos = creep.pos;
    const targetPos = target.pos
    let Path;

    if (!(creep.memory.path && creep.memory.path.length > 0 || target !== creep.memory.target)) {
        Path = PathFinder.search(Pos, targetPos, opt).path;
    }

    if (creep.move(Pos.getDirectionTo(Path.shift())) == 0) {
        creep.memory.path = Path;
        delete(creep.memory.lastPos);
    } else {
        delete(creep.memory.path);
    }

    creep.memory.target = target;
}

function hasRoad(pos) {
    const hasRoad = pos.lookFor(LOOK_STRUCTURES)
        .filter(lookObject => lookObject.structureType == 'road');
    const hasCreep = pos.lookFor(LOOK_CREEPS)
    return (hasRoad.length > 0 && hasCreep.length == 0) ? true : false;
}


