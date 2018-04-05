interface LookForCache {
	time: number;
	value: any[];
}

interface RoomPosition {
	room: Room;
	memory: RoomMemory;
	cacheLookFoor(type: LookConstant, timeout?: number): any[];
}
