import { Component } from '../class';

class PopulationConstructor extends Component {
	typeCount = {};
	typeWeight = {};
	actionCount = {};
	actionWeight = {};
	died = [];
	predictedRenewal = [];
	spawned = [];
	spawnsToProbe = [];
	stats = {
		creep: {
			coreParts: {
				[MOVE]: true,
				[HEAL]: true,
			},
			boost: {
				hits: {
					[RESOURCE_GHODIUM_OXIDE]: 143,
					[RESOURCE_GHODIUM_ALKALIDE]: 200,
					[RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: 334,
				},
			},
		},
	};

	fresh = (): void => {
		this.typeCount = {};
		this.typeWeight = {};
		this.actionCount = {};
		this.actionWeight = {};
		this.died = [];
		this.predictedRenewal = [];
		this.spawned = [];
		this.spawnsToProbe = [];
		if (_.isUndefined(Memory.population)) {
			Memory.population = {};
		}
	};
	analyze = (): void => {
		let register = entry => {
			let creep = Game.creeps[entry.creepName];
			if (!creep) {
				if (entry.ttl > 1) {
					Log.room(entry.roomName, Util.emoji.skull, Dye(COLOR_RED, entry.creepName, 'has been killed...'));
				} else {
					Log.room(entry.roomName, Util.emoji.skull, Dye('black', entry.creepName, 'was dead...'));
				}
				this.died.push(entry.creepName);
			} else {
				creep.data = entry;
				delete creep.action;
				delete creep.target;
				delete creep.flag;
				if (creep.spawning) {
					// count spawning time
					entry.spawningTime++;
				} else if (creep.ticksToLive > 0 && !creep.data.spawned) {
					// spawning complete
					creep.data.spawned = true;
					this.spawned.push(entry.creepName);
					if (Game.spawns[entry.motherSpawn]) this.spawnsToProbe.push(entry.motherSpawn); // only push living spawns
				} else if (
					creep.ticksToLive <= (entry.predictedRenewal ? entry.predictedRenewal : entry.spawningTime) &&
					!creep.data.nearDeath
				) {
					// will die in ticks equal to spawning time or custom
					creep.data.nearDeath = true;
					if (CENSUS_ANNOUNCEMENTS)
						Log.room(entry.roomName, Util.emoji.skull, Dye('black', entry.creepName, 'was near death...'));
					this.predictedRenewal.push(creep.name);
					if (
						!this.spawnsToProbe.includes(entry.motherSpawn) &&
						entry.motherSpawn != 'unknown' &&
						Game.spawns[entry.motherSpawn]
					) {
						this.spawnsToProbe.push(entry.motherSpawn);
					}
				}
				entry.ttl = creep.ticksToLive;

				if (entry.creepType && (creep.ticksToLive === undefined || CreepManager.isWorkingAge(entry))) {
					this.countCreep(creep.room, entry);
				}

				if (entry.flagName) {
					let flag = Game.flags[entry.flagName];
					if (!flag) delete entry.flagName;
					else {
						if (flag.targetOf === undefined) flag.targetOf = [entry];
						else flag.targetOf.push(entry);
						creep.flag = flag;
					}
				}
				let action =
					entry.actionName && CreepManager.action[entry.actionName] ? CreepManager.action[entry.actionName] : null;
				let target =
					action && entry.targetId
						? Game.getObjectById(entry.targetId) || Game.spawns[entry.targetId] || Game.flags[entry.targetId]
						: null;
				if (target && target.id === creep.id) {
					target = FlagManager.specialFlag();
				}
				if (action && target) this.registerAction(creep, action, target, entry);
				else {
					delete entry.actionName;
					delete entry.targetId;
					creep.action = null;
					creep.target = null;
				}

				if (entry.hull === undefined) {
					_.assign(entry, this.getCombatStats(creep.body));
				}

				creep.data = entry;
			}
		};
		_.forEach(Memory.population, c => {
			register(c);
		});

		let validateAssignment = entry => {
			let creep = Game.creeps[entry.creepName];
			if (creep && creep.action && creep.target) {
				let oldId = creep.target.id || creep.target.name;
				let target = creep.action.validateActionTarget(creep, creep.target);
				if (!target) {
					delete entry.actionName;
					delete entry.targetId;
					creep.action = null;
					creep.target = null;
				} else if (oldId != target.id || target.name) {
					this.registerAction(creep, creep.action, target, entry);
				}
			}
		};
		_.forEach(Memory.population, c => {
			validateAssignment(c);
		});
	};
	run = (): void => {
		let triggerCompleted = name => CreepManager.spawningCompleted.trigger(Game.creeps[name]);
		this.spawned.forEach(triggerCompleted);

		// CreepManager.died.on(n => console.log(`Creep ${n} died!`));
		CreepManager.died.on(c => {
			const data = Memory.population[c];
			if (data && data.determinatedSpot && data.roomName) {
				RoomManager.costMatrixInvalid.trigger(data.roomName);
			}
		});
		let triggerDied = name => CreepManager.died.trigger(name);
		this.died.forEach(triggerDied);

		let triggerRenewal = name => CreepManager.predictedRenewal.trigger(Game.creeps[name]);
		this.predictedRenewal.forEach(triggerRenewal);

		if (Game.time % SPAWN_INTERVAL != 0) {
			let probeSpawn = spawnName => Game.spawns[spawnName].run();
			this.spawnsToProbe.forEach(probeSpawn);
		}
	};
	cleanup = (): void => {
		let unregister = name => this.unregisterCreep(name);
		this.died.forEach(unregister);
		// TODO consider clearing target here
	};

	getCreep = creepName => {
		return Memory.population[creepName];
	};
	setCreep = val => {
		Memory.population[val.creepName] = val;
		return Memory.population[val.creepName];
	};
	registerCreep = (creepName, creepType, creepCost, room, spawnName, body, destiny = null) => {
		let entry = this.setCreep({
			creepName: creepName,
			creepType: creepType,
			weight: creepCost,
			roomName: room.name,
			homeRoom: room.name,
			motherSpawn: spawnName,
			actionName: null,
			targetId: null,
			spawningTime: 0,
			flagName: null,
			body: _.countBy(body),
			destiny: destiny,
		});
		this.countCreep(room, entry);
	};
	unregisterCreep = creepName => {
		delete Memory.population[creepName];
		delete Memory.creeps[creepName];
	};
	registerAction = (creep, action, target, entry) => {
		if (LOG_TRACE)
			Log.trace('PopManager', {
				creepName: this.name,
				registerAction: action.name,
				target: target.name || target.id,
				PopManager: 'registerAction',
			});

		if (creep === target) throw new Error('attempt to register self target');
		if (entry === undefined) entry = this.getCreep(creep.name);
		entry.carryCapacityLeft = creep.carryCapacity - creep.sum;
		let room = creep.room;
		if (room.population === undefined) {
			room.population = {
				typeCount: {},
				typeWeight: {},
				actionCount: {},
				actionWeight: {},
			};
		}
		if (creep.action) {
			// unregister action
			if (room.population.actionCount[creep.action.name] === undefined)
				room.population.actionCount[creep.action.name] = 0;
			else room.population.actionCount[creep.action.name]--;
			if (room.population.actionWeight[creep.action.name] === undefined)
				room.population.actionWeight[creep.action.name] = 0;
			else room.population.actionWeight[creep.action.name] -= entry.weight;
			if (this.actionCount[creep.action.name] === undefined) this.actionCount[creep.action.name] = 0;
			else this.actionCount[creep.action.name]--;
			if (this.actionWeight[creep.action.name] === undefined) this.actionWeight[creep.action.name] = 0;
			else this.actionWeight[creep.action.name] -= entry.weight;

			delete creep.data.determinatedSpot;
			delete creep.data.determinatedTarget;
		}
		// register action
		entry.actionName = action.name;
		if (room.population.actionCount[action.name] === undefined) room.population.actionCount[action.name] = 1;
		else room.population.actionCount[action.name]++;
		if (room.population.actionWeight[action.name] === undefined)
			room.population.actionWeight[action.name] = entry.weight;
		else room.population.actionWeight[action.name] += entry.weight;
		if (this.actionCount[action.name] === undefined) this.actionCount[action.name] = 1;
		else this.actionCount[action.name]++;
		if (this.actionWeight[action.name] === undefined) this.actionWeight[action.name] = entry.weight;
		else this.actionWeight[action.name] += entry.weight;

		let targetId = target.id || target.name;
		let oldTargetId;
		if (entry.targetId) {
			// unregister target
			let oldTarget = entry.targetId
				? Game.getObjectById(entry.targetId) || Game.spawns[entry.targetId] || Game.flags[entry.targetId]
				: null;
			if (oldTarget) {
				oldTargetId = oldTarget.id || oldTarget.name;
				if (oldTarget.targetOf) {
					let byName = elem => elem.creepName === creep.name;
					let index = oldTarget.targetOf.findIndex(byName);
					if (index > -1) oldTarget.targetOf.splice(index, 1);
				}
			}
		}
		// register target
		entry.targetId = targetId;
		if (target && !FlagManager.isSpecialFlag(target)) {
			try {
				if (target.targetOf === undefined) {
					target.targetOf = [entry];
				} else target.targetOf.push(entry);
			} catch (e) {
				target.targetOf = undefined;
			}
		}
		// clear saved path
		if (targetId !== oldTargetId) delete entry.path;

		creep.action = action;
		creep.target = target;
		creep.data = entry;
	};
	registerCreepFlag = (creep, flag) => {
		if (flag && creep.data && creep.data.flagName && creep.data.flagName == flag.name && creep.flag.name == flag.name)
			return;
		if (creep.data && creep.data.flagName) {
			// unregister flag
			let oldFlag = Game.flags[creep.data.flagName];
			if (oldFlag && oldFlag.targetOf) {
				let byName = elem => elem.creepName === creep.name;
				let index = oldFlag.targetOf.findIndex(byName);
				if (index > -1) oldFlag.targetOf.splice(index, 1);
			}
		}
		if (!flag) {
			delete creep.data.flagName;
			delete creep.flag;
		} else {
			if (flag.targetOf === undefined) flag.targetOf = [creep.data];
			else flag.targetOf.push(creep.data);
			creep.flag = flag;
			creep.data.flagName = flag.name;
		}
	};
	countCreep = (room, entry) => {
		entry.roomName = room.name;
		if (room.population === undefined) {
			room.population = {
				typeCount: {},
				typeWeight: {},
				actionCount: {},
				actionWeight: {},
			};
		}

		if (room.population.typeCount[entry.creepType] === undefined) room.population.typeCount[entry.creepType] = 1;
		else room.population.typeCount[entry.creepType]++;
		if (room.population.typeWeight[entry.creepType] === undefined)
			room.population.typeWeight[entry.creepType] = entry.weight;
		else room.population.typeWeight[entry.creepType] += entry.weight;
		if (this.typeCount[entry.creepType] === undefined) this.typeCount[entry.creepType] = 1;
		else this.typeCount[entry.creepType]++;
		if (this.typeWeight[entry.creepType] === undefined) this.typeWeight[entry.creepType] = entry.weight;
		else this.typeWeight[entry.creepType] += entry.weight;
	};

	sortEntries = () => {
		let temp = {};
		_.map(_.sortBy(Memory.population, p => p.creepName), c => (temp[c.creepName] = c));
		Memory.population = temp;
	};
	getCombatStats = body => {
		let i = 0;

		let hull = 99;
		let coreHits = body.length * 100 - 99;
		for (; i < body.length; i++) {
			if (this.stats.creep.coreParts[body[i].type]) {
				break;
			}
			hull = hull + (this.stats.creep.boost.hits[body[i].boost] || 100);
			coreHits = coreHits - 100;
		}

		return {
			hull, // damage needed to impede movement
			coreHits, // if (hits < coreHits) missing moves!
		};
	};
	findCircular = () => {
		const groups = {
			creeps: Game.creeps,
			structures: Game.structures,
			memory: Memory,
		};

		const map = {};

		for (let gid in groups) {
			const group = groups[gid];
			for (let id in group) {
				const entity = group[id];
				const path = gid + '.' + id;
				map[id] = path;
				this.checkCircular(id, map, entity, path, 1);
			}
		}
	};
	checkCircular = (stopId, map, root, rootPath, depth) => {
		if (depth > 10) {
			Log.error('Checking for circulars, very deep path', { rootPath, depth });
			return;
		}
		for (let key in root) {
			const path = rootPath + '.' + key;
			const entity = root[key];
			if (!_.isObject(entity)) continue;
			const id = entity.id || entity.name;
			if (id === stopId) {
				throw new Error('circular structure:' + id + ' at:' + path + ' and at:' + map[id]);
			}
			if (!id || map[id]) {
				continue;
			}
			map[id] = path;
			this.checkCircular(stopId, map, entity, path, depth + 1);
		}
	};
}

export default new PopulationConstructor();
