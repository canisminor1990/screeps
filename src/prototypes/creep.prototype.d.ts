interface CreepMemory {
  state: number | undefined;
  actionName: string | null;
  targetId: string | null;
  homeRoom: string;
  path: string;
  prioritized: false;
  _travel: any;
}

interface Creep {
  memory: CreepMemory;

  // state
  hasState(): boolean;

  state: number | undefined;

  // role
  role(): string;

  // path
  path(): string;

  // homeRoom
  homeRoom(): string;

  isInHomeRoom(): boolean;

  // target
  targetId(): string | null;

  target(): RoomObject | null;

  hasTarget(): boolean;

  setTarget(obg: RoomObject): void;

  // action
  action(): string | null;

  // priority
  isPriority(): boolean;

  onPriority(): void;

  offPriority(): void;

  // 容量
  isEmpty(): boolean;

  isFull(): boolean;

  // 血量
  missingHits(): number;

  isHurt(): boolean;

  // 位置
  isAtBorder(): boolean;

  // BodyPart
  getBodyparts(partTypes: BodyPartConstant): number;

  hasBodyparts(partTypes: BodyPartConstant | BodyPartConstant[], start: number): boolean;

  hasActiveBodyparts(partTypes: BodyPartConstant | BodyPartConstant[]): boolean;
}
