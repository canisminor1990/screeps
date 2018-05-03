import { Component } from '../class';

class GrafanaConstructor extends Component {
	public run = () => {
		Memory.stats = { tick: Game.time };

		Memory.stats.cpu = Game.cpu;
		Memory.stats.cpu.used = Game.cpu.getUsed();
		Memory.stats.gcl = Game.gcl;

		Memory.stats.market = {
			credits: Game.market.credits,
			numOrders: Game.market.orders ? Object.keys(Game.market.orders).length : 0,
		};

		// ROOMS
		Memory.stats.rooms = {};

		for (let roomName in Game.rooms) {
			const room = Game.rooms[roomName];
			if (!room) continue;
			if (!room.my) continue;
			Memory.stats.rooms[room.name] = {
				name: room.name,
				spawns: {},
				storage: {},
				terminal: {},
				minerals: {},
				sources: {},
				controller: {},
				energy: {},
				labs: {},
				walls: {},
				ramparts: {},
			};

			this.init(room, Memory.stats.rooms[room.name]);
		}
	};

	init = (room, object) => {
		this.controller(room, object.controller);
		this.energy(room, object.energy);
		this.labs(room, object.labs);
		this.spawns(room, object.spawns);
		this.storage(room, object.storage);
		this.terminal(room, object.terminal);
		this.minerals(room, object.minerals);
		this.sources(room, object.sources);
		this.walls(room, object.walls);
		this.ramparts(room, object.ramparts);
	};
	walls = (room: Room, object) => {
		const walls: StructureWall[] = room.structures.walls;
		if (walls && walls.length > 0) {
			const hits = _.map(walls, 'hits');
			object.max = _.max(hits);
			object.avg = Math.floor(_.sum(hits) / hits.length);
		}
	};

	ramparts = (room: Room, object) => {
		const ramparts: StructureRampart[] = room.structures.ramparts;
		if (ramparts && ramparts.length > 0) {
			const hits = _.map(ramparts, 'hits');
			object.max = _.max(hits);
			object.avg = Math.floor(_.sum(hits) / hits.length);
		}
	};

	labs = (room: Room, object) => {
		const labs: StructureLab[] = room.structures.labs.all;
		if (labs && labs.length > 0) {
			_.forEach(labs, lab => {
				object[lab.id] = {
					energy: lab.energy,
					mineralType: lab.mineralType,
					mineralAmount: lab.mineralAmount,
				};
			});
		}
	};

	controller = (room: Room, object) => {
		if (room.controller) {
			object.level = room.RCL;
			object.progress = room.controller.progress;
			object.progressTotal = room.controller.progressTotal;
		}
	};

	energy = (room: Room, object) => {
		object.available = room.energyAvailable;
		object.capacityAvailable = room.energyCapacityAvailable;
	};

	spawns = (room: Room, object) => {
		const spawns: StructureSpawn[] = room.structures.spawns;
		if (spawns && spawns.length > 0) {
			_.forEach(spawns, spawn => {
				object[spawn.name] = {
					name: spawn.name,
					energy: spawn.energy,
					spawning: !!(spawn.spawning && spawn.spawning.name),
				};
				if (spawn.spawning && spawn.spawning.name) {
					object[spawn.name].name = spawn.spawning.name;
					object[spawn.name].remainingTime = spawn.spawning.remainingTime;
					object[spawn.name].needTime = spawn.spawning.needTime;
				}
			});
		}
	};

	storage = (room: Room, object) => {
		if (room.storage) {
			object.store = _.sum(room.storage.store);
			object.resources = {};
			Object.keys(room.storage.store).forEach(resource => (object.resources[resource] = room.storage.store[resource]));
		}
	};

	terminal = (room: Room, object) => {
		if (room.terminal) {
			object.store = _.sum(room.terminal.store);
			object.resources = {};
			Object.keys(room.terminal.store).forEach(
				resource => (object.resources[resource] = room.terminal.store[resource]),
			);
		}
	};

	minerals = (room: Room, object) => {
		const minerals: Mineral[] = room.minerals;
		if (minerals && minerals.length > 0) {
			const mineral = minerals[0];
			object[mineral.id] = {
				id: mineral.id,
				density: mineral.density,
				mineralAmount: mineral.mineralAmount,
				mineralType: mineral.mineralType,
				ticksToRegeneration: mineral.ticksToRegeneration,
			};
		}
	};

	sources = (room: Room, object) => {
		const sources: Source[] = room.sources;
		if (sources && sources.length > 0) {
			_.forEach(
				sources,
				source =>
					(object[source.id] = {
						id: source.id,
						energy: source.energy,
						energyCapacity: source.energyCapacity,
						ticksToRegeneration: source.ticksToRegeneration,
					}),
			);
		}
	};
}

export default new GrafanaConstructor();
