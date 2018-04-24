class RoomStructuresExtend {
	room: Room;

	constructor(room: Room) {
		this.room = room;
	}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function, defaultValue: any = []): any {
		if (_.isUndefined(this[`_${key}`])) {
			if (defaultValue) this[`_${key}`] = defaultValue;
			this[`_${key}`] = func();
		}
		return this[`_${key}`];
	}

	private memoryCache(key: string, func: Function): any {
		if (_.isUndefined(this.memory[key])) {
			this.memory[key] = Util.getGame.objsToIdArray(func());
		}
		return Util.getGame.objs(this.memory[key]);
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////
	get memory(): RoomMemory {
		return this.room.memory;
	}

	set memory(value: any) {
		this.room.memory = value;
	}

	get all(): Structure[] {
		return this.cache('all', () => this.room.find(FIND_STRUCTURES));
	}

	get my(): Structure[] {
		return this.cache('my', () => this.room.find(FIND_MY_STRUCTURES));
	}

	get towers(): StructureTower[] {
		return this.cache('towers', () => Util.getGame.objs(this.memory.towers));
	}

	get container(): StructureContainer[] {
		return this.cache('container', () => new Room.Containers(this.room));
	}

	get links(): StructureLink[] {
		return this.cache('links', () => new Room.Links(this.room));
	}

	get labs(): StructureLab[] {
		return this.cache('labs', () => new Room.Labs(this.room));
	}

	get extensions(): StructureExtension[] {
		return this.memoryCache('extensions', () =>
			_.filter(this.all, (s: Structure) => s.structureType === STRUCTURE_EXTENSION),
		);
	}

	get spawns(): StructureSpawn[] {
		return this.cache('spawns', () => Util.getGame.objs(this.memory.spawns));
	}

	get powerSpawns(): StructurePowerSpawn[] {
		return this.cache('powerSpawns', () => new Room.PowerSpawn(this.room));
	}

	get nuker(): StructureNuker {
		return this.cache('nuker', () => {
			if (this.memory.nukers && this.memory.nukers.length > 0) {
				return Game.getObjectById(this.memory.nukers[0].id);
			}
		});
	}

	get nukers(): StructureNuker[] {
		return this.cache('nukers', () => new Room.Nuker(this.room));
	}

	get observer(): StructureObserver {
		return this.cache('observer', () => {
			if (this.memory.observer) {
				return Game.getObjectById(this.memory.observer.id);
			}
		});
	}

	get feedable(): (StructureExtension | StructureSpawn)[] {
		return this.cache('feedable', () => this.extensions.concat(this.spawns));
	}

	get repairable(): Structure[] {
		return this.cache('repairable', () =>
			_.sortBy(this.all.filter((s: Structure) => Room.shouldRepair(this.room, s)), 'hits'),
		);
	}

	get urgentRepairable(): Structure[] {
		return this.cache('urgentRepairable', () => {
			const isUrgent = (site: Structure) =>
				site.hits < LIMIT_URGENT_REPAIRING + (DECAY_AMOUNT[site.structureType] || 0);
			return _.filter(this.repairable, isUrgent);
		});
	}

	get fortifyable(): Structure[] {
		return this.cache('fortifyable', () => {
			return _.sortBy(
				this.all.filter(
					(structure: Structure) =>
						this.room.my &&
						structure.hits < structure.hitsMax &&
						structure.hits < MAX_FORTIFY_LIMIT[this.room.RCL] &&
						(structure.structureType != STRUCTURE_CONTAINER || structure.hits < MAX_FORTIFY_CONTAINER) &&
						(!DECAYABLES.includes(structure.structureType) ||
							structure.hitsMax - structure.hits > GAP_REPAIR_DECAYABLE * 3) &&
						(Memory.pavementArt[this.room.name] === undefined ||
							Memory.pavementArt[this.room.name].indexOf('x' + structure.pos.x + 'y' + structure.pos.y + 'x') < 0) &&
						!Flag.list.some(
							f =>
								f.roomName == structure.pos.roomName &&
								f.color == COLOR_ORANGE &&
								f.x == structure.pos.x &&
								f.y == structure.pos.y,
						),
				),
				'hits',
			);
		});
	}

	get fuelable(): StructureTower[] {
		return this.cache('fuelable', () => {
			const factor = this.room.situation.invasion ? 1 : 0.82;
			const fuelable = (t: StructureTower) => t.energy < t.energyCapacity * factor;
			return _.sortBy(_.filter(this.towers, fuelable), 'energy'); // TODO: Add Nuker
		});
	}

	get piles(): Flag[] {
		return this.cache('piles', () => {
			const room = this.room;
			return Flag.filter(FLAG_COLOR.command.drop, room.getPositionAt(25, 25), true).map((f: Flag) => {
				const flag = Game.flags[f.name];
				const piles = room.lookForAt(LOOK_ENERGY, flag.pos.x, flag.pos.y);
				return (piles.length && piles[0]) || flag;
			});
		});
	}

	get virtual(): (Structure | Flag)[] {
		return this.cache('virtual', () => _(this.all).concat(this.piles));
	}
}

export class RoomStructures {
	room: Room;

	constructor(room: Room) {
		this.room = room;
		this.extend();
	}

	extend = () => {
		Util.define(this, RoomStructuresExtend, true);
	};
}
