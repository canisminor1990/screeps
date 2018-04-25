import { CreepBehaviour } from '../Behaviour';

class UpgraderBehaviour extends CreepBehaviour {
	constructor() {
		super('upgrader');
	}

	invalidCreep = c =>
		['miner', 'upgrader'].includes(c.data.creepType) &&
		c.data.determinatedSpot &&
		(c.data.ttl > c.data.spawningTime || c.data.ttl > c.data.predictedRenewal);
	approach = creep => {
		let targetPos = new RoomPosition(creep.data.determinatedSpot.x, creep.data.determinatedSpot.y, creep.pos.roomName);
		let range = creep.pos.getRangeTo(targetPos);
		if (range > 0) {
			creep.data.movingToTarget = true;
			const creepAtSpot = targetPos.lookFor(LOOK_CREEPS);
			const targetRange = creepAtSpot.length ? 1 : 0;
			if (range === 1) {
				if (creepAtSpot.length && _.some(creepAtSpot, this.invalidCreep)) {
					// forget spots that have been improperly selected/unable to move to
					delete creep.data.determinatedSpot;
				}
			}
			creep.travelTo(targetPos, { range: targetRange });
		} else if (creep.data.movingToTarget) {
			// we have arrived at our determinatedSpot
			creep.room.invalidateCostMatrix();
			delete creep.data.movingToTarget;
		}
		return range;
	};
	run = (creep: Creep) => {
		if (creep.room.controller.upgradeBlocked) {
			creep.data.creepType = 'recycler';
			return;
		}

		if (creep.room.RCL < 6) return this.upgrading(creep);
		const boostCreep = creep.room.memory.boostCreep;
		if (creep.ticksToLive > 1200 && boostCreep && boostCreep.creepType === creep.data.creepType && boostCreep.ready) {
			if (creep.data.boost && creep.data.boost.done) return this.upgrading(creep);
			return this.boosting(creep, boostCreep.id);
		}
		return this.upgrading(creep);
	};

	boosting = (creep: Creep, targetId: string) => {
		if (!creep.action || creep.action.name !== 'boosting' || !creep.data.boost) {
			const target = Game.getObjectById(targetId);
			PopManager.registerAction(creep, CreepManager.action.boosting, target);
			creep.data.boost = {
				done: false,
			};
		}
		const lab: StructureLab = creep.target;
		if (_.isUndefined(creep.data.boost.x)) {
			creep.data.boost.x = lab.pos.x;
			creep.data.boost.y = lab.pos.y;
		}
		const targetPos = new RoomPosition(creep.data.boost.x, creep.data.boost.y, creep.pos.roomName);
		creep.travelTo(targetPos);
		const boostPartsCount = _.filter(creep.body, part => !_.isUndefined(part.boost)).length;
		if (boostPartsCount === 0) {
			CreepManager.action.boosting.work(creep);
		} else {
			Log.success(
				creep.room,
				Util.emoji.boosting,
				Dye(COLOR_GREEN, this.name, `boost ${lab.mineralType} to ${boostPartsCount} parts successfull`),
			);
			creep.data.boost.done = true;
		}
	};

