import { Component } from '../class';

class GrafanaConstructor extends Component {
	run = () => {
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
			};

			this.init(room, Memory.stats.rooms[room.name]);
		}
	};

	init = (room, object) => {
		this.controller(room, object);
		this.energy(room, object);
		this.spawns(room, object.spawns);
		this.storage(room, object.storage);
		this.terminal(room, object.terminal);
		this.minerals(room, object.minerals);
		this.sources(room, object.sources);
	};

	controller = (room, object) => {
		if (room.controller) {
			object.controller = {
				level: room.RCL,
				progress: room.controller.progress,
				progressTotal: room.controller.progressTotal,
			};
		}
	};

	energy = (room, object) => {
		object.energy = {
			available: room.energyAvailable,
			capacityAvailable: room.energyCapacityAvailable,
		};
	};

	spawns = (room, object) => {
		if (room.structures.spawns) {
			room.structures.spawns.forEach(spawn => {
				object[spawn.name] = {
					name: spawn.name,
					spawning: spawn.spawning !== null ? 1 : 0,
				};
			});
		}
	};

	storage = (room, object) => {
		if (room.storage) {
			object.store = _.sum(room.storage.store);
			object.resources = {};
			Object.keys(room.storage.store).forEach(resource => (object.resources[resource] = room.storage.store[resource]));
		}
	};

	terminal = (room, object) => {
		if (room.terminal) {
			object.store = _.sum(room.terminal.store);
			object.resources = {};
			Object.keys(room.terminal.store).forEach(
				resource => (object.resources[resource] = room.terminal.store[resource]),
			);
		}
	};

	minerals = (room, object) => {
		if (room.minerals) {
			room.minerals.forEach(
				mineral =>
					(object[mineral.id] = {
						id: mineral.id,
						density: mineral.density,
						mineralAmount: mineral.mineralAmount,
						mineralType: mineral.mineralType,
						ticksToRegeneration: mineral.ticksToRegeneration,
					}),
			);
		}
	};

	sources = (room, object) => {
		if (room.sources) {
			room.sources.forEach(
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
