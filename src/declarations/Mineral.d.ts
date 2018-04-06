interface Mineral {
	memory: any;
	container: StructureContainer | null;
	active: boolean;
	hasContainer: boolean;
	_checkMemory(): void;
}
