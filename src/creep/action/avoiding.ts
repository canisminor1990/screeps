import { CreepAction } from '../Action';

class AvoidingAction extends CreepAction {
	constructor() {
		super('avoiding');
	}
	targetRange = 0;
	reachedRange = 0;
	lairDangerTime = 24;
	lairDangerRange = 14;

	isActiveLair = target => {
		return !_.isUndefined(target.ticksToSpawn) && target.ticksToSpawn <= this.lairDangerTime;
	};
	isValidAction = creep => {
		return (
			creep.data.destiny &&
			creep.data.destiny.room === creep.room.name &&
			(RoomManager.isSKRoom(creep.room.name) || creep.room.situation.invasion)
		);
	};
	isAddableAction = creep => {
		return true;
	};
	isValidTarget = (target, creep) => {
		if (Task.reputation.npcOwner(target)) {
			// not a lair(creep most likely), or an active lair
			return _.isUndefined(target.ticksToSpawn) || this.isActiveLair(target);
		} else if (Task.reputation.hostileOwner(target) && target.hasActiveBodyparts) {
			return target.hasActiveBodyparts([ATTACK, RANGED_ATTACK]);
		}
		return false;
	};
	newTarget = creep => {
		if (RoomManager.isSKRoom(creep.pos.roomName)) {
			const target = _.first(
				creep.room.find(FIND_STRUCTURES, {
					filter: t => {
						return this.isActiveLair(t) && creep.pos.getRangeTo(t.pos) <= this.lairDangerRange;
					},
				}),
			);

			if (target) {
				return target;
			}
		}

		if (creep.room.situation.invasion) {
			const target = _.chain(creep.room.hostiles)
				.filter(target => {
					return this.isValidTarget(target);
				})
				.map(target => {
					// TODO react to players? getStrategyHandler
					let score = 0;
					const range = creep.pos.getRangeTo(target);
					if (creep.owner.username === 'Invader' || creep.owner.username === 'Source Keeper') {
						score = range - 51;
					} else if (range < 10) {
						score = range - 11;
					} else {
						score = 0;
					}
					return { target, score };
				})
				.filter('score')
				.sortBy('score')
				.first()
				.get('target')
				.value();

			if (target) {
				return target;
			}
		}
	};
	work = creep => {
		if (!(creep.data.safeSpot && creep.data.safeSpot.roomName)) {
			const flag = creep.data.destiny && Game.flags[creep.data.destiny.targetName];
			if (flag) {
				creep.data.safeSpot = flag.pos;
			} else {
				// find the route home, move toward the exit until out of danger
				const exit = _.chain(creep.room.findRoute(creep.data.homeRoom))
					.first()
					.get('exit')
					.value();
				if (exit) {
					creep.data.safeSpot = creep.pos.findClosestByRange(exit);
					creep.data.safeSpot.roomName = creep.pos.roomName;
				}
			}
		}

		if (creep.data.safeSpot) {
			if (creep.pos.getRangeTo(creep.target) < 10) {
				creep.travelTo(creep.data.safeSpot);
			} else {
				creep.idleMove();
			}
		}
	};
	run = creep => {
		if (this.isValidAction(creep)) {
			if (
				(creep.action === this && this.isValidTarget(creep.target, creep)) ||
				(this.isAddableAction(creep) && this.assign(creep))
			) {
				if (creep.leaveBorder()) {
					return true;
				}

				this.work(creep);
				return true;
			}
		}
	};
}

export default new AvoidingAction();
