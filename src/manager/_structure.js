import * as structure from '../structure';

export default (room, roomNext) => {
	const Memory = room.memory;
	const nextMemory = roomNext.memory;
	const targetStructures = Memory.structures;
	const targetCreeps = Memory.creeps;
	const config = Memory.config;

	structure.spawn(targetStructures.spawn, _.merge(targetCreeps.my, nextMemory.creeps.my), config);
	structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}