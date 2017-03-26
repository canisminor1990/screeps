import * as structure from '../structure';

export default (roomArray) => {
	
	_.each(roomArray, room => {
		if (Game.rooms[room] && Game.rooms[room].memory) {
			const structures = Game.rooms[room].memory.structures;
			const config     = Game.rooms[room].memory.config;
			if (structures.spawn) structure.spawn(structures.spawn, config);
			if (structures.tower) structures.tower.forEach(tower => structure.tower(tower))
		}
	})
}