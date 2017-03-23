import * as structure from '../structure';

export default (roomArray) => {
	const room             = Game.rooms[roomArray[0]];
	const roomNext         = Game.rooms[roomArray[1]];
	const Memory           = room.memory;
	const targetStructures = Memory.structures;
	const targetCreeps     = Memory.creeps;
	const config           = Memory.config;

	const spawn = (roomNext) ? _.merge(targetCreeps.my, roomNext.memory.creeps.my) : targetCreeps.my;

	structure.spawn(targetStructures.spawn, spawn, config);
	structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}