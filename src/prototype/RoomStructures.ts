export class RoomStructures {
	constructor(room) {
		this.room = room;

		Object.defineProperties(this, {
			all: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._all)) {
						this._all = this.room.find(FIND_STRUCTURES);
					}
					return this._all;
				},
			},
			my: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._my)) {
						this._my = this.room.find(FIND_MY_STRUCTURES);
					}
					return this._my;
				},
			},
			towers: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._towers)) {
						this._towers = [];
						let add = id => {
							Util.addById(this._towers, id);
						};
						_.forEach(this.room.memory.towers, add);
					}
					return this._towers;
				},
			},
			repairable: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._repairable)) {
						let that = this;
						this._repairable = _.sortBy(
							that.all.filter(structure => Room.shouldRepair(that.room, structure)),
							'hits',
						);
					}
					return this._repairable;
				},
			},
			urgentRepairable: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._urgentRepairableSites)) {
						let isUrgent = site =>
							site.hits < LIMIT_URGENT_REPAIRING + (DECAY_AMOUNT[site.structureType] || 0);
						this._urgentRepairableSites = _.filter(this.repairable, isUrgent);
					}
					return this._urgentRepairableSites;
				},
			},
			feedable: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._feedable)) {
						this._feedable = this.extensions.concat(this.spawns);
					}
					return this._feedable;
				},
			},
			fortifyable: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._fortifyableSites)) {
						let that = this;
						this._fortifyableSites = _.sortBy(
							that.all.filter(
								structure =>
									that.room.my &&
									structure.hits < structure.hitsMax &&
									structure.hits < MAX_FORTIFY_LIMIT[that.room.controller.level] &&
									(structure.structureType != STRUCTURE_CONTAINER ||
										structure.hits < MAX_FORTIFY_CONTAINER) &&
									(!DECAYABLES.includes(structure.structureType) ||
										structure.hitsMax - structure.hits > GAP_REPAIR_DECAYABLE * 3) &&
									(Memory.pavementArt[that.room.name] === undefined ||
										Memory.pavementArt[that.room.name].indexOf(
											'x' + structure.pos.x + 'y' + structure.pos.y + 'x',
										) < 0) &&
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
					}
					return this._fortifyableSites;
				},
			},
			fuelable: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._fuelables)) {
						let that = this;
						let factor = that.room.situation.invasion ? 1 : 0.82;
						let fuelable = target => target.energy < target.energyCapacity * factor;
						this._fuelables = _.sortBy(_.filter(this.towers, fuelable), 'energy'); // TODO: Add Nuker
					}
					return this._fuelables;
				},
			},
			container: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._container)) {
						this._container = new Room.Containers(this.room);
					}
					return this._container;
				},
			},
			links: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._links)) {
						this._links = new Room.Links(this.room);
					}
					return this._links;
				},
			},
			labs: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._labs)) {
						this._labs = new Room.Labs(this.room);
					}
					return this._labs;
				},
			},
			virtual: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._virtual)) {
						this._virtual = _(this.all).concat(this.piles);
					}
					return this._virtual;
				},
			},
			piles: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._piles)) {
						const room = this.room;
						this._piles = Flag.filter(
							FLAG_COLOR.command.drop,
							room.getPositionAt(25, 25),
							true,
						).map(function(flagInformation) {
							const flag = Game.flags[flagInformation.name];
							const piles = room.lookForAt(LOOK_ENERGY, flag.pos.x, flag.pos.y);
							return (piles.length && piles[0]) || flag;
						});
					}
					return this._piles;
				},
			},
			observer: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._observer) && this.room.memory.observer) {
						this._observer = Game.getObjectById(this.room.memory.observer.id);
					}
					return this._observer;
				},
			},
			nuker: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._nuker)) {
						if (this.room.memory.nukers && this.room.memory.nukers.length > 0) {
							this._nuker = Game.getObjectById(this.room.memory.nukers[0].id);
						}
					}
					return this._nuker;
				},
			},
			nukers: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._nukers)) {
						this._nukers = new Room.Nuker(this.room);
					}
					return this._nukers;
				},
			},
			powerSpawn: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._powerSpawn)) {
						if (this.room.memory.powerSpawns && this.room.memory.powerSpawns.length > 0) {
							this._powerSpawn = Game.getObjectById(this.room.memory.powerSpawns[0].id);
						}
					}
					return this._powerSpawn;
				},
			},
			powerSpawns: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._powerSpawns)) {
						this._powerSpawns = new Room.PowerSpawn(this.room);
					}
					return this._powerSpawns;
				},
			},
			extensions: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this.room.memory.extensions)) {
						this.room.saveExtensions();
					}
					if (_.isUndefined(this._extensions)) {
						this._extensions = _.map(this.room.memory.extensions, e => Game.getObjectById(e));
					}
					return this._extensions;
				},
			},
			spawns: {
				configurable: true,
				get: function() {
					if (_.isUndefined(this._spawns)) {
						this._spawns = [];
						let addSpawn = id => {
							Util.addById(this._spawns, id);
						};
						_.forEach(this.room.memory.spawns, addSpawn);
					}
					return this._spawns;
				},
			},
		});
	}
}
