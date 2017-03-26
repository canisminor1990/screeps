import * as structure from '../structure';

export default (roomArray) => {
	roomArray.forEach(room => {
		room = Game.rooms[room];
		if (room && room.memory) {
			const structures = room.memory.structures;
			const config     = room.memory.config;
			if (structures.spawn) structure.spawn(structures.spawn, config);
			if (structures.link) structures.link.forEach(link => structure.link(link));
			if (structures.tower) structures.tower.forEach(tower => structure.tower(tower))
		}
	})
}