import {Timer} from '../_util'
export default (creep, target) => {
    if (creep.fatigue > 1)return;
    let goals = target.pos
    let path;
    if (!creep.memory.path || !creep.memory.target || creep.memory.target != target.id) {
        path = PathFinder.search(creep.pos, goals, {
            maxRooms: 1,
            plainCost: 20,
            swampCost: 100,
            maxOps: 1000,
            roomCallback: (roomName) => {
                let costs, room = Game.rooms[roomName];
                if (!Memory.PathFinder) {
                    Memory.PathFinder = {}
                    Memory.PathFinder[roomName] = []
                }
                costs = Memory.PathFinder[roomName]

                // In this example `room` will always exist, but since PathFinder
                // supports searches which span multiple rooms you should be careful!
                if (!room) return;
                costs = new PathFinder.CostMatrix;
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
                Memory.PathFinder[roomName] = costs;
                return costs;
            }
        }).path;
    } else {
        path = creep.memory.path
    }

    if (creep.move(creep.pos.getDirectionTo(path.shift())) == OK) {
        creep.memory.path = path;
        creep.memory.target = target.id;
    } else {
        delete (creep.memory.path)
        delete (creep.memory.target)
    }
}


