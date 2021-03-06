import { Strategy } from '../util/strategy';

class CreepExtend extends Creep {
	constructor() {}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function, checkTime: boolean): any {
		if (checkTime) {
			if (_.isUndefined(this[`_${key}`]) || this[`_${key}Set`] !== Game.time) {
				this[`_${key}Set`] = Game.time;
				this[`_${key}`] = func();
			}
		} else {
			if (_.isUndefined(this[`_${key}`])) {
				this[`_${key}`] = func();
			}
		}

		return this[`_${key}`];
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////

	run(behaviour: any): void {
		if (!this.spawning) {
			if (!behaviour && this.data && this.data.creepType) {
				behaviour = CreepManager.behaviour[this.data.creepType];
				if (this.room.skip) return;
				if (Memory.CPU_CRITICAL && !CRITICAL_ROLES.includes(this.data.creepType)) {
					return;
				}
			}

			if (this.data && !_.contains(['remoteMiner', 'miner', 'upgrader'], this.data.creepType)) {
				this.repairNearby();
				this.buildNearby();
			}
			if (LOG_TRACE)
				Log.trace('Creep', {
					creepName: this.name,
					pos: this.pos,
					Behaviour: behaviour && behaviour.name,
					Creep: 'run',
				});
			if (behaviour) {
				behaviour.run(this);
			} else if (!this.data) {
				if (LOG_TRACE) Log.trace('Creep', { creepName: this.name, pos: this.pos, Creep: 'run' }, 'memory init');
				let type = this.memory.setup;
				let weight = this.memory.cost;
				let home = this.memory.home;
				let spawn = this.memory.mother;
				let breeding = this.memory.breeding;
				if (type && weight && home && spawn && breeding) {
					Log.module('Creep', 'Fixing corrupt creep without population entry: ' + this.name);
					let entry = PopManager.setCreep({
						creepName: this.name,
						creepType: type,
						weight: weight,
						roomName: this.pos.roomName,
						homeRoom: home,
						motherSpawn: spawn,
						actionName: this.action ? this.action.name : null,
						targetId: this.target ? this.target.id || this.target.name : null,
						spawningTime: breeding,
						flagName: null,
						body: _.countBy(this.body, 'type'),
					});
					PopManager.countCreep(this.room, entry);
				} else {
					Log.error('[Creep] Corrupt creep without population entry! : ' + this.name, Log.stack());
					// trying to import creep
					let counts = _.countBy(this.body, 'type');
					if (counts[WORK] && counts[CARRY]) {
						let weight =
							counts[WORK] * BODYPART_COST[WORK] +
							counts[CARRY] * BODYPART_COST[CARRY] +
							counts[MOVE] * BODYPART_COST[MOVE];
						let entry = PopManager.setCreep({
							creepName: this.name,
							creepType: 'worker',
							weight: weight,
							roomName: this.pos.roomName,
							homeRoom: this.pos.roomName,
							motherSpawn: null,
							actionName: null,
							targetId: null,
							spawningTime: -1,
							flagName: null,
							body: _.countBy(this.body, 'type'),
						});
						PopManager.countCreep(this.room, entry);
					} else this.suicide();
				}
			}
			if (this.flee) {
				this.fleeMove();
				CreepManager.behaviour.ranger.heal(this);
				if (SAY_ASSIGNMENT) this.say(String.fromCharCode(10133), SAY_PUBLIC);
			}
		}
		Strategy.freeStrategy(this);
	}

	travelTo(destination: any, options: obj = {}) {
		destination = destination.pos || destination;
		if (global.traveler && global.travelerTick !== Game.time) {
			global.traveler = new Traveler();
		}
		options = this.getStrategyHandler([], 'moveOptions', options);
		_.defaults(options, {
			allowSK: true,
			avoidSKCreeps: true,
			debug: DEBUG,
			reportThreshold: TRAVELER_THRESHOLD,
			useFindRoute: _.get(global, 'ROUTE_PRECALCULATION', true),
			routeCallback: RoomManager.routeCallback(this.pos.roomName, destination.roomName, options),
			getStructureMatrix: (room: Room) => RoomManager.getStructureMatrix(room.name || room, options),
			getCreepMatrix: (room: Room) => room.getCreepMatrix(options.getStructureMatrix(room)),
		});
		if (
			options.respectRamparts &&
			this.room.situation.invasion &&
			_.filter(this.pos.lookFor(LOOK_STRUCTURES), { my: true, structureType: STRUCTURE_RAMPART }).length
		) {
			// don't move off a rampart if we're already on one while hostiles are present
			return OK;
		}
		return traveler.travelTo(this, destination, options);
	}

	fleeMove(): void {
		if (LOG_TRACE)
			Log.trace('Creep', {
				creepName: this.name,
				pos: this.pos,
				Action: 'fleeMove',
				Creep: 'run',
			});
		const drop = (r: string) => {
			if (this.carry[r] > 0) this.drop(r);
		};
		_.forEach(Object.keys(this.carry), drop);
		if (this.fatigue > 0) return;
		let path;
		if (
			!this.data.fleePath ||
			this.data.fleePath.length < 2 ||
			this.data.fleePath[0].x !== this.pos.x ||
			this.data.fleePath[0].y !== this.pos.y ||
			this.data.fleePath[0].roomName !== this.pos.roomName
		) {
			const goals = _.map(this.room.hostiles, (o: Creep) => {
				return { pos: o.pos, range: 5 };
			});

			const ret = PathFinder.search(this.pos, goals, {
				flee: true,
				plainCost: 2,
				swampCost: 10,
				maxOps: 500,
				maxRooms: 2,
				roomCallback: (roomName: string) => {
					let room: Room = Game.rooms[roomName];
					if (!room) return;
					return room.creepMatrix;
				},
			});
			path = ret.path;

			this.data.fleePath = path;
		} else {
			this.data.fleePath.shift();
			path = this.data.fleePath;
		}
		if (path && path.length > 0)
			this.move(this.pos.getDirectionTo(new RoomPosition(path[0].x, path[0].y, path[0].roomName)));
	}

	idleMove(): any {
		if (this.fatigue > 0) return;
		// check if on road/structure
		const needToMove = _(this.room.structures.piles)
			.filter('pos', this.pos)
			.concat(this.pos.lookFor(LOOK_STRUCTURES))
			.concat(this.pos.lookFor(LOOK_CONSTRUCTION_SITES))
			.size();
		if (needToMove) {
			if (
				!this.data.idle ||
				!this.data.idle.path ||
				!this.data.idle.path.length ||
				this.pos.isEqualTo(this.data.idle.lastPos)
			) {
				const idleFlag = FlagManager.find(FLAG_COLOR.command.idle, this.pos, true, (r, flagEntry: obj) => {
					const flag = Game.flags[flagEntry.name];
					const occupied = flag.pos.lookFor(LOOK_CREEPS);
					if (occupied && occupied.length) {
						return Infinity;
					} else {
						return r;
					}
				});
				let ret;
				if (idleFlag) {
					ret = PathFinder.search(
						this.pos,
						{ pos: idleFlag.pos, range: 0 },
						{
							plainCost: 2,
							swampCost: 10,
							maxOps: 350,
							maxRooms: 1,
							roomCallback: (roomName: string) => {
								let room = Game.rooms[roomName];
								if (!room) return;
								return room.structureMatrix;
							},
						},
					);
				} else {
					let goals = this.room.structures.all
						.map((o: Structure) => {
							return { pos: o.pos, range: 1 };
						})
						.concat(
							this.room.sources.map((s: Source) => {
								return { pos: s.pos, range: 2 };
							}),
						)
						.concat(
							this.pos.findInRange(FIND_EXIT, 2).map((e: RoomPosition) => {
								return { pos: e, range: 1 };
							}),
						)
						.concat(
							this.room.myConstructionSites.map((o: ConstructionSite) => {
								return { pos: o.pos, range: 1 };
							}),
						);
					ret = PathFinder.search(this.pos, goals, {
						flee: true,
						plainCost: 2,
						swampCost: 10,
						maxOps: 350,
						maxRooms: 1,
						roomCallback: (roomName: string) => {
							let room = Game.rooms[roomName];
							if (!room) return;
							return room.structureMatrix;
						},
					});
				}
				this.data.idle = {
					path: Traveler.serializePath(this.pos, ret.path),
					lastPos: this.pos,
				};
			} else {
				this.data.idle.path = this.data.idle.path.substr(1);
			}
			const next = parseInt(this.data.idle.path[0], 10);
			if (next) {
				this.data.idle.lastPos = this.pos;
				this.move(next);
			}
			if (this.data.idle.path && !this.data.idle.path.length) {
				delete this.data.idle;
			}
		}
	}

	// only valid on one creep at a time
	get trace(): boolean {
		return Memory.debugTrace.creepName === this.name;
	}

	set trace(value: boolean) {
		if (value) {
			Memory.debugTrace.creepName = this.name;
		} else if (this.trace) {
			delete Memory.debugTrace.creepName;
		}
	}

	get flee(): number | void {
		if (!this.data) return;
		if (this.data.flee) {
			// release when restored
			this.data.flee = this.hits !== this.hitsMax;
		} else {
			// set when low
			this.data.flee = this.hits / this.hitsMax < 0.35;
		}
		return this.data.flee;
	}

	set flee(newValue: number) {
		this.data.flee = newValue;
	}

	get sum(): number {
		return this.cache('sum', () => _.sum(this.carry), true);
	}

	get carries(): obj {
		return this.cache('carries', () => this.carry, true);
	}

	get threat(): number {
		return this.cache('threat', () => CreepManager.bodyThreat(this.body));
	}

	get behaviour(): obj {
		return CreepManager.behaviour[this.data.creepType];
	}

	assignAction(action: CreepAction | string, target: RoomObject): boolean {
		if (_.isString(action)) action = CreepManager.action[action];
		if (!action || !(action instanceof CreepManager.Action)) return;
		return action.assign(this, target);
	}

	assignBehaviour(behaviour: CreepBehaviour | string): boolean {
		if (_.isString(behaviour)) behaviour = CreepManager.behaviour[behaviour];
		if (!behaviour || !(behaviour instanceof CreepManager.Behaviour)) return;
		return behaviour.assign(this);
	}

	findGroupMemberByType(creepType: string, flagName: string): string | null {
		return this.findGroupMemberBy((c: CreepMemory) => c.creepType === creepType, flagName);
	}

	findGroupMemberBy(findFunc: Function, flagName: string): string | null {
		if (_.isUndefined(flagName)) flagName = this.data.flagName;
		if (!_.isUndefined(findFunc) && flagName) {
			const ret = _(Memory.population)
				.filter({ flagName })
				.find(findFunc) as CreepMemory;
			return ret ? ret.creepName : null;
		} else {
			Log.error(`${this.name} - Invalid arguments for CreepManager.findGroupMemberBy ${flagName} ${findFunc}`);
		}
		return null;
	}

	findByType(creepType: string): string | undefined {
		let creep: CreepMemory;
		for (let name in Memory.population) {
			creep = Memory.population[name];
			if (creep.creepType === creepType) {
				return name;
			}
		}
	}

	getBodyparts(type: string): number {
		return _(this.body)
			.filter({ type })
			.value().length;
	}

	/*
	* Check if a creep has body parts of a certain type anf if it is still active
	* Accepts a single part type (like RANGED_ATTACK) or an array of part types
	* Returns true, if there is at least any one part with a matching type present and active
	* */
	hasActiveBodyparts(partTypes: string): boolean {
		return this.hasBodyparts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
	}

	hasBodyparts(partTypes: string | string[], start: number = 0): boolean {
		const body = this.body;
		const limit = body.length;
		if (!Array.isArray(partTypes)) {
			partTypes = [partTypes];
		}
		for (let i = start; i < limit; i++) {
			if (partTypes.includes(body[i].type)) {
				return true;
			}
		}
		return false;
	}

	leaveBorder(): number {
		// if on border move away
		// for emergency case, Path not found
		let dir = 0;
		if (this.pos.y === 0) {
			dir = BOTTOM;
		} else if (this.pos.x === 0) {
			dir = RIGHT;
		} else if (this.pos.y === 49) {
			dir = TOP;
		} else if (this.pos.x === 49) {
			dir = LEFT;
		}
		if (dir) {
			this.move(dir);
		}
		return dir;
		// TODO: CORNER cases
	}

	honk(): void {
		if (HONK) this.say('\u{26D4}\u{FE0E}', SAY_PUBLIC);
	}

	honkEvade(): void {
		if (HONK) this.say('\u{1F500}\u{FE0E}', SAY_PUBLIC);
	}

	repairNearby(): void {
		// only repair in rooms that we own, have reserved, or belong to our allies, also SK rooms and highways.
		if (this.room.controller && this.room.controller.owner && !(this.room.my || this.room.reserved || this.room.ally))
			return;
		// if it has energy and a work part, remoteMiners do repairs once the source is exhausted.
		if (this.carry.energy > 0 && this.hasActiveBodyparts(WORK)) {
			const repairRange =
				this.data && this.data.creepType === 'remoteHauler'
					? REMOTE_HAULER.DRIVE_BY_REPAIR_RANGE
					: DRIVE_BY_REPAIR_RANGE;
			const repairTarget = _(this.pos.findInRange(FIND_STRUCTURES, repairRange)).find((s: Structure) =>
				RoomManager.shouldRepair(this.room, s),
			) as Structure;
			if (repairTarget) {
				if (LOG_TRACE)
					Log.trace('Creep', { creepName: this.name, Action: 'repairing', Creep: 'repairNearby' }, repairTarget.pos);
				this.repair(repairTarget);
			}
		} else {
			if (LOG_TRACE)
				Log.trace(
					'Creep',
					{ creepName: this.name, pos: this.pos, Action: 'repairing', Creep: 'repairNearby' },
					'not repairing',
				);
		}
	}

	buildNearby(): void {
		// enable remote haulers to build their own roads and containers
		if (!REMOTE_HAULER.DRIVE_BY_BUILDING || !this.data || this.data.creepType !== 'remoteHauler') return;
		const buildTarget = _(this.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, REMOTE_HAULER.DRIVE_BY_BUILD_RANGE)).find(
			(s: ConstructionSite) =>
				REMOTE_HAULER.DRIVE_BY_BUILD_ALL ||
				(s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_ROAD),
		);
		if (buildTarget) {
			if (LOG_TRACE)
				Log.trace('Creep', { creepName: this.name, Action: 'building', Creep: 'buildNearby' }, buildTarget.pos);
			this.build(buildTarget);
		} else {
			if (LOG_TRACE)
				Log.trace('Creep', { creepName: this.name, Action: 'building', Creep: 'buildNearby' }, 'not building');
		}
	}

	controllerSign(): void {
		const signMessage = Util.fieldOrFunction(CONTROLLER_SIGN_MESSAGE, this.room);
		if (
			CONTROLLER_SIGN &&
			(!this.room.controller.sign ||
				this.room.controller.sign.username !== this.owner.username ||
				(CONTROLLER_SIGN_UPDATE && this.room.controller.sign.text !== signMessage))
		) {
			this.signController(this.room.controller, signMessage);
		}
	}

	handleError(errorData: obj): void {
		if (CreepManager.resolvingError) return;

		this.resolvingError = errorData;
		errorData.preventDefault = () => {
			CreepManager.resolvingError = null;
		};

		CreepManager.error.trigger(errorData);

		if (CreepManager.resolvingError) {
			Log.errorCode(this, errorData.errorCode);
			delete this.data.actionName;
			delete this.data.targetId;
			CreepManager.resolvingError = null;
		}
	}

	// Explain API extension
	explainAgent(): void {
		if (this.action) {
			this.action.showAssignment(this, this.target);
		}
		return `ttl:${this.ticksToLive} pos:${this.pos}`;
	}
}

Util.define(Creep, CreepExtend);
