interface RoomPosition {
	adjacent: RoomPosition[];

	radius(radius?: number): RoomPosition[];

	findClosestByPathFinder(goals: RoomObject[], itr: Function): RoomObject;

	findClosestSpawn(): StructureSpawn;

	newFlag(flagColour: obj, name: string): string | number | void;
}
