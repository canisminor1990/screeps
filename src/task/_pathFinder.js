export default (creep, target) => {
	if (creep.fatigue > 1) {
		return;
	} else if (creep.memory.pos == creep.pos) {
		creep.moveTo(target)
	} else {
		let goals = target.pos
		let path;
		if (!creep.memory.path || !creep.memory.target || creep.memory.target != target.id) {
			path = PathFinder.search(creep.pos, goals, {
				maxOps   : 1000,
				plainCost: 5,
				swampCost: 25,

				roomCallback: (roomName) => {
					let costs, room = Game.rooms[roomName];
					if (!room) {
						return;
					}
					if (!Memory.PathFinder) {
						Memory.PathFinder = {}
					}

					if (!Memory.PathFinder[roomName] || Game.time != Memory.PathFinder.time) {
						costs = new PathFinder.CostMatrix;
						// In this example `room` will always exist, but since PathFinder
						// supports searches which span multiple rooms you should be careful!
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
					} else {
						costs = PathFinder.CostMatrix.deserialize(Memory.PathFinder[roomName])
					}

					Memory.PathFinder[roomName] = costs.serialize();
					Memory.PathFinder.time      = Game.time

					return costs;
				}
			})
			console.log(path.ops)
			path = path.path
		} else {
			path = creep.memory.path
		}

		if (creep.move(creep.pos.getDirectionTo(path.shift())) == OK) {
			creep.memory.path   = path;
			creep.memory.target = target.id;
		} else {
			delete (creep.memory.path)
			delete (creep.memory.target)
		}
		creep.memory.pos = creep.pos;
	}
}


