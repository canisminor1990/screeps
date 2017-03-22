import * as structure from '../structure';

export default (room) => {
    const Memory = room.memory;
    const roomNext = (Game.rooms['W81S66']) ? Game.rooms['W81S66'].memory.structures.my : null
    const targetStructures = Memory.structures;
    const targetCreeps = Memory.creeps;
    const config = Memory.config;

console.log(roomNext)

    structure.spawn(targetStructures.spawn, _.merge(targetCreeps.my,roomNext), config);
    structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}