export { RoomsMemory } from './memory';

export class RoomClass {
  room: Room;
  roomMemory: Object;
  roomStructures: Structure[];
  state: any;

  constructor(room: Room, roomMemory: Object) {
    this.room = room;
    this.roomMemory = roomMemory;
    this.roomStructures = room.find(FIND_MY_STRUCTURES);
    this.state = {};
  }

  find = (type: string): Structure[] =>
    this.roomStructures.filter((s: Structure) => s.structureType === type);

  get name(): string {
    if (!this.state.name) {
      this.state.name = this.room.name;
    }
    return this.state.name;
  }

  get my(): boolean {
    if (!this.state.my) {
      this.state.my = this.room.controller && this.room.controller.my;
    }
    return this.state.my;
  }

  get RCL(): number {
    return this.room.controller ? this.room.controller.level : 0;
  }

  get sources(): string[] {
    if (!this.state.sources) {
      let sources: string[] = [];
      _.forEach(this.room.find(FIND_SOURCES), (s: Source) => {
        sources.push(s.id);
      });
      this.state.sources = sources;
    }
    return this.state.sources;
  }

  get spawns(): string[] {
    let spawns: string[] = [];
    _.forEach(this.room.find(FIND_MY_SPAWNS), (s: StructureSpawn) => {
      spawns.push(s.id);
    });
    return spawns;
  }

  get containers(): Object {
    let containers = {};
    _.forEach(this.find(STRUCTURE_CONTAINER), (s: Structure) => {
      // let minerals = this.room.find(FIND_MINERALS);
      // let source = s.pos.findInRange(this.sources, 2);
      // let mineral = s.pos.findInRange(minerals, 2);
      // let isControllerContainer = !!(this.my && s.pos.getRangeTo(this.room.controller) <= 4);
      _.set(containers, s.id, {
        id: s.id,
        source: true,
        controller: true,
        mineral: true
      });
    });
    return containers;
  }
}
