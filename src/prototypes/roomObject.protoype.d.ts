interface RoomObject {
  id: string | undefined;
  data: any;

  targetOf(): number;

  getTargetOfCreeps(): Creep[];

  accessibleFields(): number;
}
