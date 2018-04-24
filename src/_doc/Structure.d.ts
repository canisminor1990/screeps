/// ////////////////////////////////////
// Structure
/// ////////////////////////////////////
interface Structure {
	_towersSet: number;
	_towers: string[];
	towers: number;
	active: boolean;
}

/// ////////////////////////////////////
// StructureContainer
/// ////////////////////////////////////
interface StructureContainer {
	active: boolean;
	_sumSet: number;
	_sum: number;
	sun: number;

	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructureController
/// ////////////////////////////////////
interface StructureController {
	memory: any;
}

/// ////////////////////////////////////
// StructureLab
/// ////////////////////////////////////
interface StructureLab {
	active: boolean;

	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructureNuker
/// ////////////////////////////////////
interface StructureNuker {
	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructurePowerSpawn
/// ////////////////////////////////////
interface StructurePowerSpawn {
	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructureRampart
/// ////////////////////////////////////
interface StructureRampart {
	active: boolean;
	isCriticallyFortifyable: boolean;
}

/// ////////////////////////////////////
// StructureRoad
/// ////////////////////////////////////
interface StructureRoad {
	active: boolean;
}

/// ////////////////////////////////////
// StructureSpawn
/// ////////////////////////////////////
interface StructureSpawn {
	run(): void | boolean;

	createCreepBySetup(setup: obj): obj | null;

	createCreepByQueue(queue: obj, level: string): null | boolean | number;

	create(body: string[], name: string, behaviour: string, destiny: string): boolean;
}

/// ////////////////////////////////////
// StructureStorage
/// ////////////////////////////////////
interface StructureStorage {
	_sumSet: number;
	_sum: number;
	sun: number;
	charge: number;

	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructureTerminal
/// ////////////////////////////////////
interface StructureTerminal {
	_sumSet: number;
	_sum: number;
	sun: number;
	charge: number;

	getNeeds(resourceType: string): number;
}

/// ////////////////////////////////////
// StructureTower
/// ////////////////////////////////////
interface StructureTower {
	active: boolean;
}

/// ////////////////////////////////////
// StructureWall
/// ////////////////////////////////////
interface StructureWall {
	active: boolean;
	isCriticallyFortifyable: boolean;
}
