import * as structure from '../structure';

export default (room,roomNext) => {
    const Memory = room.memory;
    const nextMemory =  roomNext.memory;
    const targetStructures = Memory.structures;
	const nexttargetStructures = nextMemory.structures;
    const targetCreeps = Memory.creeps;
    const config = Memory.config;

console.log(nexttargetStructures.my)

    structure.spawn(targetStructures.spawn, _.merge(targetCreeps.my,nexttargetStructures.my), config);
    structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}