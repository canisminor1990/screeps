import { CreepAction } from '../Action';

class RepairingAction extends CreepAction {
	constructor() {
		super('repairing');
		this.setDefault({
			eachedRange: 1,
			// this allows us to get energy in the same tick
			// if a behaviour defines this strategy, used in behaviour.miner
			getEnergy: creep => {
				return false;
			},
		});
	}

	targetRange = 3;
	maxPerTarget = 1;
	reachedRange = creep => {
		return creep.getStrategyHandler([this.name], 'reachedRange', creep);
	};
	isValidAction = creep => {
		return creep.carry.energy > 0;
	};
	isValidTarget = target => {
		return target != null && target.hits && target.hits < target.hitsMax;
	};
	isAddableTarget = (target, creep) => {
		return (
			((target instanceof OwnedStructure && target.my) ||
				(!creep.room.controller ||
					((!creep.room.controller.owner || creep.room.controller.my) &&
						(!creep.room.controller.reservation ||
							creep.room.controller.reservation.username == creep.owner.username)))) &&
			(!target.targetOf || target.targetOf.length < this.maxPerTarget)
		);
	};
	newTarget = creep => {
		let isAddable = target => this.isAddableTarget(target, creep);
		return _.find(creep.room.structures.urgentRepairable, isAddable);
	};
	work = creep => {
		creep.getStrategyHandler([this.name], 'getEnergy', creep);
		return creep.repair(creep.target);
	};
}

export default new RepairingAction();
