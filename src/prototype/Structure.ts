// Structure
// ///////////////////

Object.defineProperties(Structure.prototype, {
	towers: {
		get(): string[] {
			if (_.isUndefined(this._towers) || this._towersSet !== Game.time) {
				this._towersSet = Game.time;
				this._towers = [];
			}
			return this._towers;
		},
		set(value: string[]) {
			this._towers = value;
		},
	},
	active: {
		get(): boolean {
			if (!this.room.controller) {
				return _.get(this.room.memory, ['structures', this.id, 'active'], true);
			} else {
				if (!this.room.owner) return false;
				if (this.room.owner !== this.owner.username) return false;
				return _.get(this.room.memory, ['structures', this.id, 'active'], true);
			}
		},
	},
});

// StructureTower
// ///////////////////

Object.defineProperties(StructureTower.prototype, {
	active: {
		get(): boolean {
			if (!this.room.owner) return false;
			if (this.room.owner !== this.owner.username) return false;
			if (this.room.RCL < 3) return false;
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		},
	},
});

// StructureWall
// ///////////////////

Object.defineProperties(StructureWall.prototype, {
	active: {
		get(): boolean {
			return this.room.RCL > 1;
		},
	},
	isCriticallyFortifyable: {
		get(): boolean {
			return this.hits <= MIN_FORTIFY_LIMIT[this.room.controller.level];
		},
	},
});

// StructureRampart
// ///////////////////

Object.defineProperties(StructureRampart.prototype, {
	active: {
		get(): boolean {
			return this.room.RCL > 1;
		},
	},
	isCriticallyFortifyable: {
		get(): boolean {
			return this.hits <= MIN_FORTIFY_LIMIT[this.room.controller.level];
		},
	},
});

// StructureRoad
// ///////////////////

Object.defineProperties(StructureRoad.prototype, {
	active: {
		value: true,
	},
});

// StructureController
// ///////////////////

Object.defineProperties(StructureController.prototype, {
	memory: {
		get(): any {
			if (_.isUndefined(Memory.controllers)) {
				Memory.controllers = {};
			}
			if (!_.isObject(Memory.controllers)) {
				return undefined;
			}
			return (Memory.controllers[this.id] = Memory.controllers[this.id] || {});
		},
		set(value: any) {
			if (_.isUndefined(Memory.controllers)) {
				Memory.controllers = {};
			}
			if (!_.isObject(Memory.controllers)) {
				throw new Error('Could not set memory extension for controller');
			}
			Memory.controllers[this.id] = value;
		},
	},
});

// StructureStorage
// ///////////////////

Object.defineProperties(StructureStorage.prototype, {
	sum: {
		get(): number {
			if (_.isUndefined(this._sum) || this._sumSet !== Game.time) {
				this._sumSet = Game.time;
				this._sum = _.sum(this.store);
			}
			return this._sum;
		},
	},
	charge: {
		get(): number {
			// TODO per-room strategy
			return Util.chargeScale(
				this.store.energy,
				MIN_STORAGE_ENERGY[this.room.controller.level],
				MAX_STORAGE_ENERGY[this.room.controller.level],
			);
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			let ret = 0;
			if (!this.room.memory.resources) return 0;

			let storageData = this.room.memory.resources.storage[0];
			// look up resource and calculate needs
			let order = null;
			if (storageData)
				order = storageData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
			if (!order) order = { orderAmount: 0, orderRemaining: 0, storeAmount: 0 };
			let rcl = this.room.controller.level;
			let loadTarget = Math.max(
				order.orderRemaining + (this.store[resourceType] || 0),
				order.storeAmount + (resourceType === RESOURCE_ENERGY ? MIN_STORAGE_ENERGY[rcl] : MAX_STORAGE_MINERAL),
			);
			// storage always wants energy
			let unloadTarget =
				resourceType === RESOURCE_ENERGY
					? this.storeCapacity - this.sum + this.store.energy
					: order.orderAmount + order.storeAmount + MAX_STORAGE_MINERAL;
			if (unloadTarget < 0) unloadTarget = 0;
			let store = this.store[resourceType] || 0;
			if (store < loadTarget) ret = Math.min(loadTarget - store, this.storeCapacity - this.sum);
			else if (store > unloadTarget * 1.05) ret = unloadTarget - store;
			return ret;
		},
	},
});

