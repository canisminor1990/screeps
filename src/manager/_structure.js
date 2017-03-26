import * as structure from '../structure';

export default (roomArray) => {
	
	_.each(roomArray, room => {
		const structures = Game.rooms[room].memory.structures;
		const confit = Game.rooms[room].memory.config;
		structure.spawn(structures.spawn,confit);
		structures.tower.forEach(tower => structure.tower(tower))
	})
}