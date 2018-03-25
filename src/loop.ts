import * as CreepManager from './components/creeps/creepManager';
import { Rooms } from './rooms/memory';

let cpuAtFirstLoop;

export default () => {
  const cpuAtLoop = Game.cpu.getUsed();
  if (Memory.pause) return;

  Rooms.init();

  if (!Memory.uuid || Memory.uuid > 100) Memory.uuid = 0;

  for (const i in Game.rooms) {
    const room: Room = Game.rooms[i];

    CreepManager.run(room);

    // Clears any non-existing creep memory.
    for (const name in Memory.creeps) {
      const creep: any = Memory.creeps[name];

      if (creep.room === room.name) {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
        }
      }
    }
  }
};
