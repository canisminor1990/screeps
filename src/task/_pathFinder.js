export default (creep, target) => {
	const targetsBuild = creep.room.memory.constructionSites;
	if (creep.fatigue > 1)return;
	let goals = target.pos
	let path;
	if (!creep.memory.path || !creep.memory.target || creep.memory.target != target.id) {
		path = PathFinder.search(creep.pos, goals, {

			plainCost: 5,
			swampCost: 25,

			roomCallback: (roomName) => {
				let costs, room = Game.rooms[roomName];
				if (!room) return;
				if (!Memory.PathFinder) {
					Memory.PathFinder = {}
				}
				const timeout = (targetsBuild.length > 0) ? 10 : 100000
				if (!Memory.PathFinder[roomName] || Game.time - Memory.PathFinder.time > timeout) {
					// In this example `room` will always exist, but since PathFinder
					// supports searches which span multiple rooms you should be careful!
					console.log(1)
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

				}
				if (Game.time != Memory.PathFinder.time) {
					room.find(FIND_CREEPS).forEach((creep) => {
						costs.set(creep.pos.x, creep.pos.y, 0xff);
					});
					Memory.PathFinder[roomName] = costs.serialize();
					Memory.PathFinder.time = Game.time
				} else {
					costs = PathFinder.CostMatrix.deserialize(Memory.PathFinder[roomName])
				}


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


