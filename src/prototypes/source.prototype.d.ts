interface SourceMemory {
  container: string | undefined;
  constructionSite: string | undefined;
  containerPos: Pos | undefined;
  minPos: Pos[] | undefined;
  containerMinPos: Pos[] | undefined;
  basedistance: number | undefined;
  basedistanceRoom: string | undefined;
}

interface Source {
  memory: SourceMemory;

  memoryCheck(): void;

  hasMiningContainer(): boolean;

  setMiningContainerId(id: string): void;

  getMiningContainer(): StructureContainer | null;

  getMiningContainerConstructionSite(): ConstructionSite | null;

  buildMiningContainer(): void;

  getMiningPositions(): RoomPosition[];

  getContainerPosition(): RoomPosition | undefined;

  getContainerMiningPositions(): RoomPosition[];

  getDistanceFrom(roomName: string): number | undefined;

  setDistanceFrom(roomName: string, distance: number): void;
}
