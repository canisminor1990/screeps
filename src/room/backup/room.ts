import { FindClass } from './find';

export class RoomClass {
  room: Room;
  roomMemory: Object;
  state: any;
  find: FindClass;

  constructor(room: Room) {
    this.room = room;
    this.roomMemory = room.memory;
    this.find = new FindClass(room);
    this.state = {};
  }

  // find = (type: string): Structure[] =>
  //   this.roomStructures.filter((s: Structure) => s.structureType === type);

  // cache-get

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

  get sources(): string[] {
    if (!this.state.sources) {
      let sources: string[] = [];
      _.forEach(this.find.sources, (s: Source) => {
        sources.push(s.id);
      });
      this.state.sources = sources;
    }
    return this.state.sources;
  }

  get minerals(): string[] {
    if (!this.state.minerals) {
      let minerals = {};
      _.forEach(this.find.minerals, (s: Mineral) => {
        minerals = {
          id: s.id,
          type: s.mineralType
        };
      });
      this.state.minerals = minerals;
    }
    return this.state.minerals;
  }

  // get

  get RCL(): number {
    return this.room.controller ? this.room.controller.level : 0;
  }

  get spawns(): string[] {
    let spawns: string[] = [];
    _.forEach(this.find.mySpawn, (s: StructureSpawn) => {
      spawns.push(s.id);
    });
    return spawns;
  }

  get containers(): Object {
    let containers = {};
    // _.forEach(this.find(STRUCTURE_CONTAINER), (s: Structure) => {
    //   // let minerals = this.room.find(FIND_MINERALS);
    //   // let source = s.pos.findInRange(this.sources, 2);
    //   // let mineral = s.pos.findInRange(minerals, 2);
    //   // let isControllerContainer = !!(this.my && s.pos.getRangeTo(this.room.controller) <= 4);
    //   _.set(containers, s.id, {
    //     id: s.id,
    //     source: true,
    //     controller: true,
    //     mineral: true
    //   });
    // });
    return containers;
  }
}
