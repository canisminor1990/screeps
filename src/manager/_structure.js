import * as structure from '../structure';

export default (roomArray) => {
	
	_.each(roomArray, room => {
		const structures = Game.rooms[room].memory.structures;
		const config = Game.rooms[room].memory.config;
		if (structures.spawn)structure.spawn(structures.spawn,config);
		structures.tower.forEach(tower => structure.tower(tower))
	})
}