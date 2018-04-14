Object.defineProperties(Room.prototype, {
	combatCreeps: {
		get() {
			if (_.isUndefined(this._combatCreeps)) {
				this._combatCreeps = this.creeps.filter(c =>
					['melee', 'ranger', 'healer', 'warrior'].includes(c.data.creepType),
				);
			}
			return this._combatCreeps;
		},
	},
	casualties: {
		get() {
			if (_.isUndefined(this._casualties)) {
				let isInjured = creep => creep.hits < creep.hitsMax && (creep.towers === undefined || creep.towers.length == 0);
				this._casualties = _.sortBy(_.filter(this.creeps, isInjured), 'hits');
			}
			return this._casualties;
		},
	},
	conserveForDefense: {
		get() {
			return this.my && this.storage && this.storage.charge < 0;
		},
	},
	defenseLevel: {
		get() {
			if (_.isUndefined(this._defenseLevel)) {
				this._defenseLevel = {
					towers: 0,
					creeps: 0,
					sum: 0,
				};
				let evaluate = creep => {
					this._defenseLevel.creeps += creep.threat;
				};
				this.combatCreeps.forEach(evaluate);
				this._defenseLevel.towers = this.structures.towers.length;
				this._defenseLevel.sum = this._defenseLevel.creeps + this._defenseLevel.towers * Creep.partThreat.tower;
			}
			return this._defenseLevel;
		},
	},
	hostile: {
		get() {
			return this.memory.hostile;
		},
	},
	hostiles: {
		configurable: true,
		get() {
			if (_.isUndefined(this._hostiles)) {
				this._hostiles = this.find(FIND_HOSTILE_CREEPS, { filter: Task.reputation.hostileOwner });
			}
			return this._hostiles;
		},
	},
	hostileIds: {
		get() {
			if (_.isUndefined(this._hostileIds)) {
				this._hostileIds = _.map(this.hostiles, 'id');
			}
			return this._hostileIds;
		},
	},
	hostileThreatLevel: {
		get() {
			if (_.isUndefined(this._hostileThreatLevel)) {
				// TODO: add towers when in foreign room
				this._hostileThreatLevel = 0;
				let evaluateBody = creep => {
					this._hostileThreatLevel += creep.threat;
				};
				this.hostiles.forEach(evaluateBody);
			}
			return this._hostileThreatLevel;
		},
	},
	processInvaders: {
		value() {
			if (this.memory.hostileIds === undefined) this.memory.hostileIds = [];
			if (!SEND_STATISTIC_REPORTS) delete this.memory.statistics;
			else if (this.memory.statistics === undefined) {
				this.memory.statistics = {};
			}

			let registerHostile = creep => {
				if (Room.isCenterNineRoom(this.name)) return;
				// if invader id unregistered
				if (!this.memory.hostileIds.includes(creep.id)) {
					// handle new invader
					// register
					this.memory.hostileIds.push(creep.id);
					// save to trigger subscribers later
					this.newInvader.push(creep);
					// create statistics
					if (SEND_STATISTIC_REPORTS) {
						let bodyCount = JSON.stringify(_.countBy(creep.body, 'type'));
						if (this.memory.statistics.invaders === undefined) this.memory.statistics.invaders = [];
						this.memory.statistics.invaders.push({
							owner: creep.owner.username,
							id: creep.id,
							body: bodyCount,
							enter: Game.time,
							time: Date.now(),
						});
					}
				}
			};
			_.forEach(this.hostiles, registerHostile);

			let registerHostileLeave = id => {
				const creep = Game.getObjectById(id);
				const stillHostile = creep && Task.reputation.hostileOwner(creep);
				// for each known invader
				if (!stillHostile) {
					// save to trigger subscribers later
					this.goneInvader.push(id);
					// update statistics
					if (
						SEND_STATISTIC_REPORTS &&
						this.memory.statistics &&
						this.memory.statistics.invaders !== undefined &&
						this.memory.statistics.invaders.length > 0
					) {
						let select = invader => invader.id == id && invader.leave === undefined;
						let entry = _.find(this.memory.statistics.invaders, select);
						if (entry != undefined) entry.leave = Game.time;
					}
				}
			};
			_.forEach(this.memory.hostileIds, registerHostileLeave);

			this.memory.hostileIds = this.hostileIds;
		},
	},
	registerIsHostile: {
		value() {
			if (this.controller) {
				if (_.isUndefined(this.hostile) || typeof this.hostile === 'number') {
					// not overridden by user
					if (this.controller.owner && !this.controller.my && !this.ally) {
						this.memory.hostile = this.controller.level;
					} else {
						delete this.memory.hostile;
					}
				}
			}
		},
	},
	newFlag: {
		/**
		 * Create a new flag
		 * @param {Object|string} flagColour - An object with color and secondaryColor properties, or a string path for a FLAG_COLOR
		 * @param {RoomPosition} [pos] - The position to place the flag. Will assume (25, 25) if left undefined
		 * @param {string} [name] - Optional name for the flag
		 * @returns {string|Number} The name of the flag or an error code.
		 */
		value: (flagColour: obj, pos: RoomPosition, name: string): string | number | void => {
			if (!pos) pos = this.getPositionAt(25, 25);
			return pos.newFlag(flagColour, name);
		},
	},
});
