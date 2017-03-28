import * as structure from '../structure';
export default (roomArray) => {
	roomArray.forEach(roomName => {
		const room = Game.rooms[roomName];
		if (room && room.memory) {
			const structures = room.memory.structures;
			const config     = room.memory.config;
			if (roomName == "W81S67" && structures.spawn) structure.spawn(structures.spawn, config.role);
			if (structures.link) structures.link.forEach(link => structure.link(link));
			if (structures.tower) structures.tower.forEach(tower => structure.tower(tower))
		}
	})
}