// StructureTerminal
// ///////////////////

Object.defineProperties(StructureTerminal.prototype, {
	sum: {
		get(): number {
			if (_.isUndefined(this._sum) || this._sumSet !== Game.time) {
				this._sumSet = Game.time;
				this._sum = _.sum(this.store);
			}
			return this._sum;
		},
	},
	charge: {
		get(): number {
			const needs = this.getNeeds(RESOURCE_ENERGY);
			const terminalTarget = needs ? this.store[RESOURCE_ENERGY] + needs : TERMINAL_ENERGY;
			return Util.chargeScale(this.store.energy, terminalTarget, terminalTarget * 2);
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			let ret = 0;
			if (!this.room.memory.resources) return 0;
			let terminalData = this.room.memory.resources.terminal[0];
			// look up resource and calculate needs
			let order = null;
			if (terminalData)
				order = terminalData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
			if (!order) order = { orderAmount: 0, orderRemaining: 0, storeAmount: 0 };
			let loadTarget = Math.max(
				order.orderRemaining + (this.store[resourceType] || 0),
				order.storeAmount + (resourceType === RESOURCE_ENERGY ? TERMINAL_ENERGY : 0),
			);
			let unloadTarget =
				order.orderAmount + order.storeAmount + (resourceType === RESOURCE_ENERGY ? TERMINAL_ENERGY : 0);
			if (unloadTarget < 0) unloadTarget = 0;
			let store = this.store[resourceType] || 0;
			if (store < loadTarget) ret = Math.min(loadTarget - store, this.storeCapacity - this.sum);
			else if (store > unloadTarget * 1.05) ret = unloadTarget - store;
			return ret;
		},
	},
});

// StructureContainer
// ///////////////////

Object.defineProperties(StructureContainer.prototype, {
	active: {
		value: true,
	},
	sum: {
		get(): number {
			if (_.isUndefined(this._sum) || this._sumSet != Game.time) {
				this._sumSet = Game.time;
				this._sum = _.sum(this.store);
			}
			return this._sum;
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			if (!this.room.memory.resources) return 0;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.container.find(s => s.id == this.id);
			if (containerData) {
				let order = containerData.orders.find(o => {
					return o.type == resourceType;
				});
				if (order) {
					let loadTarget = Math.max(order.orderRemaining + (this.store[resourceType] || 0), order.storeAmount);
					let unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
					let store = this.store[resourceType] || 0;
					if (store < loadTarget) return Math.min(loadTarget - store, this.storeCapacity - this.sum);
					if (store > unloadTarget * 1.05) return unloadTarget - store;
				}
			}
			return 0;
		},
	},
});

// StructureLab
// ///////////////////

