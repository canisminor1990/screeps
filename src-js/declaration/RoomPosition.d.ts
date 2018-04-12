interface RoomPosition {
	_adjacent: RoomPosition[];
	adjacent: number;

	radius(radius?: number): RoomPosition[];

	newFlag(flagColour: obj, name: string): string | number | void;
}
