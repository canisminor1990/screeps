// import { traveler } from '../utilities/Traveler';

// state
Creep.prototype.hasState = function() {
  return !_.isUndefined(this.memory.state);
};

Object.defineProperty(Creep.prototype, 'state', {
  get: function(): number | undefined {
    return this.memory.state;
  },
  set: function(state: number): void {
    this.memory.state = state;
  }
});

// role
Creep.prototype.role = function(): string {
  return this.memory.role;
};

// path
Creep.prototype.path = function(): string {
  return this.memory.path;
};

// homeRoom
Creep.prototype.homeRoom = function(): string {
  return this.memory.homeRoom;
};
Creep.prototype.isInHomeRoom = function(): boolean {
  return this.memory.homeRoom === this.room.name;
};

// target
Creep.prototype.targetId = function(): string | null {
  return this.memory.targetId;
};
Creep.prototype.target = function(): RoomObject | null {
  return Game.getObjectById(this.memory.targetId);
};
Creep.prototype.hasTarget = function(): boolean {
  return this.memory.targetId !== null;
};
Creep.prototype.setTarget = function(obj: RoomObject): void {
  this.memory.targetId = obj.id ? obj.id : null;
};

// action
Creep.prototype.action = function(): string | null {
  return this.memory.actionName;
};

// 是否高优先级
Creep.prototype.isPriority = function(): boolean {
  return this.memory.prioritized === true;
};

// 设置为高优先级
Creep.prototype.onPriority = function(): void {
  this.memory.prioritized = true;
};

// 设置为低优先级
Creep.prototype.offPriority = function(): void {
  this.memory.prioritized = false;
};

// 获取不满的血量
Creep.prototype.missingHits = function(): number {
  return this.hitsMax - this.hits;
};

Creep.prototype.isHurt = function(): boolean {
  return this.hits < this.hitsMax;
};

Creep.prototype.isEmpty = function(): boolean {
  return this.carry.energy === 0;
};

Creep.prototype.isFull = function(): boolean {
  return _.sum(this.carry) === this.carryCapacity;
};

// 是否在边缘
Creep.prototype.isAtBorder = function(): boolean {
  return this.pos.x === 0 || this.pos.x === 49 || this.pos.y === 0 || this.pos.y === 49;
};

// Bodypart

Creep.prototype.getBodyparts = function(partTypes: BodyPartConstant): number {
  return _(this.body)
    .filter({ partTypes })
    .value().length;
};

Creep.prototype.hasBodyparts = function(
  partTypes: BodyPartConstant | BodyPartConstant[],
  start: number = 0
): boolean {
  const body = this.body;
  const limit = body.length;
  if (!_.isArray(partTypes)) partTypes = [partTypes];
  for (let i = start; i < limit; i++) {
    if (_.includes(partTypes, body[i].type)) return true;
  }
  return false;
};

// Check if a creep has body parts of a certain type anf if it is still active.
// Accepts a single part type (like RANGED_ATTACK) or an array of part types.
// Returns true, if there is at least any one part with a matching type present and active.

Creep.prototype.hasActiveBodyparts = function(
  partTypes: BodyPartConstant | BodyPartConstant[]
): boolean {
  return this.hasBodyparts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
};
