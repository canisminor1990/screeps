import { RoomStructures } from './RoomStructures';

Room.prototype._find = Room.prototype.find;

class RoomExtend extends Room {
	constructor() {}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function): any {
		if (_.isUndefined(this[`_${key}`])) {
			this[`_${key}`] = func();
		}
		return this[`_${key}`];
	}

	private memoryCache(key: string, func: Function): any {
		if (_.isUndefined(this.memory[key])) {
			this.memory[key] = func();
		}
		return this.memory[key];
	}

	/// ///////////////////////////////////////////////////////////////////
	// shorthand
	/// ///////////////////////////////////////////////////////////////////

	get my(): boolean {
		return this.cache('my', () => this.controller && this.controller.my);
	}

	get ally(): boolean {
		return this.cache('ally', () => {
			let ally = false;
			if (this.reserved) {
				ally = true;
			} else if (this.controller) {
				ally = TaskManager.reputation.isAlly(this.owner) || TaskManager.reputation.isAlly(this.reservation);
			}
			return ally;
		});
	}

	get RCL(): number | undefined {
		if (_.isUndefined(this.controller)) return;
		return this.memoryCache('RCL', () => this.controller.level);
	}

	checkRCL(): void {
		if (!this.controller) return;
		if (this.memory.RCL !== this.controller.level) {
			RoomManager.RCLChange.trigger(this);
			this.memory.RCL = this.controller.level;
		}
	}

	get skip(): boolean {
		return this.cache('skip', () => !!FlagManager.find(FLAG_COLOR.command.skipRoom, this));
	}

	get reservation(): string | boolean {
		return this.cache('reservation', () => {
			let reservation = false;
			if (this.controller && this.controller.reservation) {
				reservation = this.controller.reservation.username;
			}
			return reservation;
		});
	}

	get myReservation(): boolean {
		return this.cache('myReservation', () => this.reservation === ME);
	}

	get reserved(): boolean {
		return this.cache('reserved', () => {
			let reserved = false;
			if (this.controller) {
				const myName = _.find(Game.spawns).owner.username;
				reserved =
					this.controller.my || (this.controller.reservation && this.controller.reservation.username === myName);
			}
			return reserved;
		});
	}

	get owner(): string | boolean {
		return this.cache('owner', () => {
			if (this.controller && this.controller.owner) {
				return this.controller.owner.username;
			} else {
				return false;
			}
		});
	}

	get print() {
		return Util.makeRoomUrl(this.name);
	}

	get creeps(): Creep[] {
		return this.cache('creeps', () => this.find(FIND_MY_CREEPS));
	}

	get allCreeps(): Creep[] {
		return this.cache('allCreeps', () => this.find(FIND_CREEPS));
	}

	/*
	* 获取不动的creeps
	* */
	get immobileCreeps(): Creep[] {
		return this.cache('allCreeps', () => {
			return _.filter(this.creeps, (c: Creep) => {
				const s = c.data && c.data.determinatedSpot;
				return s && c.pos.isEqualTo(c.room.getPositionAt(s.x, s.y));
			});
		});
	}

	countMySites(): void {
		const numSites = _.size(this.myConstructionSites);
		if (!_.isUndefined(this.memory.myTotalSites) && numSites !== this.memory.myTotalSites) {
			RoomManager.costMatrixInvalid.trigger(this);
		}
		if (numSites > 0) this.memory.myTotalSites = numSites;
		else delete this.memory.myTotalSites;
	}

	countMyStructures(): void {
		const numStructures = _.size(this.structures.my);
		if (!_.isUndefined(this.memory.myTotalStructures) && numStructures !== this.memory.myTotalStructures) {
			RoomManager.costMatrixInvalid.trigger(this);
			// these are vital for feeding
			this.saveExtensions();
			this.saveSpawns();
		} else delete this.memory.myTotalStructures;
	}

	get flags(): Flag[] {
		return this.cache('flags', () => _.filter(FlagManager.list, { roomName: this.name }));
	}

	newFlag(flagColour: obj, pos: RoomPosition, name: string): string | number | void {
		if (!pos) pos = this.getPositionAt(25, 25);
		return pos.newFlag(flagColour, name);
	}

	get structures(): obj {
		return this.cache('structures', () => new RoomStructures(this));
	}

	get combatCreeps(): Creep[] {
		return this.cache('combatCreeps', () => {
			return this.creeps.filter((c: Creep) => ['melee', 'ranger', 'healer', 'warrior'].includes(c.data.creepType));
		});
	}

	/*
	* 获取受伤且无炮台治疗的Creep
	* */
	get hurtCreeps(): Creep[] {
		return this.cache('hurtCreeps', () => {
			const isInjured = (c: Creep) => c.hits < c.hitsMax && (c.towers === undefined || c.towers.length === 0);
			return _.sortBy(_.filter(this.creeps, isInjured), 'hits');
		});
	}

	/*
	* 是否是敌人的房间
	* */
	get hostile(): boolean | number | undefined {
		return this.memory.hostile;
	}

	registerIsHostile(): void {
		if (!this.controller) return;
		if (_.isUndefined(this.hostile) || _.isNumber(this.hostile)) {
			// not overridden by user
			if (this.controller.owner && !this.controller.my && !this.ally) {
				this.memory.hostile = this.controller.level;
			} else {
				delete this.memory.hostile;
			}
		}
	}

	get hostiles(): Creep[] {
		return this.cache('hostiles', () => {
			return this.find(FIND_HOSTILE_CREEPS, { filter: TaskManager.reputation.hostileOwner });
		});
	}

	get hostileIds(): string[] {
		return this.cache('hostileIds', () => Util.getGame.objsToIdArray(this.hostiles));
	}

	get hostileThreatLevel(): number {
		return this.cache('hostileThreatLevel', () => {
			// TODO: add towers when in foreign room
			let hostileThreatLevel = 0;
			const evaluateBody = (creep: Creep) => {
				hostileThreatLevel += creep.threat;
			};
			this.hostiles.forEach(evaluateBody);
			return hostileThreatLevel;
		});
	}

	/*
	* 登记和删除Invaders
	* */
	processInvaders(): void {
		if (_.isUndefined(this.memory.hostileIds)) this.memory.hostileIds = [];
		if (!SEND_STATISTIC_REPORTS) delete this.memory.statistics;
		else if (_.isUndefined(this.memory.statistics)) this.memory.statistics = {};

		const registerHostile = (creep: Creep) => {
			if (RoomManager.isCenterNineRoom(this.name)) return;
			// if invader id unregistered
			if (!this.memory.hostileIds.includes(creep.id)) {
				// handle new invader
				// register
				this.memory.hostileIds.push(creep.id);
				// save to trigger subscribers later
				this.newInvader.push(creep);
				// create statistics
				if (SEND_STATISTIC_REPORTS) {
					const bodyCount = JSON.stringify(_.countBy(creep.body, 'type'));
					if (_.isUndefined(this.memory.statistics.invaders)) this.memory.statistics.invaders = [];
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

		const registerHostileLeave = (id: string) => {
			const creep: Creep = Game.getObjectById(id);
			const stillHostile = creep && TaskManager.reputation.hostileOwner(creep);
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
					const select = (invader: obj) => invader.id === id && _.isUndefined(invader.leave);
					const entry = _.find(this.memory.statistics.invaders, select);
					if (!_.isUndefined(entry)) entry.leave = Game.time;
				}
			}
		};
		_.forEach(this.memory.hostileIds, registerHostileLeave);
		this.memory.hostileIds = this.hostileIds;
	}

	/*
	* 没有充足energy防御
	* */
	get lowDefenseEnergy(): boolean {
		return this.my && this.storage && this.storage.charge < 0;
	}

	get defenseLevel(): RoomDefenseLevel {
		return this.cache('defenseLevel', () => {
			let defenseLevel = {
				towers: 0,
				creeps: 0,
				sum: 0,
			};
			const evaluate = (creep: Creep) => (defenseLevel.creeps += creep.threat);
			this.combatCreeps.forEach(evaluate);
			defenseLevel.towers = this.structures.towers.length;
			defenseLevel.sum = defenseLevel.creeps + defenseLevel.towers * CREEP_PART_THREAT.tower;
			return defenseLevel;
		});
	}

	get isCriticallyFortifyable(): boolean {
		return _.some(this.structures.fortifyable, 'isCriticallyFortifyable');
	}

	get relativeEnergyAvailable(): boolean {
		return this.energyCapacityAvailable > 0 ? this.energyAvailable / this.energyCapacityAvailable : 0;
	}

	get relativeRemainingEnergyAvailable(): boolean {
		return this.energyCapacityAvailable > 0 ? this.remainingEnergyAvailable / this.energyCapacityAvailable : 0;
	}

	get remainingEnergyAvailable(): number {
		return this.energyAvailable - this.reservedSpawnEnergy;
	}

	_reservedSpawnEnergy: number;
	get reservedSpawnEnergy(): number {
		if (_.isUndefined(this._reservedSpawnEnergy)) this._reservedSpawnEnergy = 0;
		return this._reservedSpawnEnergy;
	}

	set reservedSpawnEnergy(value: number): void {
		this._reservedSpawnEnergy = value;
	}

	get situation(): RoomSituation {
		return this.cache('situation', () => {
			return {
				noEnergy: this.sourceEnergyAvailable == 0,
				invasion: this.hostiles.length > 0 && (!this.controller || !this.controller.safeMode),
			};
		});
	}

	get collapsed(): boolean {
		return this.cache('collapsed', () => {
			if (!this.my) return false;
			// no creeps ? collapsed!
			if (!this.population) return true;
			// is collapsed if workers + haulers + pioneers in room = 0
			let workers = this.population.typeCount['worker'] ? this.population.typeCount['worker'] : 0;
			let haulers = this.population.typeCount['hauler'] ? this.population.typeCount['hauler'] : 0;
			let pioneers = this.population.typeCount['pioneer'] ? this.population.typeCount['pioneer'] : 0;
			return workers + haulers + pioneers === 0;
		});
	}

	/// ///////////////////////////////////////////////////////////////////
	// route
	/// ///////////////////////////////////////////////////////////////////

	/*
	* 相邻的房间
	* */
	get adjacentRooms(): string[] {
		return this.memoryCache('adjacentRooms', () => RoomManager.adjacentRooms(this.name));
	}

	/*
	* 相邻有出口的房间
	* */
	get adjacentAccessibleRooms(): string[] {
		return this.memoryCache('adjacentAccessibleRooms', () => RoomManager.adjacentAccessibleRooms(this.name));
	}

	_find: Function;

	find(type: string | string[], opt?: obj): any[] {
		if (_.isArray(type)) {
			return _(type)
				.map(type => this._find(type, opt))
				.flatten()
				.value();
		} else return this._find(type, opt);
	}

	get privateerMaxWeight(): number {
		return this.cache('privateerMaxWeight', () => {
			let privateerMaxWeight: number = 0;
			if (!this.situation.invasion && !this.lowDefenseEnergy) {
				const base: number = this.controller.level * 1000;
				const flagEntries: FlagMemory[] = FlagManager.filter(FLAG_COLOR.invade.exploit);
				let adjacent: string[];
				let ownNeighbor: number;
				let room: Room;
				let mult: number;
				const countOwn = (roomName: string) => {
					if (roomName == this.name) return;
					if (RoomManager.isMine(roomName)) ownNeighbor++;
				};
				const calcWeight = (flagEntry: FlagMemory) => {
					if (!this.adjacentAccessibleRooms.includes(flagEntry.roomName)) return;
					room = Game.rooms[flagEntry.roomName];
					if (room) {
						adjacent = room.adjacentAccessibleRooms;
						mult = room.sources.length;
					} else {
						adjacent = RoomManager.adjacentAccessibleRooms(flagEntry.roomName);
						mult = 1;
					}
					ownNeighbor = 1;
					adjacent.forEach(countOwn);
					privateerMaxWeight += mult * base / ownNeighbor;
				};
				flagEntries.forEach(calcWeight);
			}
			return privateerMaxWeight;
		});
	}

	get claimerMaxWeight(): number {
		return this.cache('claimerMaxWeight', () => {
			const base: number = 1250;
			const flagEntries: FlagMemory[] = FlagManager.filter([
				FLAG_COLOR.claim,
				FLAG_COLOR.claim.reserve,
				FLAG_COLOR.invade.exploit,
			]);
			let claimerMaxWeight: number = 0;
			let maxRange: number = 2;
			let distance: number;
			let reserved: number;
			let flag: Flag;

			const calcWeight = (flagEntry: FlagMemory) => {
				// don't spawn claimer for reservation at RCL < 4 (claimer not big enough)
				if (
					this.RCL > 3 ||
					(flagEntry.color == FLAG_COLOR.claim.color && flagEntry.secondaryColor == FLAG_COLOR.claim.secondaryColor)
				) {
					distance = RoomManager.roomDistance(this.name, flagEntry.roomName);
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
					claimerMaxWeight += base - reserved;
				}
			};
			flagEntries.forEach(calcWeight);
			return claimerMaxWeight;
		});
	}

	findRoute(
		dest: string,
		checkOwner: boolean = true,
		preferHighway: boolean = true,
		allowSK: boolean = true,
	): RoomRoute[] {
		if (this.name == dest) return [];
		const options = { checkOwner, preferHighway, allowSK };
		return Game.map.findRoute(this, dest, {
			routeCallback: RoomManager.routeCallback(this.name, dest, options),
		});
	}

	getBorder(roomName: string): number {
		return _.findKey(
			Game.map.describeExits(this.name),
			function(name) {
				return this.name === name;
			},
			{ name: roomName },
		);
	}

	exits(findExit: number, point: boolean | number): Pos[] {
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
		let maxX: number;
		let maxY: number;
		let limit: number = -1;
		let map: obj = {};
		const ret: Pos[] = [];
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
	}

	isWalkable(x: number, y: number, look?: LookAtResult): boolean {
		if (!look) look = this.lookAt(x, y);
		else look = look[y][x];
		const invalidObject = (o: obj) =>
			(o.type == LOOK_TERRAIN && o.terrain == 'wall') || OBSTACLE_OBJECT_TYPES.includes(o[o.type].structureType);
		return look.filter(invalidObject).length === 0;
	}

	get highwayHasWalls(): boolean {
		return this.cache('highwayHasWalls', () => {
			if (!RoomManager.isHighwayRoom(this.name)) return false;
			return !!_.find(this.getPositionAt(25, 25).lookFor(LOOK_STRUCTURES), s => s instanceof StructureWall);
		});
	}

	roadConstructionTrace: { [type: string]: number };

	recordMove(creep: Creep): void {
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
	}

	isTargetAccessible(object: RoomObject | RoomPosition, target: RoomObject | RoomPosition): boolean {
		if (!object || !target) return false;
		// Checks. Accept RoomObject, RoomPosition, and mock position
		if (object instanceof RoomObject) object = object.pos;
		if (target instanceof RoomObject) target = target.pos;
		for (const prop of ['x', 'y', 'roomName']) {
			if (!Reflect.has(object, prop) || !Reflect.has(target, prop)) return false;
		}

		if (!RoomManager.isHighwayRoom(this.name)) return false;
		if (!this.highwayHasWalls) return true;

		const [x, y] = RoomManager.calcCoordinates(this.name, (x, y) => [x, y]);

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
	}

	targetAccessible(target: RoomObject | RoomPosition): boolean {
		if (!target) return false;
		if (target instanceof RoomObject) target = target.pos;
		for (const prop of ['x', 'y', 'roomName']) {
			if (!Reflect.has(target, prop)) return false;
		}

		if (!RoomManager.isHighwayRoom(this.name)) return false;
		if (!this.highwayHasWalls) return true;

		const closestRoom = _(Game.rooms)
			.filter('my')
			.min(r => Game.map.getRoomLinearDistance(r.name, this.name));
		if (closestRoom === Infinity) return false;

		const [x1, y1] = RoomManager.calcGlobalCoordinates(this.name, (x, y) => [x, y]);
		const [x2, y2] = RoomManager.calcGlobalCoordinates(closestRoom, (x, y) => [x, y]);
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
	}

	/// ///////////////////////////////////////////////////////////////////
	// matrix
	/// ///////////////////////////////////////////////////////////////////

	get structureMatrix(): CostMatrix {
		return this.cache('structureMatrix', () => {
			let structureMatrix: CostMatrix;
			const cachedMatrix = RoomManager.getCachedStructureMatrix(this.name);
			if (cachedMatrix) {
				structureMatrix = cachedMatrix;
			} else {
				Log.room(this.name, 'Matrix: Calculating cost matrix');
				const costMatrix = new PathFinder.CostMatrix();
				const setCosts = (structure: Structure) => {
					const site = structure instanceof ConstructionSite;
					// don't walk on allied construction sites.
					if (site && !structure.my && TaskManager.reputation.allyOwner(structure))
						return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
					if (structure.structureType === STRUCTURE_ROAD) {
						if (!site || USE_UNBUILT_ROADS) return costMatrix.set(structure.pos.x, structure.pos.y, 1);
					} else if (structure.structureType === STRUCTURE_PORTAL) {
						return costMatrix.set(structure.pos.x, structure.pos.y, 0xff); // only take final step onto portals
					} else if (OBSTACLE_OBJECT_TYPES.includes(structure.structureType)) {
						if (!site || TaskManager.reputation.allyOwner(structure))
							// don't set for hostile construction sites
							return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
					} else if (structure.structureType === STRUCTURE_RAMPART && !structure.my && !structure.isPublic) {
						if (!site || TaskManager.reputation.allyOwner(structure))
							// don't set for hostile construction sites
							return costMatrix.set(structure.pos.x, structure.pos.y, 0xff);
					}
				};
				const setCreepCosts = (c: Creep) => costMatrix.set(c.pos.x, c.pos.y, 0xff);
				this.structures.all.forEach(setCosts);
				this.constructionSites.forEach(setCosts);
				this.immobileCreeps.forEach(setCreepCosts);
				const prevTime = _.get(RoomManager.pathfinderCache, [this.name, 'updated']);
				RoomManager.pathfinderCache[this.name] = {
					costMatrix: costMatrix,
					updated: Game.time,
					version: RoomManager.COSTMATRIX_CACHE_VERSION,
				};
				RoomManager.pathfinderCacheDirty = true;
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
				structureMatrix = costMatrix;
			}
			return structureMatrix;
		});
	}

	getCreepMatrix(structureMatrix: CostMatrix = this.structureMatrix): CostMatrix {
		return this.cache('creepMatrix', () => {
			const costs = structureMatrix.clone();
			// Avoid creeps in the room
			this.allCreeps.forEach(function(creep) {
				costs.set(creep.pos.x, creep.pos.y, 0xff);
			});
			return costs;
		});
	}

	invalidateCostMatrix(): void {
		RoomManager.costMatrixInvalid.trigger(this.name);
	}

	/*
	* 躲开Source Keeper
	* */
	get avoidSKMatrix(): CostMatrix {
		return this.cache('avoidSKMatrix', () => {
			const SKCreeps = this.hostiles.filter((c: Creep) => c.owner.username === 'Source Keeper');
			return this.getAvoidMatrix({ 'Source Keeper': SKCreeps });
		});
	}

	getAvoidMatrix(toAvoid: { [type: string]: Creep[] }): CostMatrix {
		const VIEW_DISTANCE = 3;
		const avoidMatrix = this.structureMatrix.clone();
		for (const owner in toAvoid) {
			const creeps = toAvoid[owner];
			for (const creep of creeps) {
				for (let x = Math.max(0, creep.pos.x - VIEW_DISTANCE); x <= Math.min(49, creep.pos.x + VIEW_DISTANCE); x++) {
					const deltaX = x < creep.pos.x ? creep.pos.x - x : x - creep.pos.x;
					for (let y = Math.max(0, creep.pos.y - VIEW_DISTANCE); y <= Math.min(49, creep.pos.y + VIEW_DISTANCE); y++) {
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
	}

	showCostMatrix(matrix: CostMatrix = this.structureMatrix, aroundPos?: Pos): void {
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
		for (let y = startY; y < endY; y++) {
			for (let x = startX; x < endX; x++) {
				const cost = matrix.get(x, y);
				if (cost) vis.text(cost, x, y);
				vis.rect(x - 0.5, y - 0.5, 1, 1, { fill: Visuals.getColourByPercentage(cost / maxCost) });
			}
		}
	}

	/// ///////////////////////////////////////////////////////////////////
	// other
	/// ///////////////////////////////////////////////////////////////////

	get pavementArt(): any[] {
		return this.memoryCache('pavementArt', () => []);
	}
}

Util.define(Room, RoomExtend);
