export class RoomClass {
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
