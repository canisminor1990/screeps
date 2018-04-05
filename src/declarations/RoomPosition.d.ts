interface LookForCache {
	time: number;
	value: any[];
}

interface Pos {
	x: number;
	y: number;
	roomName: string;
}

interface RoomPosition {
	raw: Pos;
	room: Room;
	memory: RoomMemory;
	terrain: Terrain;
	structures: Structure[];
	mainStructure: Structure | undefined;
	constructionSite: ConstructionSite | undefined;
	creep: Creep | undefined;
	canMoveThrough: boolean;
	isFreeSpace: boolean;

	getAdjacentPos(range: number): RoomPosition[];

	getFreeSpace(range: number): RoomPosition[];

	hasStructure(type: StructureConstant): boolean;

	getPositionInDirection(direction: number): RoomPosition;

	cacheLookFoor(type: LookConstant, timeout?: number): any[];
}
