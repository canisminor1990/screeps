import { CreepAction } from '../../class';

class RobbingAction extends CreepAction {
	constructor() {
		super('robbing');
		this.setDefault({
			moveOptions: options => {
				// // allow routing in and through hostile rooms
				// if (_.isUndefined(options.allowHostile)) options.allowHostile = true;
				return options;
			},
			resourceValue: creep => {
				let energyOnly = creep.ticksToLive < this.minimumTTL;
				if (!energyOnly && creep.data.homeRoom) {
					const room = Game.rooms[creep.data.homeRoom];
					energyOnly = room && !room.storage;
				}

				if (energyOnly) {
					// console.log(creep.name, 'only selecting energy');
					return type => {
						// no storage, only rob energy
						return type === RESOURCE_ENERGY ? 1 : 0;
					};
				}
				// console.log(creep.name, 'standard score');
				return type => {
					if (type === RESOURCE_ENERGY) return 0.2;
					if (type === RESOURCE_POWER) return 500;
					return type.length;
				};
			},
			resourceScore: (creep, target, resourceValue) => {
				const range = creep.pos.getRangeTo(target);
				const logBase = this.scoreMultiplier;
				const adjacentValue = 50;
				return (type, amount, capacity) => {
					if (amount === 0) return { amount: 0, score: 0 };
					const multiplier = resourceValue(type);
					Log.debug(
						'[Action]',
						'Robbing',
						creep.name,
						'resourceScore',
						type,
						amount,
						multiplier,
						range,
						logBase,
						adjacentValue,
					);
					return {
						amount,
						score: multiplier * amount * (adjacentValue - Math.log1p(range) * logBase),
					};
				};
			},
		});
	}

	maxPerTarget = 2;
	maxPerAction = 10;
	scoreMultiplier = 1 / Math.log(1.2);
	minimumTTL = 500;
	isValidAction = creep => {
		return creep.sum < creep.carryCapacity * 0.95 && !creep.room.my;
	};
	isValidTarget = target => {
		if (
			_.some(target.pos.lookFor(LOOK_STRUCTURES), {
				structureType: STRUCTURE_RAMPART,
				isPublic: false,
				my: false,
			})
		) {
			return false;
		}

		if (target.structureType === STRUCTURE_NUKER || target.structureType === STRUCTURE_POWER_SPAWN) {
			return false;
		}

		return target.store || target.energy || target.mineralAmount;
	};
	newTarget = creep => {
		const targetPool = creep.room.structures.all;

		if (targetPool.length) {
			const targets = _.chain(targetPool)
				.filter(i => this.isValidTarget(i))
				.map(this.targetScore(creep)) // resource fill priority
				.filter('score')
				.sortBy('score')
				.reverse()
				.value();

			const target = _.get(targets, [0, 'target'], null);
			// after scoring iterate thru top candidates and do pathfinding to find an accessible target!
			Log.debug('[Action]', 'Robbing', creep.name, targets.length, target);
			return target;
		}
		return false;
	};
	work = creep => {
		const resourceRobValue = creep.getStrategyHandler([this.name], 'resourceValue', creep);
		const resourcesDescending = _.chain(Util.resources())
			.filter(resourceRobValue)
			.sortBy(resourceRobValue)
			.values()
			.value();

		// KARL YOU NEED TO DOCUMENT THIS, RESULTS OF WITHDRAW ARE NOT HANDLED INTUITIVELY
		return this.targetCall(creep, resourcesDescending, target => {
			return (type, amount, capacity) => {
				Log.debug('[Action]', 'Robbing', creep.name, target);
				const score = amount ? creep.withdraw(target, type, amount) : 0;
				if (score) {
					return { amount: capacity, score };
				}
				return { amount, score };
			};
		})(creep.target);
	};
	targetScore = creep => {
		const resourceRobValue = creep.getStrategyHandler([this.name], 'resourceValue', creep);
		const resourcesDescending = _.chain(Util.resources())
			.filter(resourceRobValue)
			.sortBy(resourceRobValue)
			.values()
			.value();

		return this.targetCall(creep, resourcesDescending, target => {
			return creep.getStrategyHandler([this.name], 'resourceScore', creep, target, resourceRobValue);
		});
	};
	targetCall = (creep, resourcesDescending, targetHandler) => {
		return target => {
			const valueCallback = targetHandler(target);

			let score = 0;
			if (target.store) {
				score = this.storeCall(creep, target, target.store, Util.valueOrZero, valueCallback, resourcesDescending);
			} else if (target.structureType === STRUCTURE_LAB) {
				score = this.storeCall(
					creep,
					target,
					{ [RESOURCE_ENERGY]: target.energy, [target.mineralType]: target.mineralAmount },
					Util.valueOrZero,
					valueCallback,
				);
			} else {
				score = this.storeCall(creep, target, { [RESOURCE_ENERGY]: target.energy }, Util.valueOrZero, valueCallback);
				// TODO dropped resources are a combination of all drops under that point, their decay function relates to the number of separate resources
				/* instead of valueOrZero:
							 const valueTransform = function(count) {
							 return decayFunction(count || 0, range);
							 };
							 */
			}
			return { target, score };
		};
	};
	storeCall = (creep, target, store, valueTransform, valueCallback, keys) => {
		let capacity = creep.carryCapacity - creep.sum;
		let value = 0;
		if (!keys) keys = _.keys(store);
		for (let i = keys.length - 1; i >= 0; i--) {
			if (capacity === 0) break;

			const type = keys[i];
			const count = Math.min(valueTransform(store[type]), capacity);
			const { amount, score } = valueCallback(type, count < 1 ? 0 : count, capacity);
			capacity = capacity - amount;
			value = value + score;
		}
		return value;
	};
}

export default new RobbingAction();
