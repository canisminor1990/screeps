interface RoomPosition {
  getPos(): Pos;

  getClosestSpawn(): StructureSpawn;

  hasFreeSpaceAround(): boolean;

  getFreeSpaceAround(): number;

  hasBuildingType(structureType: string): boolean;

  getPositionInDirection(direction: number): RoomPosition;
}
