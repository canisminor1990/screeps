interface Structure {
	_towersSet: number;
	_towers: string[];
	towers: number;
	active: boolean;
}

interface StructureTower {
	active: boolean;
}

interface StructureWall {
	active: boolean;
	isCriticallyFortifyable: boolean;
}

interface StructureRampart {
	active: boolean;
	isCriticallyFortifyable: boolean;
}

interface StructureContainer {
	active: boolean;
}

interface StructureRoad {
	active: boolean;
}

interface StructureController {
	memory: any;
}

interface StructureStorage {
	_sumSet: number;
	_sum: number;
	sun: number;
	charge: number;
	getNeeds(resourceType: string): number;
}

interface StructureTerminal {
	_sumSet: number;
	_sum: number;
	sun: number;
	charge: number;
	getNeeds(resourceType: string): number;
}

interface StructureContainer {
	_sumSet: number;
	_sum: number;
	sun: number;
	getNeeds(resourceType: string): number;
}

interface StructureLab {
	active: boolean;
	getNeeds(resourceType: string): number;
}

interface StructurePowerSpawn {
	getNeeds(resourceType: string): number;
}
