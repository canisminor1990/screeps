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
	canBuild: boolean;

	getAdjacentPos(range: number): RoomPosition[];

	getCanBuildSpaces(range: number): RoomPosition[];

	getStructure(type: StructureConstant): Structure | undefined;

	getPositionInDirection(direction: number): RoomPosition;

	cacheLookFor(type: LookConstant, timeout?: number): any[];
}
