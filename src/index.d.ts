interface Memory {
  uuid: number;
}

// memory extension samples
interface CreepMemory {
	role: string;
	room: string;
	working: boolean;
}

interface RoomMemory {
	RCL: number;
	spawns: string[];
	sources: string[];
	extensions: string[];
	myTotalSites: number;
	myTotalStructures: number;
}

interface PopulationMemory{
	spawned: boolean,
	creepName:string,
	creepType:string,
	weight:number,
	body: any[],
	carryCapacityLeft: number,
	//
	room:string,
	homeRoom:string,
	motherSpawn:string,
	//
	flagName: string | null,
	target:string,
	lastTarget:string,
	action:string,
	lastAction:string,
	//
	flee:boolean // 逃跑
}

// add objects to `global` here
declare namespace NodeJS {
	interface Global {
		log: any;
	}
}