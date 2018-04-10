interface RoomPosition {
	_adjacent: RoomPosition[];
	adjacent: number;

	radius(radius?: number): RoomPosition[];
}
