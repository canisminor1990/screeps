import * as structure from '../structure';

export default (roomArray) => {
	const room             = Game.rooms[roomArray[0]];
	const roomNext         = Game.rooms[roomArray[1]];
	const Memory           = room.memory;
	const targetStructures = Memory.structures;
	const targetCreeps     = Memory.creeps;
	const config           = Memory.config;
	

	structure.spawn(targetStructures.spawn, Memory.creepsGlobal, config);
	targetStructures.tower.forEach(tower => structure.tower(tower, targetStructures.needFix, targetCreeps.enemy))
}