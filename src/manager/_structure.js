import * as structure from './structure';

export default (room) => {
	const Memory           = room.memory;
	const targetStructures = Memory.structures;
	const targetCreeps     = Memory.creeps;
	structure.spawn(targetStructures.spawn, targetCreeps.my);
	structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}