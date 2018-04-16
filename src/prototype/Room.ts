import { RoomStructures } from './RoomStructures';
// save original API functions
Room.prototype._find = Room.prototype.find;
Object.defineProperties(Room.prototype, {
	print: {
		get(): string {
			return Util.makeRoomUrl(this.name);
		},
	},
	find: {
		value(c, opt) {
			if (_.isArray(c)) {
				return _(c)
					.map(type => this._find(type, opt))
					.flatten()
					.value();
			} else return this._find(c, opt);
		},
	},
	structures: {
		get() {
			if (_.isUndefined(this._structures)) {
				this._structures = new RoomStructures(this);
			}
			return this._structures;
		},
	},
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
				this._defenseLevel.sum = this._defenseLevel.creeps + this._defenseLevel.towers * CREEP_PART_THREAT.tower;
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
	flags: {
		get() {
			return Util.get(this, '_flags', _.filter(Flag.list, { roomName: this.name }));
		},
	},
	isCriticallyFortifyable: {
		get() {
			return _.some(this.structures.fortifyable, 'isCriticallyFortifyable');
		},
	},
	relativeEnergyAvailable: {
		get() {
			if (_.isUndefined(this._relativeEnergyAvailable)) {
				this._relativeEnergyAvailable =
					this.energyCapacityAvailable > 0 ? this.energyAvailable / this.energyCapacityAvailable : 0;
			}
			return this._relativeEnergyAvailable;
		},
	},
	relativeRemainingEnergyAvailable: {
		get() {
			return this.energyCapacityAvailable > 0 ? this.remainingEnergyAvailable / this.energyCapacityAvailable : 0;
		},
	},
	remainingEnergyAvailable: {
		get() {
			return this.energyAvailable - this.reservedSpawnEnergy;
		},
	},
	reservedSpawnEnergy: {
		get() {
			if (_.isUndefined(this._reservedSpawnEnergy)) {
				this._reservedSpawnEnergy = 0;
			}
			return this._reservedSpawnEnergy;
		},
		set(value) {
			this._reservedSpawnEnergy = value;
		},
	},
	creeps: {
		get() {
			if (_.isUndefined(this._creeps)) {
				this._creeps = this.find(FIND_MY_CREEPS);
			}
			return this._creeps;
		},
	},
	allCreeps: {
		get() {
			if (_.isUndefined(this._allCreeps)) {
				this._allCreeps = this.find(FIND_CREEPS);
			}
			return this._allCreeps;
		},
	},
	immobileCreeps: {
		get() {
			if (_.isUndefined(this._immobileCreeps)) {
				this._immobileCreeps = _.filter(this.creeps, c => {
					const s = c.data && c.data.determinatedSpot;
					return s && c.pos.isEqualTo(c.room.getPositionAt(s.x, s.y));
				});
			}
			return this._immobileCreeps;
		},
	},
	situation: {
		get() {
			if (_.isUndefined(this._situation)) {
				this._situation = {
					noEnergy: this.sourceEnergyAvailable == 0,
					invasion: this.hostiles.length > 0 && (!this.controller || !this.controller.safeMode),
				};
			}
			return this._situation;
		},
	},
	adjacentRooms: {
		get() {
			if (_.isUndefined(this.memory.adjacentRooms)) {
				this.memory.adjacentRooms = Room.adjacentRooms(this.name);
			}
			return this.memory.adjacentRooms;
		},
	},
	adjacentAccessibleRooms: {
		get() {
			if (_.isUndefined(this.memory.adjacentAccessibleRooms)) {
				this.memory.adjacentAccessibleRooms = Room.adjacentAccessibleRooms(this.name);
			}
			return this.memory.adjacentAccessibleRooms;
		},
	},
	privateerMaxWeight: {
		get() {
			if (_.isUndefined(this._privateerMaxWeight)) {
				this._privateerMaxWeight = 0;
				if (!this.situation.invasion && !this.conserveForDefense) {
					let base = this.controller.level * 1000;

					let adjacent, ownNeighbor, room, mult;

					let flagEntries = Flag.filter(FLAG_COLOR.invade.exploit);
					let countOwn = roomName => {
						if (roomName == this.name) return;
						if (Room.isMine(roomName)) ownNeighbor++;
					};
					let calcWeight = flagEntry => {
						if (!this.adjacentAccessibleRooms.includes(flagEntry.roomName)) return;
						room = Game.rooms[flagEntry.roomName];
						if (room) {
							adjacent = room.adjacentAccessibleRooms;
							mult = room.sources.length;
						} else {
							adjacent = Room.adjacentAccessibleRooms(flagEntry.roomName);
							mult = 1;
						}
						ownNeighbor = 1;
						adjacent.forEach(countOwn);
						this._privateerMaxWeight += mult * base / ownNeighbor;
					};
					flagEntries.forEach(calcWeight);
				}
			}
			return this._privateerMaxWeight;
		},
	},
	claimerMaxWeight: {
		get() {
			if (_.isUndefined(this._claimerMaxWeight)) {
				this._claimerMaxWeight = 0;
				let base = 1250;
				let maxRange = 2;
				let distance, reserved, flag;
				let rcl = this.controller.level;

				let flagEntries = Flag.filter([FLAG_COLOR.claim, FLAG_COLOR.claim.reserve, FLAG_COLOR.invade.exploit]);
				let calcWeight = flagEntry => {
					// don't spawn claimer for reservation at RCL < 4 (claimer not big enough)
					if (
						rcl > 3 ||
						(flagEntry.color == FLAG_COLOR.claim.color && flagEntry.secondaryColor == FLAG_COLOR.claim.secondaryColor)
					) {
						distance = Room.roomDistance(this.name, flagEntry.roomName);
						if (distance > maxRange) return;
						flag = Game.flags[flagEntry.name];
						if (
							flag.room &&
							flag.room.controller &&
							flag.room.controller.reservation &&
							flag.room.controller.reservation.ticksToEnd > 2500
						)
							return;

						reserved =
							flag.targetOf && flag.targetOf
								? _.sum(flag.targetOf.map(t => (t.creepType == 'claimer' ? t.weight : 0)))
								: 0;
						this._claimerMaxWeight += base - reserved;
					}
				};
				flagEntries.forEach(calcWeight);
			}
			return this._claimerMaxWeight;
		},
	},
	structureMatrix: {
		get() {
			if (_.isUndefined(this._structureMatrix)) {
				const cachedMatrix = Room.getCachedStructureMatrix(this.name);
				if (cachedMatrix) {
					this._structureMatrix = cachedMatrix;
				} else {
					Log.room(this.name, 'Matrix: Calculating cost matrix');
					const costMatrix = new PathFinder.CostMatrix();
					let setCosts = structure => {
						const site = structure instanceof ConstructionSite;
						// don't walk on allied construction sites.
						if (site && !structure.my && Task.reputation.allyOwner(structure))
							return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
						if (structure.structureType === STRUCTURE_ROAD) {
							if (!site || USE_UNBUILT_ROADS) return costMatrix.set(structure.pos.x, structure.pos.y, 1);
						} else if (structure.structureType === STRUCTURE_PORTAL) {
							return costMatrix.set(structure.pos.x, structure.pos.y, 0xff); // only take final step onto portals
						} else if (OBSTACLE_OBJECT_TYPES.includes(structure.structureType)) {
							if (!site || Task.reputation.allyOwner(structure))
								// don't set for hostile construction sites
								return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
						} else if (structure.structureType === STRUCTURE_RAMPART && !structure.my && !structure.isPublic) {
							if (!site || Task.reputation.allyOwner(structure))
								// don't set for hostile construction sites
								return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
						}
					};
					this.structures.all.forEach(setCosts);
					this.constructionSites.forEach(setCosts);
					this.immobileCreeps.forEach(c => costMatrix.set(c.pos.x, c.pos.y, 0xff));
					const prevTime = _.get(Room.pathfinderCache, [this.name, 'updated']);
					Room.pathfinderCache[this.name] = {
						costMatrix: costMatrix,
						updated: Game.time,
						version: Room.COSTMATRIX_CACHE_VERSION,
					};
					Room.pathfinderCacheDirty = true;
					if (LOG_TRACE)
						Log.trace(
							'PathFinder',
							{
								roomName: this.name,
								prevTime,
								structures: this.structures.all.length,
								PathFinder: 'CostMatrix',
							},
							'updated costmatrix',
						);
					this._structureMatrix = costMatrix;
				}
			}
			return this._structureMatrix;
		},
	},
	avoidSKMatrix: {
		get() {
			if (_.isUndefined(this._avoidSKMatrix)) {
				const SKCreeps = this.hostiles.filter(c => c.owner.username === 'Source Keeper');
				this._avoidSKMatrix = this.getAvoidMatrix({ 'Source Keeper': SKCreeps });
			}
			return this._avoidSKMatrix;
		},
	},
	my: {
		get() {
			if (_.isUndefined(this._my)) {
				this._my = this.controller && this.controller.my;
			}
			return this._my;
		},
	},
	myReservation: {
		get() {
			if (_.isUndefined(this._myReservation)) {
				this._myReservation = this.reservation === ME;
			}
			return this._myReservation;
		},
	},
	reserved: {
		get() {
			if (_.isUndefined(this._reserved)) {
				if (this.controller) {
					const myName = _.find(Game.spawns).owner.username;
					this._reserved =
						this.controller.my || (this.controller.reservation && this.controller.reservation.username === myName);
				} else {
					this._reserved = false;
				}
			}
			return this._reserved;
		},
	},
	owner: {
		get() {
			if (_.isUndefined(this._owner)) {
				if (this.controller && this.controller.owner) {
					this._owner = this.controller.owner.username;
				} else {
					this._owner = false;
				}
			}
			return this._owner;
		},
	},
	reservation: {
		get() {
			if (_.isUndefined(this._reservation)) {
				if (this.controller && this.controller.reservation) {
					this._reservation = this.controller.reservation.username;
				} else {
					this._reservation = false;
				}
			}
			return this._reservation;
		},
	},
	ally: {
		get() {
			if (_.isUndefined(this._ally)) {
				if (this.reserved) {
					this._ally = true;
				} else if (this.controller) {
					this._ally = Task.reputation.isAlly(this.owner) || Task.reputation.isAlly(this.reservation);
				} else {
					this._ally = false;
				}
			}
			return this._ally;
		},
	},
	pavementArt: {
		get() {
			if (_.isUndefined(this.memory.pavementArt)) {
				this.memory.pavementArt = [];
			}
			return this.memory.pavementArt;
		},
	},
	collapsed: {
		get() {
			if (_.isUndefined(this._collapsed)) {
				// only if owned
				if (!this.my) {
					this._collapsed = false;
					return;
				}
				// no creeps ? collapsed!
				if (!this.population) {
					this._collapsed = true;
					return;
				}
				// is collapsed if workers + haulers + pioneers in room = 0
				let workers = this.population.typeCount['worker'] ? this.population.typeCount['worker'] : 0;
				let haulers = this.population.typeCount['hauler'] ? this.population.typeCount['hauler'] : 0;
				let pioneers = this.population.typeCount['pioneer'] ? this.population.typeCount['pioneer'] : 0;
				this._collapsed = workers + haulers + pioneers === 0;
			}
			return this._collapsed;
		},
	},
	RCL: {
		get() {
			if (!this.controller) return;
			return Util.get(this.memory, 'RCL', this.controller.level);
		},
	},
	skip: {
		get() {
			return Util.get(this, '_skip', !!Flag.find(FLAG_COLOR.command.skipRoom, this));
		},
	},
	checkRCL: {
		value() {
			if (!this.controller) return;
			if (this.memory.RCL !== this.controller.level) {
				Room.RCLChange.trigger(this);
				this.memory.RCL = this.controller.level;
			}
		},
	},
	countMySites: {
		value() {
			const numSites = _.size(this.myConstructionSites);
			if (!_.isUndefined(this.memory.myTotalSites) && numSites !== this.memory.myTotalSites) {
				Room.costMatrixInvalid.trigger(this);
			}
			if (numSites > 0) this.memory.myTotalSites = numSites;
			else delete this.memory.myTotalSites;
		},
	},

	countMyStructures: {
		value() {
			const numStructures = _.size(this.structures.my);
			if (!_.isUndefined(this.memory.myTotalStructures) && numStructures !== this.memory.myTotalStructures) {
				Room.costMatrixInvalid.trigger(this);
				// these are vital for feeding
				this.saveExtensions();
				this.saveSpawns();
			} else delete this.memory.myTotalStructures;
		},
	},
	findRoute: {
		value(destination, checkOwner = true, preferHighway = true, allowSK = true) {
			if (this.name == destination) return [];
			const options = { checkOwner, preferHighway, allowSK };
			return Game.map.findRoute(this, destination, {
				routeCallback: Room.routeCallback(this.name, destination, options),
			});
		},
	},
	getBorder: {
		value(roomName) {
			return _.findKey(
				Game.map.describeExits(this.name),
				function(name) {
					return this.name === name;
				},
				{ name: roomName },
			);
		},
	},
	recordMove: {
		value(creep) {
			if (
				!ROAD_CONSTRUCTION_ENABLE &&
				(!ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name] ||
					(ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name] &&
						ROAD_CONSTRUCTION_FORCED_ROOMS[Game.shard.name].indexOf(this.name) == -1))
			)
				return;
			let x = creep.pos.x;
			let y = creep.pos.y;
			if (x == 0 || y == 0 || x == 49 || y == 49 || creep.carry.energy == 0 || creep.data.actionName == 'building')
				return;

			let key = `${String.fromCharCode(32 + x)}${String.fromCharCode(32 + y)}_x${x}-y${y}`;
			if (!this.roadConstructionTrace[key]) this.roadConstructionTrace[key] = 1;
			else this.roadConstructionTrace[key]++;
		},
	},
	isWalkable: {
		value(x, y, look) {
			if (!look) look = this.lookAt(x, y);
			else look = look[y][x];
			let invalidObject = o => {
				return (
					(o.type == LOOK_TERRAIN && o.terrain == 'wall') || OBSTACLE_OBJECT_TYPES.includes(o[o.type].structureType)
				);
			};
			return look.filter(invalidObject).length == 0;
		},
	},
	exits: {
		value(findExit, point) {
			if (point === true) point = 0.5;
			let positions;
			if (findExit === 0) {
				// portals
				positions = _.chain(this.find(FIND_STRUCTURES))
					.filter(function(s) {
						return s.structureType === STRUCTURE_PORTAL;
					})
					.map('pos')
					.value();
			} else {
				positions = this.find(findExit);
			}

			// assuming in-order
			let maxX, maxY;
			let map = {};
			let limit = -1;
			const ret = [];
			for (let i = 0; i < positions.length; i++) {
				const pos = positions[i];
				if (!(_.get(map, [pos.x - 1, pos.y]) || _.get(map, [pos.x, pos.y - 1]))) {
					if (point && limit !== -1) {
						ret[limit].x += Math.ceil(point * (maxX - ret[limit].x));
						ret[limit].y += Math.ceil(point * (maxY - ret[limit].y));
					}
					limit++;
					ret[limit] = _.pick(pos, ['x', 'y']);
					maxX = pos.x;
					maxY = pos.y;
					map = {};
				}
				_.set(map, [pos.x, pos.y], true);
				maxX = Math.max(maxX, pos.x);
				maxY = Math.max(maxY, pos.y);
			}
			if (point && limit !== -1) {
				ret[limit].x += Math.ceil(point * (maxX - ret[limit].x));
				ret[limit].y += Math.ceil(point * (maxY - ret[limit].y));
			}
			return ret;
		},
	},
	showCostMatrix: {
		value(matrix = this.structureMatrix, aroundPos) {
			const vis = new RoomVisual(this.name);
			let startY = 0;
			let endY = 50;
			let startX = 0;
			let endX = 50;
			if (aroundPos) {
				startY = Math.max(0, aroundPos.y - 3);
				endY = Math.min(50, aroundPos.y + 4);
				startX = Math.max(0, aroundPos.x - 3);
				endX = Math.min(50, aroundPos.x + 4);
			}
			const maxCost = _.max(matrix._bits);
			const getColourByPercentage = value => {
				const hue = ((1 - value) * 120).toString(10);
				return `hsl(${hue}, 100%, 50%)`;
			};
			for (let y = startY; y < endY; y++) {
				for (let x = startX; x < endX; x++) {
					const cost = matrix.get(x, y);
					if (cost) vis.text(cost, x, y);
					vis.rect(x - 0.5, y - 0.5, 1, 1, { fill: getColourByPercentage(cost / maxCost) });
				}
			}
		},
	},
	getAvoidMatrix: {
		// toAvoid - a list of creeps to avoid sorted by owner
		value(toAvoid) {
			const avoidMatrix = this.structureMatrix.clone();
			for (const owner in toAvoid) {
				const creeps = toAvoid[owner];
				for (const creep of creeps) {
					for (let x = Math.max(0, creep.pos.x - 3); x <= Math.min(49, creep.pos.x + 3); x++) {
						const deltaX = x < creep.pos.x ? creep.pos.x - x : x - creep.pos.x;
						for (let y = Math.max(0, creep.pos.y - 3); y <= Math.min(49, creep.pos.y + 3); y++) {
							if (this.isWalkable(x, y)) {
								const deltaY = y < creep.pos.y ? creep.pos.y - y : y - creep.pos.y;
								const cost = 17 - 2 * Math.max(deltaX, deltaY);
								avoidMatrix.set(x, y, cost); // make it less desirable than a swamp
							}
						}
					}
				}
			}
			return avoidMatrix;
		},
	},
	getCreepMatrix: {
		value(structureMatrix = this.structureMatrix) {
			if (_.isUndefined(this._creepMatrix)) {
				const costs = structureMatrix.clone();
				// Avoid creeps in the room
				this.allCreeps.forEach(function(creep) {
					costs.set(creep.pos.x, creep.pos.y, 0xff);
				});
				this._creepMatrix = costs;
			}
			return this._creepMatrix;
		},
	},
	invalidateCostMatrix: {
		value() {
			Room.costMatrixInvalid.trigger(this.name);
		},
	},
	highwayHasWalls: {
		value() {
			if (!Room.isHighwayRoom(this.name)) return false;
			return !!_.find(this.getPositionAt(25, 25).lookFor(LOOK_STRUCTURES), s => s instanceof StructureWall);
		},
	},
	isTargetAccessible: {
		value(object, target) {
			if (!object || !target) return;
			// Checks. Accept RoomObject, RoomPosition, and mock position
			if (object instanceof RoomObject) object = object.pos;
			if (target instanceof RoomObject) target = target.pos;
			for (const prop of ['x', 'y', 'roomName']) {
				if (!Reflect.has(object, prop) || !Reflect.has(target, prop)) return;
			}

			if (!Room.isHighwayRoom(this.name)) return;
			if (!this.highwayHasWalls()) return true;

			const [x, y] = Room.calcCoordinates(this.name, (x, y) => [x, y]);

			const getVerHalf = o => (Math.floor(o.x / 25) === 0 ? LEFT : RIGHT);

			const getHorHalf = o => (Math.floor(o.y / 25) === 0 ? TOP : BOTTOM);

			const getQuadrant = o => {
				const verHalf = getVerHalf(o);
				const horHalf = getHorHalf(o);
				if (verHalf === LEFT) {
					return horHalf === TOP ? TOP_LEFT : BOTTOM_LEFT;
				} else {
					return horHalf === TOP ? TOP_RIGHT : BOTTOM_RIGHT;
				}
			};

			if (x % 10 === 0) {
				if (y % 10 === 0) {
					// corner room

					const top = !!_.find(this.getPositionAt(25, 24).lookFor(LOOK_STRUCTURES), s => s instanceof StructureWall);
					const left = !!_.find(this.getPositionAt(24, 25).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));
					const bottom = !!_.find(this.getPositionAt(25, 26).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));
					const right = !!_.find(this.getPositionAt(26, 25).lookFor(LOOK_STRUCTURES, s => s instanceof StructureWall));

					// both in same quadrant
					if (getQuadrant(object) === getQuadrant(target)) return true;

					if (top && left && bottom && right) {
						// https://i.imgur.com/8lmqtbi.png
						return getQuadrant(object) === getQuadrant(target);
					}

					if (top) {
						if (bottom) {
							// cross section
							if (left) {
								return Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target));
							} else {
								return Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target));
							}
						}
						if (left && right) {
							// cross section
							if (getHorHalf(object) !== getHorHalf(target)) return false;
							return Util.areEqual(BOTTOM, getHorHalf(object), getHorHalf(target));
						}
						if (Util.areEqual(BOTTOM, getHorHalf(object), getHorHalf(target))) return true;
						if (left) {
							if (Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target))) return true;
							if (getQuadrant(object) === TOP_LEFT && getQuadrant(target) !== TOP_LEFT) return false;
						} else {
							if (Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target))) return true;
							if (getQuadrant(object) === TOP_RIGHT && getQuadrant(target) !== TOP_RIGHT) return false;
						}
					} else {
						if (left && right) {
							// cross section
							if (getHorHalf(object) !== getHorHalf(target)) return false;
							return Util.areEqual(TOP, getHorHalf(object), getHorHalf(target));
						}
						if (Util.areEqual(TOP, getHorHalf(object), getHorHalf(target))) return true;
						if (left) {
							if (Util.areEqual(RIGHT, getVerHalf(object), getVerHalf(target))) return true;
							if (getQuadrant(object) === BOTTOM_LEFT && getQuadrant(target) !== BOTTOM_LEFT) return false;
						} else {
							if (Util.areEqual(LEFT, getVerHalf(object), getVerHalf(target))) return true;
							if (getQuadrant(object) === BOTTOM_RIGHT && getQuadrant(target) !== BOTTOM_RIGHT) return false;
						}
					}
					return true;
				}
				if (getVerHalf(object) === getVerHalf(target)) return true;
			}
			if (y % 10 === 0) {
				if (getHorHalf(object) === getHorHalf(target)) return true;
			}
			return true;
		},
	},
	targetAccessible: {
		value(target) {
			if (!target) return;
			if (target instanceof RoomObject) target = target.pos;
			for (const prop of ['x', 'y', 'roomName']) {
				if (!Reflect.has(target, prop)) return;
			}

			if (!Room.isHighwayRoom(this.name)) return;
			if (!this.highwayHasWalls()) return true;

			const closestRoom = _(Game.rooms)
				.filter('my')
				.min(r => Game.map.getRoomLinearDistance(r.name, this.name));
			if (closestRoom === Infinity) return;

			const [x1, y1] = Room.calcGlobalCoordinates(this.name, (x, y) => [x, y]);
			const [x2, y2] = Room.calcGlobalCoordinates(closestRoom, (x, y) => [x, y]);
			let dir = '';
			if (y1 - y2 < 0) {
				dir += 'south';
			} else if (y1 - y2 > 0) {
				dir += 'north';
			}
			if (x1 - x2 < 0) {
				dir += 'east';
			} else if (x1 - x2 > 0) {
				dir += 'west';
			}
			if (x1 % 10 === 0) {
				if (y1 % 10 === 0) {
					// corner room
					if (dir.includes('south') && dir.includes('east')) {
						return this.isTargetAccessible(this.getPositionAt(49, 49), target);
					}
					if (dir.includes('south') && dir.includes('west')) {
						return this.isTargetAccessible(this.getPositionAt(0, 49), target);
					}
					if (dir.includes('north') && dir.includes('east')) {
						return this.isTargetAccessible(this.getPositionAt(49, 0), target);
					}
					if (dir.includes('north') && dir.includes('west')) {
						return this.isTargetAccessible(this.getPositionAt(0, 0), target);
					}
				}
				if (dir.includes('east')) {
					return this.isTargetAccessible(this.getPositionAt(49, 25), target);
				}
				if (dir.includes('west')) {
					return this.isTargetAccessible(this.getPositionAt(0, 25), target);
				}
			}
			if (y1 % 10 === 0) {
				if (dir.includes('south')) {
					return this.isTargetAccessible(this.getPositionAt(25, 49), target);
				}
				if (dir.includes('north')) {
					return this.isTargetAccessible(this.getPositionAt(25, 0), target);
				}
			}
			return true;
		},
	},
	GCOrders: {
		value() {
			const data = this.memory.resources;
			const myRooms = _.filter(Game.rooms, { my: true });

			if (_.isUndefined(data)) {
				Log.room(this.name, `there is no ${this.name}.memory.resources.`);
				return;
			}

			if (data.orders.length === 0) return;

			Log.room(this.name, `garbage collecting ${this.name} roomOrders`);

			const reactions = data.reactions;
			const reactionInProgress = reactions.orders.length > 0 && reactions.orders[0].amount > 0;

			// garbage collecting room.orders
			if (reactionInProgress) {
				const reactionsOrders = reactions.orders[0];
				const componentA = LAB_REACTIONS[reactionsOrders.type][0];
				const componentB = LAB_REACTIONS[reactionsOrders.type][1];

				data.orders = _.filter(data.orders, order => {
					return (
						order.amount > 0 &&
						(order.type === componentA ||
							order.type === componentB ||
							(!_.isUndefined(COMPOUNDS_TO_ALLOCATE[order.type]) && COMPOUNDS_TO_ALLOCATE[order.type].allocate))
					);
				});
			} else {
				data.orders = _.filter(data.orders, order => {
					return (
						order.amount > 0 &&
						!_.isUndefined(COMPOUNDS_TO_ALLOCATE[order.type]) &&
						COMPOUNDS_TO_ALLOCATE[order.type].allocate
					);
				});
			}

			if (!this.ordersWithOffers()) {
				Log.room(this.name, `not enough or no offers found. Updating room orders in room ${this.name}`);
				if (_.isUndefined(data.boostTiming.getOfferAttempts)) data.boostTiming.getOfferAttempts = 0;
				else data.boostTiming.getOfferAttempts++;

				// GCAllRoomOffers
				Log.room(this.name, `${this.name} running GCAllRoomOffers`);
				for (let room of myRooms) {
					if (!room.memory.resources) continue;
					const offers = room.memory.resources.offers;
					let targetOfferIdx;

					for (let i = 0; i < offers.length; i++) {
						let offer = offers[i];
						let targetRoom = Game.rooms[offer.room];
						if (!(targetRoom && targetRoom.memory && targetRoom.memory.resources && targetRoom.memory.resources.orders))
							continue;
						let order = targetRoom.memory.resources.orders.find(o => {
							return o.id === offer.id && o.type === offer.type;
						});

						if (order) {
							targetOfferIdx = order.offers.findIndex(o => {
								return o.room === room.name;
							});
						}

						if (!order || targetOfferIdx === -1) {
							Log.room(room.name, `Orphaned offer found and deleted in ${room.name}`);
							offers.splice(i, 1);
							i--;
						}
					}
				}
				if (data.boostTiming.getOfferAttempts < 3) {
					this.updateRoomOrders();
					data.boostTiming.ordersPlaced = Game.time;
					data.boostTiming.checkRoomAt = Game.time + 1;
					return true;
				} else {
					data.orders = [];
					data.reactions.orders[0].amount = 0;
					delete data.boostTiming.getOfferAttempts;
					Log.room(this.name, `${this.name} no offers found. Reaction and orders DELETED`);
				}
			} else {
				data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
				return false;
			}
		},
	},
	GCOffers: {
		value() {
			const data = this.memory.resources;
			let terminalOrderPlaced = false;
			let readyOffersFound = 0;

			if (_.isUndefined(data)) {
				Log.room(this.name, `there is no ${this.name}.memory.resources.`);
				return {
					readyOffersFound: readyOffersFound,
					terminalOrderPlaced: terminalOrderPlaced,
				};
			}

			if (data.offers.length === 0)
				return {
					readyOffersFound: readyOffersFound,
					terminalOrderPlaced: terminalOrderPlaced,
				};

			Log.room(this.name, `garbage collecting ${this.name} roomOffers`);

			// garbage collecting room.offers
			data.offers = _.filter(data.offers, offer => {
				const orderRoom = Game.rooms[offer.room];
				const orderRoomOrders = orderRoom.memory.resources.orders;
				const resourcesAll = this.resourcesAll[offer.type];

				for (let i = 0; i < orderRoomOrders.length; i++) {
					let order = orderRoomOrders[i];

					if (offer.id === order.id && !_.isUndefined(resourcesAll) && resourcesAll >= 0) return true;
					else if (offer.id === order.id) {
						orderRoom.memory.resources.orders[i].offers = [];
						return false;
					}
				}
				return false;
			});

			// checking terminal orders
			if (data.offers.length > 0) {
				for (let offer of data.offers) {
					let readyAmount = this.terminal.store[offer.type] || 0;

					Log.room(this.name, `${readyAmount} / ${offer.amount} ${offer.type} are in ${this.name} terminal`);

					if (
						(readyAmount >= offer.amount * 0.5 && readyAmount < offer.amount - MIN_OFFER_AMOUNT) ||
						readyAmount >= offer.amount
					) {
						Log.room(
							offer.room,
							`${Math.min(readyAmount, offer.amount)} ${offer.type} are ready to send from ${this.name}`,
						);
						readyOffersFound++;
					} else {
						// make order in offerRoom terminal

						// TODO for new room. is it needed? first time problem. Someone else has to be to this...
						if (this.memory.resources.terminal.length === 0)
							this.memory.resources.terminal.push({
								id: this.terminal.id,
								orders: [],
							});

						const terminalMemory = this.memory.resources.terminal[0];
						const terminalId = this.memory.resources.terminal[0].id;
						const terminal = this.terminal;

						// garbage collecting offerRoom terminal orders
						if (terminalMemory.orders.length > 0) {
							terminalMemory.orders = _.filter(terminalMemory.orders, order => {
								return (
									(order.orderRemaining > 0 || order.storeAmount > 0) &&
									_.some(data.offers, offer => {
										return (
											offer.type === order.type &&
											offer.amount === order.orderRemaining + (terminal.store[offer.type] || 0)
										);
									})
								);
							});
						}

						// making terminal orders if it does not exist
						for (let offer of data.offers) {
							const ordered = Util.sumCompoundType(terminalMemory.orders, 'orderRemaining');
							const allResources = (ordered[offer.type] || 0) + (terminal.store[offer.type] || 0);
							if (offer.amount > allResources) {
								Log.room(
									this.name,
									`no / not enough terminal order found in ${this.name} for ${offer.amount} ${offer.type}`,
								);
								Log.room(
									this.name,
									`terminal stores: ${terminal.store[offer.type] || 0} ordered: ${ordered[offer.type] || 0}`,
								);
								Log.room(
									this.name,
									`terminal order placed for ${Math.max(offer.amount, MIN_OFFER_AMOUNT)} ${offer.type}`,
								);
								this.placeOrder(terminalId, offer.type, Math.max(offer.amount, MIN_OFFER_AMOUNT));
								terminalOrderPlaced = true;
							} else Log.room(this.name, `${this.name} terminal orders for ${offer.amount} ${offer.type} is OK.`);
						}
					}
				}
			}

			return {
				readyOffersFound: readyOffersFound,
				terminalOrderPlaced: terminalOrderPlaced,
			};
		},
	},
	GCLabs: {
		value() {
			Log.room(this.name, `garbage collecting labOrders in ${this.name}`);

			const data = this.memory.resources;
			const labs = data.lab;
			const reactions = data.reactions;
			const reactionsOrders = reactions.orders[0];

			for (let i = 0; i < labs.length; i++) {
				const lab = labs[i];
				let order;

				if (lab.orders.length > 0) {
					if (data.reactions.orders.length > 0) {
						const componentA = LAB_REACTIONS[reactionsOrders.type][0];
						const componentB = LAB_REACTIONS[reactionsOrders.type][1];

						order = _.filter(lab.orders, liveOrder => {
							if (
								(liveOrder.orderAmount > 0 || liveOrder.orderRemaining > 0 || liveOrder.storeAmount > 0) &&
								(liveOrder.type === componentA ||
									liveOrder.type === componentB ||
									liveOrder.type === 'energy' ||
									lab.reactionState === 'Storage')
							)
								return liveOrder;
						});
					} else {
						order = _.filter(lab.orders, liveOrder => {
							if (liveOrder.type === 'energy' || lab.reactionState === 'Storage') return liveOrder;
						});
					}

					if (lab.orders.length > order.length) {
						this.memory.resources.lab[i].orders = order;
						Log.room(this.name, `lab orders fixed in ${this.name}, ${lab.id}`);
					}
				}
			}
		},
	},
	checkOffers: {
		value() {
			if (Memory.boostTiming.multiOrderingRoomName === this) {
				Log.room(this.name, `${this.name} early roomCheck, multiOrdering in progress`);
				return true;
			}

			const data = this.memory.resources;
			const orders = data.orders;
			let candidates = [];
			let terminalOrderPlaced = false;
			let returnValue;

			for (let order of orders) {
				if (order.offers.length > 0) {
					for (let offer of order.offers) {
						let roomTested = _.some(candidates, room => {
							return room.room === offer.room;
						});

						if (!roomTested) {
							let offerRoom = Game.rooms[offer.room];
							returnValue = offerRoom.GCOffers();

							if (returnValue.terminalOrderPlaced) terminalOrderPlaced = true;

							if (returnValue.readyOffersFound > 0) {
								candidates.push({
									room: offer.room,
									readyOffers: returnValue.readyOffersFound,
								});
							}
						}
					}
				}
			}

			if (candidates.length === 1 && candidates[0].readyOffers === 1 && _.isUndefined(data.boostTiming.ordersReady)) {
				let currentRoom = Game.rooms[candidates[0].room];
				Log.room(
					this.name,
					`${candidates[0].room} there is only one offersReady for ${this.name}, running fillARoomOrder()`,
				);
				let fillARoomOrdersReturn = false;
				if (currentRoom.terminal.cooldown === 0) {
					fillARoomOrdersReturn = currentRoom.fillARoomOrder();
					if ((fillARoomOrdersReturn === true && data.orders.length === 0) || _.sum(data.orders, 'amount') === 0) {
						data.boostTiming.checkRoomAt = Game.time + 1;
						Log.room(
							currentRoom.name,
							`${currentRoom.name} terminal send was successful. And there are no more orders`,
						);
						Log.room(this.name, `${this.name} time: ${Game.time} boostTiming:`);
						Log.stringify(data.boostTiming);

						return true;
					} else if (fillARoomOrdersReturn === true) {
						data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
						Log.room(
							currentRoom.name,
							`${currentRoom.name} terminal send was successful. BTW, there are orders remained to fulfill`,
						);
						Log.room(this.name, `${this.name} time: ${Game.time}, boostTiming:`);
						Log.stringify(data.boostTiming);

						return true;
					}
				} else {
					data.boostTiming.checkRoomAt = Game.time + currentRoom.terminal.cooldown + 1;
					Log.room(currentRoom.name, `${currentRoom.name} terminal cooldown is: ${currentRoom.terminal.cooldown}`);
					Log.room(this.name, `${this.name} time: ${Game.time}, boosTiming:`);
					Log.stringify(data.boostTiming);

					return false;
				}
			} else if (
				(candidates.length >= 1 || (candidates.length === 1 && candidates[0].readyOffers > 1)) &&
				_.isUndefined(data.boostTiming.ordersReady)
			) {
				Log.room(this.name, `${this.name} has more than one offers ready, boostTiming.ordersReady created`);
				Log.stringify(candidates);
				data.boostTiming.ordersReady = {
					time: Game.time,
					orderCandidates: candidates,
				};
				if (!Memory.boostTiming) Memory.boostTiming = {};
				Memory.boostTiming.multiOrderingRoomName = this.name;
				data.boostTiming.checkRoomAt = Game.time + _.sum(candidates, 'readyOffers') + 1;
				return true;
			} else if (returnValue.terminalOrderPlaced) {
				Log.room(this.name, `terminal orders placed for room ${this.name}`);
				data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
				return false;
			} else {
				Log.room(this.name, `${this.name} no readyOffers found`);
				data.boostTiming.checkRoomAt = Game.time + CHECK_ORDERS_INTERVAL;
				return false;
			}
		},
	},
	ordersWithOffers: {
		value() {
			const orders = this.memory.resources.orders;
			if (orders.length === 0) return false;
			return _.some(orders, order => {
				let orderOffersAmount = _.sum(order.offers, 'amount') || 0;
				return orderOffersAmount >= order.amount && order.amount > 0;
			});
		},
	},
	makeReaction: {
		value() {
			let roomFound = {};
			let amountToMake;
			const makeCompound = (roomName, compound, amount) => {
				let currentRoom = Game.rooms[roomName];
				if (currentRoom.memory.labs) {
					if (currentRoom.memory.labs.length < 3) return false;
					else if (currentRoom.memory.labs.length === 3 && !MAKE_REACTIONS_WITH_3LABS) return false;
				} else return false;
				if (_.isUndefined(currentRoom.memory.resources)) return false;
				if (_.isUndefined(currentRoom.memory.resources.reactions)) return false;
				const data = currentRoom.memory.resources.reactions;
				const whatNeeds = (compound, amount) => {
					if (compound.length === 1 && compound !== 'G') return;

					const sumStorage = mineral => {
						const myRooms = _.filter(Game.rooms, { my: true });
						let roomStored = 0;

						for (let room of myRooms) {
							let resourcesAll = room.resourcesAll[mineral] || 0;
							if (resourcesAll >= MIN_OFFER_AMOUNT) roomStored += resourcesAll;
						}

						return roomStored;
					};
					const ingredientNeeds = (compound, amount) => {
						// this amount has to be produced in this room
						const storedAll = sumStorage(compound);
						const storedRoom = currentRoom.resourcesAll[compound] || 0;
						const storedOffRoom = storedAll - storedRoom;
						let ingredientNeeds;

						if (storedOffRoom < TRADE_THRESHOLD) {
							ingredientNeeds = amount - storedRoom;
							if (ingredientNeeds < 0) ingredientNeeds = 0;
							else if (ingredientNeeds < MIN_COMPOUND_AMOUNT_TO_MAKE) ingredientNeeds = MIN_COMPOUND_AMOUNT_TO_MAKE;
						} else {
							ingredientNeeds = amount - storedAll;
							if (ingredientNeeds < 0) ingredientNeeds = 0;
							else if (ingredientNeeds < MIN_COMPOUND_AMOUNT_TO_MAKE) ingredientNeeds = MIN_COMPOUND_AMOUNT_TO_MAKE;
						}

						return Util.roundUpTo(ingredientNeeds, MIN_OFFER_AMOUNT);
					};
					const findIngredients = (compound, amount) => {
						const ingredientA = LAB_REACTIONS[compound][0];
						const ingredientB = LAB_REACTIONS[compound][1];

						return {
							[ingredientA]: ingredientNeeds(ingredientA, amount),
							[ingredientB]: ingredientNeeds(ingredientB, amount),
						};
					};
					const slicer = (compound, amount) => {
						let product = {};
						let returnValue = {};
						const slice = stuff => {
							if (Object.keys(stuff).length === 0) return false;
							else return stuff;
						};

						product[compound] = findIngredients(compound, amount);

						Object.keys(product).forEach(ingredients => {
							Object.keys(product[ingredients]).forEach(ingredient => {
								if (ingredient.length > 1 || ingredient === 'G')
									returnValue[ingredient] = product[ingredients][ingredient];
							});
						});

						return {
							product: product,
							slice: slice(returnValue),
						};
					};
					let returnObject = slicer(compound, amount);
					let product = returnObject.product;
					let slices = returnObject.slice;

					do {
						let returnArray = [];

						Object.keys(slices).forEach(slice => {
							returnObject = slicer(slice, slices[slice]);
							product[slice] = returnObject.product[slice];
							returnArray.push(returnObject.slice);
						});
						slices = {};
						for (let slice of returnArray) slices = Object.assign(slices, slice);
					} while (_.some(slices, Object));

					return product;
				};
				const purchaseMinerals = (roomName, mineral, amount) => {
					if (!PURCHASE_MINERALS) {
						Log.error(`${roomName} needs to buy ${amount} ${mineral} but PURCHASE_MINERALS is false`);
						return false;
					}

					if (currentRoom.storage.charge < STORE_CHARGE_PURCHASE) {
						Log.warn(
							`storage.charge in ${roomName} is ${currentRoom.storage.charge}, purchase for ${mineral} is delayed`,
						);
						return false;
					}

					if (currentRoom.terminal.cooldown > 0) {
						Log.warn(
							`terminal.coolDown in ${roomName} is ${
								currentRoom.terminal.cooldown
							}, purchase for ${mineral} is delayed`,
						);
						return false;
					}

					if (data.reactorMode !== 'idle') {
						return false;
					}

					Log.success(`buying ${amount} ${mineral} in ${roomName}`);

					let sellRatio;

					if (AUTOMATED_RATIO_COUNT) {
						sellRatio = Util.countPrices('sell', mineral, roomName);
						Log.info(`average sellRatio: ${roomName} ${mineral} ${sellRatio}`);
					} else sellRatio = MAX_BUY_RATIO[mineral];

					let order;
					let returnValue;
					const resOrders = Game.market.getAllOrders(o => {
						const currentRoom = Game.rooms[roomName];
						let transactionCost;
						let credits;

						if (o.type !== 'sell') return false;
						if (o.resourceType !== mineral) return false;

						o.transactionAmount = Math.min(o.amount, amount);

						transactionCost = Game.market.calcTransactionCost(o.transactionAmount, o.roomName, roomName);

						if (transactionCost > currentRoom.terminal.store[RESOURCE_ENERGY]) return false;

						credits = o.transactionAmount * o.price;

						if (Game.market.credits < credits) {
							o.transactionAmount = Game.market.credits / o.price;
							if (o.transactionAmount === 0) return false;
						}
						o.ratio = (credits - transactionCost * ENERGY_VALUE_CREDITS) / o.transactionAmount;

						if (o.ratio > sellRatio || o.amount < 100) return false;

						return true;
					});

					if (resOrders.length > 0) {
						order = _.min(resOrders, 'ratio');
						Log.info('selected order: ');
						Log.table(order);

						if (order) {
							Log.info(`Game.market.deal("${order.id}", ${order.transactionAmount}, "${roomName}");`);
						}
						returnValue = Game.market.deal(order.id, order.transactionAmount, roomName);
						if (returnValue === OK) {
							Log.success(
								`Purchased ${order.transactionAmount} ${mineral} at price: ${
									order.price
								} it costs: ${order.transactionAmount * order.price}`,
							);
							return true;
						} else {
							Log.error(`purchase was FAILED error code: ${Util.translateErrorCode(returnValue)}`);
							Log.error(returnValue);
							return false;
						}
					} else {
						if (sellRatio === 0) Log.warn(`There are no sellOrders for ${mineral}`);
						else {
							Log.warn(
								`No sell order found for ${amount} ${mineral} at ratio ${MAX_BUY_RATIO[mineral]} in room ${roomName}`,
							);
							Log.warn(
								`You need to adjust MAX_BUY_RATIO or use AUTOMATED_RATIO_COUNT: true in parameters, current is: ${
									MAX_BUY_RATIO[mineral]
								}, recommended: ${sellRatio}`,
							);
						}

						return false;
					}
				};
				const makeIngredient = (roomName, ingredient, amount) => {
					if (_.isUndefined(data)) {
						Log.warn(`labs in room ${roomName} are not registered as flower`);
						return false;
					} else if (data.reactorType !== 'flower') {
						Log.warn(`labs in room ${roomName} are not registered as flower`);
						return false;
					}

					const currentRoom = Game.rooms[roomName];
					let returnValue = false;

					if (data.reactorMode === 'idle') {
						Log.room(roomName, `${currentRoom.name} - placeReactionOrder(${ingredient}, ${ingredient}, ${amount})`);

						// garbage collecting labs
						currentRoom.GCLabs();

						// place the reaction order
						currentRoom.placeReactionOrder(ingredient, ingredient, amount);
						Memory.boostTiming.roomTrading.boostProduction = true;
						Memory.boostTiming.timeStamp = Game.time;
						Log.room(currentRoom, `${currentRoom.name}, placeReaction ${amount} ${ingredient} at time: ${Game.time}`);
						let boostTiming = currentRoom.memory.resources.boostTiming;
						boostTiming.roomState = 'reactionPlaced';
						returnValue = true;
					}

					return returnValue;
				};
				const product = whatNeeds(compound, amount);
				let mineralPurchased = false;
				let ingredientMade = false;
				let compoundArray = [];
				let currentCompound;

				if (!currentRoom.storage || !currentRoom.terminal) {
					Log.warn(`there are no storage/terminal in ${currentRoom.name}`);
					return false;
				}

				if (_.isUndefined(currentRoom.memory.labs) || currentRoom.memory.labs.length === 0) {
					Log.warn(`there are no labs in ${currentRoom.name}`);
					return false;
				}

				if (
					currentRoom.terminal.isActive() === false ||
					currentRoom.storage.isActive() === false ||
					Game.getObjectById(currentRoom.memory.labs[0].id).isActive() === false
				)
					return false;

				Object.keys(product).forEach(ingredients => {
					Object.keys(product[ingredients]).forEach(ingredient => {
						let ingredientAmount = product[ingredients][ingredient];

						if (ingredientAmount > 0 && !mineralPurchased) {
							// purchase minerals if it can not be ordered
							if (
								ingredient.length === 1 &&
								ingredient !== 'G' &&
								(currentRoom.resourcesAll[ingredient] || 0) < ingredientAmount &&
								!mineralPurchased
							) {
								mineralPurchased = purchaseMinerals(roomName, ingredient, ingredientAmount);
								if (!mineralPurchased)
									return {
										ingredientMade: ingredientMade,
										mineralPurchased: mineralPurchased,
									};
							}
							// if ingredient can make, collect the compounds
							if (!mineralPurchased) {
								if (ingredient.length > 1 || ingredient === 'G')
									compoundArray.push({
										compound: ingredient,
										amount: ingredientAmount,
									});
							}
						}
					});
				});
				// define tier 3 compound
				if (compoundArray.length === 0)
					compoundArray.push({
						compound: compound,
						amount: amount,
					});
				// make the compound
				if (!mineralPurchased) {
					currentCompound = compoundArray[compoundArray.length - 1];
					ingredientMade = makeIngredient(roomName, currentCompound.compound, currentCompound.amount);
				}
				return {
					ingredientMade: ingredientMade,
					mineralPurchased: mineralPurchased,
				};
			};

			Object.keys(COMPOUNDS_TO_MAKE).forEach(compound => {
				if (
					COMPOUNDS_TO_MAKE[compound].make &&
					!roomFound.ingredientMade &&
					(this.name.indexOf(COMPOUNDS_TO_MAKE[compound].rooms) > -1 || COMPOUNDS_TO_MAKE[compound].rooms.length === 0)
				) {
					let storedResources = this.resourcesAll[compound] || 0;

					if (storedResources === 0) {
						amountToMake = Util.roundUpTo(
							COMPOUNDS_TO_MAKE[compound].amount + COMPOUNDS_TO_MAKE[compound].threshold,
							MIN_OFFER_AMOUNT,
						);
						roomFound = makeCompound(this.name, compound, amountToMake);
						if (roomFound.ingredientMade)
							Log.room(
								this.name,
								`there is no ${compound}, so start to make the compounds for ${
									COMPOUNDS_TO_MAKE[compound].amount
								} ${compound} in ${this.name}`,
							);
					} else if (storedResources <= COMPOUNDS_TO_MAKE[compound].threshold) {
						amountToMake = Util.roundUpTo(
							COMPOUNDS_TO_MAKE[compound].amount + COMPOUNDS_TO_MAKE[compound].threshold - storedResources,
							MIN_OFFER_AMOUNT,
						);
						roomFound = makeCompound(this.name, compound, amountToMake);
						if (roomFound.ingredientMade)
							Log.room(
								this.name,
								`it is below the threshold, so start to make the compounds for ${amountToMake} ${compound} in ${
									this.name
								}`,
							);
					}
				}
			});

			return roomFound.ingredientMade || roomFound.mineralPurchased;
		},
	},
	storedMinerals: {
		value(mineral) {
			let returnValue =
				(this.resourcesStorage[mineral] || 0) +
				(this.resourcesTerminal[mineral] || 0) -
				(this.resourcesOffers[mineral] || 0) -
				(this.resourcesReactions[mineral] || 0);
			if (returnValue < 0) returnValue = 0;
			return returnValue;
		},
	},
	countCheckRoomAt: {
		value() {
			const data = this.memory.resources;
			const boostTiming = data.boostTiming;
			const numberOfLabs = data.lab.length;
			const reactionCoolDown = REACTION_TIME[data.reactions.orders[0].type];
			const producedAmountPerTick = LAB_REACTION_AMOUNT;
			const storageLabs = _.filter(data.lab, lab => {
				return lab.reactionState === 'Storage';
			});
			const numberOfSlaveLabs = numberOfLabs - storageLabs.length - 2;
			const allLabsProducedAmountPerTick = producedAmountPerTick * numberOfSlaveLabs / reactionCoolDown;
			const amount = data.reactions.orders[0].amount;

			boostTiming.checkRoomAt =
				boostTiming.reactionMaking +
				Util.roundUpTo(amount / allLabsProducedAmountPerTick, reactionCoolDown) +
				reactionCoolDown;
		},
	},
	getSeedLabOrders: {
		value() {
			let data = this.memory.resources;
			if (_.isUndefined(data) || _.isUndefined(data.reactions) || data.reactions.orders.length === 0) return;
			const orderType = data.reactions.orders[0].type;
			const component_a = LAB_REACTIONS[orderType][0];
			const component_b = LAB_REACTIONS[orderType][1];
			const labIndexA = data.lab.findIndex(l => {
				return l.id === data.reactions.seed_a;
			});
			const labIndexB = data.lab.findIndex(l => {
				return l.id === data.reactions.seed_b;
			});
			const labOrderA = _.filter(data.lab[labIndexA].orders, order => {
				return order.type === component_a;
			});
			const labOrderB = _.filter(data.lab[labIndexB].orders, order => {
				return order.type === component_b;
			});
			const labOrderAmountA = labOrderA[0].orderRemaining;
			const labOrderAmountB = labOrderB[0].orderRemaining;

			return {
				labOrderAmountA: labOrderAmountA,
				labOrderAmountB: labOrderAmountB,
			};
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