Object.defineProperties(StructureLab.prototype, {
	active: {
		get(): boolean {
			if (!this.room.owner) return false;
			if (this.room.owner !== this.owner.username) return false;
			if (this.room.RCL < 6) return false;
			return _.get(this.room.memory, ['structures', this.id, 'active'], true);
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			if (!this.room.memory.resources) return 0;
			let loadTarget = 0;
			let unloadTarget = 0;
			let reaction = this.room.memory.resources.reactions;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.lab.find((s: obj) => s.id === this.id);
			if (containerData) {
				let order = containerData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
				if (order) {
					let amt = 0;
					if (resourceType === RESOURCE_ENERGY) amt = this.energy;
					else if (resourceType === this.mineralType) amt = this.mineralAmount;
					loadTarget = Math.max(order.orderRemaining + amt, order.storeAmount);
					unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
				}
			}
			let store = 0;
			let space = 0;
			let cap = 0;
			if (resourceType === RESOURCE_ENERGY) {
				store = this.energy;
				space = this.energyCapacity - this.energy;
				cap = this.energyCapacity;
			} else {
				if (this.mineralType === resourceType) store = this.mineralAmount;
				space = this.mineralCapacity - this.mineralAmount;
				cap = this.mineralCapacity;
			}

			if (
				containerData &&
				reaction &&
				reaction.orders.length > 0 &&
				(this.id === reaction.seed_a || this.id === reaction.seed_b) &&
				(resourceType !== LAB_REACTIONS[reaction.orders[0].type][0] ||
					resourceType !== LAB_REACTIONS[reaction.orders[0].type][1])
			) {
				if (store > unloadTarget) return unloadTarget - store;
			}

			if (store < Math.min(loadTarget, cap) / 2) return Math.min(loadTarget - store, space);
			if (containerData && containerData.reactionType === this.mineralType) {
				if (store > unloadTarget + (cap - Math.min(unloadTarget, cap)) / 2) return unloadTarget - store;
			} else {
				if (store > unloadTarget) return unloadTarget - store;
			}
			return 0;
		},
	},
});

// StructureSpawn
// ///////////////////

Object.defineProperties(StructureSpawn.prototype, {
	run: {
		value() {
			if (this.spawning) return;
			let room = this.room;
			// old spawning system
			let probe = setup => {
				return setup.isValidSetup(room) && this.createCreepBySetup(setup);
			};

			const spawnDelay = Util.get(this.room.memory, 'spawnDelay', {});
			let busy = this.createCreepByQueue(room.spawnQueueHigh, 'High');
			// don't spawn lower if there is one waiting in the higher queue
			if (
				!busy &&
				(room.spawnQueueHigh.length === 0 || room.spawnQueueHigh.length === spawnDelay.High) &&
				Game.time % SPAWN_INTERVAL === 0
			) {
				busy = _.some(StructureSpawn.priorityHigh, probe);
				if (!busy) busy = this.createCreepByQueue(room.spawnQueueMedium, 'Medium');
				if (!busy && (room.spawnQueueMedium.length === 0 || room.spawnQueueMedium.length === spawnDelay.Medium)) {
					busy = _.some(StructureSpawn.priorityLow, probe);
					if (!busy) busy = this.createCreepByQueue(room.spawnQueueLow, 'Low');
				}
			}
			return busy;
		},
	},
	createCreepBySetup: {
		value(setup) {
			if (DEBUG && TRACE)
				Util.trace(
					'Spawn',
					{
						setupType: this.type,
						rcl: this.room.controller.level,
						energy: this.room.energyAvailable,
						maxEnergy: this.room.energyCapacityAvailable,
						Spawn: 'createCreepBySetup',
					},
					'creating creep',
				);
			let params = setup.buildParams(this);
			if (this.create(params.parts, params.name, params.setup)) return params;
			return null;
		},
	},
	createCreepByQueue: {
		value(queue, level) {
			const spawnDelay = Util.get(this.room.memory, 'spawnDelay', {});
			if (!queue) return null;
			else if (Memory.CPU_CRITICAL && spawnDelay[level] === queue.length) return null;
			let params;
			for (const index in queue) {
				const entry = queue[index];
				if (Memory.CPU_CRITICAL && !CRITICAL_ROLES.includes(entry.behaviour)) continue;
				else params = queue.splice(index, 1)[0];
			}
			if (!params) {
				if (queue.length && DEBUG)
					Util.logSystem(
						this.pos.roomName,
						'No non-CRITICAL creeps to spawn, delaying spawn until CPU is not CRITICAL, or new entries are added.',
					);
				spawnDelay[level] = queue.length;
				return null;
			}
			delete spawnDelay[level];
			let cost = 0;
			params.parts.forEach(function(part) {
				cost += BODYPART_COST[part];
			});
			// no parts
			if (cost === 0) {
				Util.logSystem(this.pos.roomName, Util.dye(CRAYON.error, 'Zero parts body creep queued. Removed.'));
				return false;
			}
			// wait with spawning until enough resources are available
			if (cost > this.room.remainingEnergyAvailable) {
				if (cost > this.room.energyCapacityAvailable || (cost > 300 && !this.room.creeps.length)) {
					Util.logSystem(
						this.pos.roomName,
						Util.dye(CRAYON.error, 'Queued creep too big for room: ' + JSON.stringify(params)),
					);
					return false;
				}
				queue.unshift(params);
				return true;
			}
			let completeName;
			let stumb = params.name;
			for (let son = 1; completeName == null || Game.creeps[completeName] || Memory.population[completeName]; son++) {
				completeName = params.name + '-' + son;
			}
			params.name = completeName;
			let result = this.create(params.parts, params.name, params.behaviour || params.setup, params.destiny);
			if (!result) {
				params.name = stumb;
				queue.unshift(params);
			}
			return result;
		},
	},
	create: {
		value(body, name, behaviour, destiny) {
			if (body.length == 0) return false;
			let newName = this.createCreep(body, name, null);
			if (name == newName || Util.translateErrorCode(newName) === undefined) {
				let cost = 0;
				body.forEach(function(part) {
					cost += BODYPART_COST[part];
				});
				this.room.reservedSpawnEnergy += cost;
				Population.registerCreep(newName, behaviour, cost, this.room, this.name, body, destiny);
				this.newSpawn = { name: newName };
				Creep.spawningStarted.trigger({
					spawn: this.name,
					name: newName,
					body: body,
					destiny: destiny,
					spawnTime: body.length * CREEP_SPAWN_TIME,
				});
				if (CENSUS_ANNOUNCEMENTS)
					Util.logSystem(this.pos.roomName, Util.dye(CRAYON.birth, 'Good morning ' + newName + '!'));
				return true;
			}
			if (DEBUG || CENSUS_ANNOUNCEMENTS)
				Util.logSystem(
					this.pos.roomName,
					Util.dye(
						CRAYON.error,
						'Offspring failed: ' +
							Util.translateErrorCode(newName) +
							'<br/> - body: ' +
							JSON.stringify(_.countBy(body)) +
							'<br/> - name: ' +
							name +
							'<br/> - behaviour: ' +
							behaviour +
							'<br/> - destiny: ' +
							destiny,
					),
				);
			return false;
		},
	},
});

