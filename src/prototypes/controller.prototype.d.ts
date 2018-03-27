interface ControllerMemory {
  containerPos: Pos | undefined;
  container: string | undefined;
  link: string | undefined;
}

interface StructureController {
  memory: ControllerMemory;

  memoryCheck(): void;

  getContainerPosition(): RoomPosition | undefined;

  getPossibleContainerPositions(): RoomPosition[];

  getOkeyContainerPosition(): RoomPosition | undefined;

  buildControllerContainer(): void;

  buildControllerLink(): void;

  hasContainer(): boolean;

  hasLink(): boolean;

  getContainerOrLink(): StructureLink | StructureContainer | undefined;

  getContainer(): StructureContainer | undefined;
}
