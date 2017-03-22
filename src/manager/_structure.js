import * as structure from '../structure';

export default (room,roomNext) => {
    const Memory = room.memory;
    const nextMy =  roomNext.memory;
    const targetStructures = Memory.structures;
    const targetCreeps = Memory.creeps;
    const config = Memory.config;

console.log(nextMy)

    structure.spawn(targetStructures.spawn, _.merge(targetCreeps.my,{}), config);
    structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}