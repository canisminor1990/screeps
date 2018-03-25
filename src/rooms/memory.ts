class RoomClass {
  room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  get name(): string {
    return this.room.name;
  }

  get RCL(): number {
    return this.room.controller ? this.room.controller.level : 0;
  }

  get sources(): string[] {
    console.log(222);
    let sources: string[] = [];
    _.forEach(this.room.find(FIND_SOURCES), (source: Source) => {
      sources.push(source.id);
    });
    return sources;
  }
}

class MemoryClass {
  key: string;
  defaultValue: any;
  memory: any;

  constructor() {
    this.key = '';
    this.defaultValue = null;
  }

  pull = () => (this.memory = Memory[this.key] ? _.get(Memory, this.key) : this.defaultValue);
  push = () => (Memory[this.key] = this.memory);
}

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
