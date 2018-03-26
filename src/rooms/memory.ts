import { RoomClass } from './';
import { MemoryClass } from '../memory';

class RoomsMemoryClass extends MemoryClass {
  constructor() {
    super();
    this.key = 'rooms';
    this.defaultValue = {};
  }

  init = () => {
    this.pull();

    _.forEach(Game.rooms, (item: Room) => {
      const room = new RoomClass(item, this.memory[item.name] || {});
      this.setKey(room, 'RCL');
      this.setKey(room, 'sources');
      this.setKey(room, 'spawns');
      this.setKey(room, 'containers');
    });

    this.push();
  };

  setKey = (room: any, key: string, onlyFirstLoop: boolean = false) => {
    const path = [room.name, key].join('.');
    if (onlyFirstLoop && _.has(this.memory, path)) return;
    this.memory = _.set(this.memory, path, room[key]);
  };
}

export const RoomsMemory = new RoomsMemoryClass();