	upgrading = (creep: Creep) => {
		if (!creep.action || creep.action.name !== 'upgrading')
			PopManager.registerAction(creep, CreepManager.action.upgrading, creep.room.controller);
		if (!creep.data.determinatedSpot) {
			let determineSpots = (ignoreSources = false) => {
				let spots = [];
				let getSpots = s => {
					let args = {
						spots: [
							{
								pos: creep.room.controller.pos,
								range: 3,
							},
							{
								pos: s.pos,
								range: 1,
							},
						],
						checkWalkable: true,
						where: pos =>
							!_.some(pos.lookFor(LOOK_CREEPS), this.invalidCreep) &&
							(ignoreSources || pos.findInRange(creep.room.sources, 1).length === 0),
						roomName: creep.pos.roomName,
					};
					return RoomManager.fieldsInRange(args);
				};
				let linkSpots = creep.room.structures.links.controller
					? _.flatten(_.map(creep.room.structures.links.controller, getSpots))
					: [];
				let containerSpots = creep.room.structures.container.controller
					? _.flatten(_.map(creep.room.structures.container.controller, getSpots))
					: [];
				let storageSpots = creep.room.storage ? getSpots(creep.room.storage) : [];
				let terminalSpots = creep.room.terminal ? getSpots(creep.room.terminal) : [];
				// priority = close to both link and a form of storage > close to link only > close to a form of storage only
				if (linkSpots.length) {
					let both = [];
					if (both.length === 0 && containerSpots.length)
						both = _.filter(linkSpots, l => _.some(containerSpots, c => c.isEqualTo(l)));
					if (both.length === 0 && storageSpots.length)
						both = _.filter(linkSpots, l => _.some(storageSpots, c => c.isEqualTo(l)));
					if (both.length === 0 && terminalSpots.length)
						both = _.filter(linkSpots, l => _.some(terminalSpots, c => c.isEqualTo(l)));
					return both.length ? both : linkSpots;
				}
				// priority: containers > storage > terminal
				return containerSpots.length ? containerSpots : storageSpots.length ? storageSpots : terminalSpots;
			};
			let spots = determineSpots();
			if (spots.length > 0) {
				// allow spots near sources
				spots = determineSpots(true);
			}
			if (spots.length > 0) {
				// prefer off roads
				let spot = creep.pos.findClosestByPath(spots, {
					filter: pos => {
						return !_.some(creep.room.lookForAt(LOOK_STRUCTURES, pos), {
							structureType: STRUCTURE_ROAD,
						});
					},
				});
				if (!spot) spot = creep.pos.findClosestByPath(spots) || spots[0];
				if (spot) {
					creep.data.determinatedSpot = {
						x: spot.x,
						y: spot.y,
					};
					let spawn = Game.spawns[creep.data.motherSpawn];
					if (spawn) {
						let path = spot.findPathTo(spawn, { ignoreCreeps: true });
						const speed = creep.data.body ? Math.ceil(creep.data.body.work / (2 * creep.data.body.move)) : 1; // road assumed
						if (path) creep.data.predictedRenewal = creep.data.spawningTime + path.length * speed;
					}
				}
			}
			if (!creep.data.determinatedSpot) {
				Log.error('Unable to determine working location for upgrader in room ' + creep.pos.roomName);
			} else if (SAY_ASSIGNMENT) creep.say(Util.emoji.reload, SAY_PUBLIC);
		} else {
			if (CHATTY) creep.say('upgrading', SAY_PUBLIC);
			let range = this.approach(creep);
			if (creep.room.controller && creep.pos.getRangeTo(creep.room.controller) <= 3) {
				let carryThreshold = creep.data.body && creep.data.body.work ? creep.data.body.work : creep.carryCapacity / 2;
				if (creep.carry.energy <= carryThreshold) {
					let store = _.find(creep.room.structures.links.controller, s => s.energy > 0 && creep.pos.isNearTo(s));
					if (!store)
						store = _.find(
							creep.room.structures.container.controller,
							s => s.store[RESOURCE_ENERGY] > 0 && creep.pos.isNearTo(s),
						);
					if (!store) {
						store = creep.room.storage && creep.room.storage.charge > 0 && creep.pos.isNearTo(creep.room.storage);
					}
					if (!store) {
						store =
							creep.room.terminal &&
							creep.room.terminal.store[RESOURCE_ENERGY] > 0.5 * TERMINAL_ENERGY &&
							creep.pos.isNearTo(creep.room.terminal);
					}
					if (store) creep.withdraw(store, RESOURCE_ENERGY);
				}
				creep.controllerSign();
				creep.upgradeController(creep.room.controller);
			}
		}
	};
}

export default new UpgraderBehaviour();
