Object.defineProperty(RoomObject.prototype, 'data', {
  get(): any {
    CMemory.check('roomObjects', {});
    if (!this.id) return undefined;
    return Memory.roomObjects[this.id];
  },
  set(value: any): void {
    CMemory.check('roomObjects', {});
    if (!this.id) return;
    Memory.roomObjects[this.id] = value;
  }
});

RoomObject.prototype.targetOf = function(): number {
  return this.getTargetOfCreeps().length;
};

RoomObject.prototype.getTargetOfCreeps = function(): Creep[] {
  if (!this.id) return [];
  return _.filter(Game.creeps, (c: Creep) => c.target === this.id) as Creep[];
};

RoomObject.prototype.accessibleFields = function(): number {
  if (!_.isUndefined(this.data.accessibleFields) && this.data.accessibleFields.time === Game.time) {
    return this.data.accessibleFields.value;
  } else {
    const fields = this.room.lookForAtArea(
      LOOK_TERRAIN,
      this.pos.y - 1,
      this.pos.x - 1,
      this.pos.y + 1,
      this.pos.x + 1,
      true
    ) as any[];
    const walls = _.countBy(fields, 'terrain').wall as number | undefined;
    const accessibleFields = walls === undefined ? 9 : 9 - walls;
    this.data.accessibleFields = {
      time: Game.time,
      value: accessibleFields
    };
    return accessibleFields;
  }
};
