import { RoomClass } from './';

class RoomsMemoryClass extends MemoryClass {
  constructor() {
    super();
    this.key = 'rooms';
    this.defaultValue = {};
  }

  init = () => {
    this.pull();

    _.forEach(Game.rooms, (item: Room) => {
      const room = new RoomClass(item);
      this.setKey(room, 'RCL');
      this.setKey(room, 'sources', true);
    });

    this.push();
  };

  setKey = (room: any, key: string, onlyFirstLoop: boolean = false) => {
    const path = [room.name, key].join('.');
    if (onlyFirstLoop && _.has(this.memory, path)) return;
    this.memory = _.set(this.memory, path, room[key]);
  };
}

export const Rooms = new RoomsMemoryClass();
