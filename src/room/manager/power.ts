import { RoomManager } from '../../class';

class PowerManager extends RoomManager {
	constructor() {
		super('power');
	}

	analyzeRoom = (room, needMemoryResync) => {
		if (needMemoryResync) {
			room.savePowerSpawn();
		}
		if (room.structures.powerSpawn) room.processPower();
	};
	freshRoom = room => {
		if (!room._powerBank) {
			delete room.memory.powerBank;
		}
	};
	prototypeExtend = () => {
		this.assignRoomPrototype({
			powerBank: {
				get() {
					if (_.isUndefined(this.memory.powerBank)) {
						[this._powerBank] = this.find(FIND_STRUCTURES, {
							filter: s => s instanceof StructurePowerBank,
						});
						if (this._powerBank) {
							this.memory.powerBank = this._powerBank.id;
						}
					}
					if (_.isUndefined(this._powerBank)) {
						this._powerBank = Game.getObjectById(this.memory.powerBank);
					}
					return this._powerBank;
				},
			},
			savePowerSpawn: {
				value() {
					let powerSpawns = this.find(FIND_MY_STRUCTURES, {
						filter: structure => structure.structureType == STRUCTURE_POWER_SPAWN,
					});
					if (powerSpawns.length > 0) {
						this.memory.powerSpawns = [];

						// for each entry add to memory ( if not contained )
						let add = powerSpawn => {
							let powerSpawnData = this.memory.powerSpawns.find(l => l.id == powerSpawn.id);
							if (!powerSpawnData) {
								this.memory.powerSpawns.push({
									id: powerSpawn.id,
								});
							}
						};
						powerSpawns.forEach(add);
					} else delete this.memory.powerSpawns;
				},
			},
			processPower: {
				value() {
					// run lab reactions WOO!
					let powerSpawns = this.find(FIND_MY_STRUCTURES, {
						filter: s => {
							return s.structureType == STRUCTURE_POWER_SPAWN;
						},
					});
					for (let i = 0; i < powerSpawns.length; i++) {
						// see if the reaction is possible
						let powerSpawn = powerSpawns[i];
						if (powerSpawn.energy >= POWER_SPAWN_ENERGY_RATIO && powerSpawn.power >= 1) {
							if (LOG_TRACE) Log.trace('Room', { roomName: this.name, actionName: 'processPower' });
							powerSpawn.processPower();
						}
					}
				},
			},
		});
	};
	roomExtend = () => {
		this.assignRoom({
			PowerSpawn: function(room) {
				this.room = room;
				Object.defineProperties(this, {
					all: {
						get() {
							if (_.isUndefined(this._all)) {
								this._all = [];
								let add = entry => {
									let o = Game.getObjectById(entry.id);
									if (o) {
										_.assign(o, entry);
										this._all.push(o);
									}
								};
								_.forEach(this.room.memory.powerSpawns, add);
							}
							return this._all;
						},
					},
				});
			},
		});
	};
}

export default new PowerManager();
