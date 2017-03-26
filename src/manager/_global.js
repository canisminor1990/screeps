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
		console.log(room)
		if (room) sources.concat(room.memory.sources)
	})
	
	Memory.global = {
		creeps : creepArray,
		sources: sources,
	}
}