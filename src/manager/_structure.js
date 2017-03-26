import * as structure from '../structure';

export default (roomArray) => {
	
	_.each(roomArray, room => {
		const structures = Game.rooms[room].memory.structures;
		structure.spawn(structures.spawn);
		structures.tower.forEach(tower => structure.tower(tower))
	})
}