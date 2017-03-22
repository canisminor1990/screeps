import * as structure from '../structure';

export default (room) => {
    const Memory = room.memory;
    const targetStructures = Memory.structures;
    const targetCreeps = Memory.creeps;
    const config = Memory.config;
    structure.spawn(targetStructures.spawn, targetCreeps.my, config);
    structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
}