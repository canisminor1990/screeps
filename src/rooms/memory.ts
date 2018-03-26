import { RoomClass } from './room';
import { MemoryClass } from '../memory';

class RoomsMemoryClass extends MemoryClass {
  constructor() {
    super();
    this.key = 'rooms';
    this.defaultValue = {};
  }

  init = () => {
    this.pull();

    _.forEach(Game.rooms, (r: Room) => {
      if (!r.memory) r.memory = {};
      const room = new RoomClass(r);
      this.assign(room, 'RCL');
      this.assign(room, 'sources', true);
      this.assign(room, 'spawns');
      this.assign(room, 'containers');
    });

    this.push();
  };

  assign = (room: any, key: string, setOnce: boolean = false) => {
    const path = [room.name, key].join('.');
    if (setOnce && _.has(this.memory, path)) return;
    this.memory = _.set(this.memory, path, room[key]);
  };
}

export const RoomsMemory = new RoomsMemoryClass();