// StructurePowerSpawn
// ///////////////////

Object.defineProperties(StructurePowerSpawn.prototype, {
	getNeeds: {
		value(resourceType: string): number {
			// if parameter is enabled then autofill powerSpawns
			if (FILL_POWERSPAWN && !this.room.isCriticallyFortifyable) {
				if (resourceType === RESOURCE_ENERGY && this.energy < this.energyCapacity * 0.75) {
					return this.energyCapacity - this.energy;
				}
				if (resourceType === RESOURCE_POWER && this.power < this.powerCapacity * 0.25) {
					return this.powerCapacity - this.power;
				}
				return 0;
			}
			if (!this.room.memory.resources || !this.room.memory.resources.powerSpawn) return 0;
			let loadTarget = 0;
			let unloadTarget = 0;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.powerSpawn.find((s: obj) => s.id === this.id);
			if (containerData) {
				let order = containerData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
				if (order) {
					let amt = 0;
					if (resourceType === RESOURCE_ENERGY) amt = this.energy;
					else if (resourceType === RESOURCE_POWER) amt = this.power;
					loadTarget = Math.max(order.orderRemaining + amt, order.storeAmount);
					unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
				}
			}
			let store = 0;
			let space = 0;
			if (resourceType === RESOURCE_ENERGY) {
				store = this.energy;
				space = this.energyCapacity - this.energy;
			} else if (resourceType === RESOURCE_POWER) {
				store = this.power;
				space = this.powerCapacity - this.power;
			}
			if (store < loadTarget) return Math.min(loadTarget - store, space);
			if (store > unloadTarget * 1.05) return unloadTarget - store;
			return 0;
		},
	},
});
