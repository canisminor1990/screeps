export default (roomArray) => {
	let creepArray = {}
	for (let name in Game.creeps) {
		let creep = Game.creeps[name]
		if (!creepArray[creep.memory.role]) creepArray[creep.memory.role] = [];
		creepArray[creep.memory.role].push(Game.creeps[name])
	}
	
	let sources = []
	roomArray.forEach(room => {
		room = Game.rooms[room];
		if (room) sources = sources.concat(room.memory.sources)
	})
	
	Memory.global = {
		creeps : creepArray,
		sources: sources,
	}
}