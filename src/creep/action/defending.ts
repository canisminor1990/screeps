import { CreepAction } from '../../class';

class DefendingAction extends CreepAction {
	constructor() {
		super('defending');
		this.setDefault({
			priorityTargetFilter: creep => {
				return hostile => {
					return hostile.hasBodyparts(HEAL);
				};
			},
			targetFilter: creep => {
				return hostile => {
					return true;
				};
			},
		});
	}

	isValidAction = creep => {
		return creep.room.hostiles.length > 0;
	};
	isAddableAction = () => {
		return true;
	};
	isAddableTarget = () => {
		return true;
	};
	isValidTarget = target => {
		return target && target.hits != null && target.hits > 0 && target.my == false;
	};
	newTarget = creep => {
		let closestHostile = creep.pos.findClosestByRange(creep.room.hostiles, {
			filter: creep.getStrategyHandler([this.name], 'priorityTargetFilter', creep),
		});
		if (!closestHostile) {
			closestHostile = creep.pos.findClosestByRange(creep.room.hostiles, {
				filter: creep.getStrategyHandler([this.name], 'targetFilter', creep),
			});
		}
		return closestHostile;
	};
	step = creep => {
		if (CHATTY) creep.say(this.name, SAY_PUBLIC);
		if (creep.target.pos.roomName !== creep.room.name)
			return Creep.action.travelling.assignRoom(creep, creep.target.pos.roomName);
		this.run[creep.data.creepType](creep);
	};
	run = {
		ranger(creep) {
			let range = creep.pos.getRangeTo(creep.target);
			if (!creep.flee) {
				if (range > 3) {
					creep.travelTo(creep.target, { respectRamparts: COMBAT_CREEPS_RESPECT_RAMPARTS });
				}
				if (range < 3) {
					let direction = creep.target.pos.getDirectionTo(creep);
					if (direction) {
						if (
							COMBAT_CREEPS_RESPECT_RAMPARTS &&
							!_.filter(creep.pos.lookFor(LOOK_STRUCTURES), { my: true, structureType: STRUCTURE_RAMPART })
						) {
							creep.move(direction);
						}
						if (range === 1) {
							creep.attacking = creep.attack(creep.target) == OK;
						}
					}
				}
			}

			// attack ranged
			let targets = creep.pos.findInRange(creep.room.hostiles, 3);
			if (targets.length > 2) {
				// TODO: precalc damage dealt
				if (CHATTY) creep.say('MassAttack');
				creep.attackingRanged = creep.rangedMassAttack() == OK;
				return;
			}
			if (range < 4) {
				creep.attackingRanged = creep.rangedAttack(creep.target) == OK;
				return;
			}
			if (targets.length > 0) {
				creep.attackingRanged = creep.rangedAttack(targets[0]) == OK;
			}
		},
		melee(creep) {
			if (!creep.flee) {
				creep.travelTo(creep.target, { respectRamparts: COMBAT_CREEPS_RESPECT_RAMPARTS });
			}
			// attack
			let attacking = creep.attack(creep.target);
			if (attacking == ERR_NOT_IN_RANGE) {
				let targets = creep.pos.findInRange(creep.room.hostiles, 1);
				if (targets.length > 0) creep.attacking = creep.attack(targets[0]) == OK;
			} else creep.attacking = attacking == OK;
		},
	};
}

export default new DefendingAction();
