import { CreepAction } from '../../class';

class BuildingAction extends CreepAction {
	constructor() {
		super('building');
		this.setDefault({
			reachedRange: 1,
			getEnergy: () => {
				return false;
			},
		});
		// this allows us to get energy in the same tick if a behaviour defines this strategy
		// used in behaviour.miner
	}

	maxPerTarget = 3;
	maxPerAction = 3;
	targetRange = 3;

	reachedRange = creep => {
		return creep.getStrategyHandler([this.name], 'reachedRange', creep);
	};

	isValidAction = creep => {
		return creep.carry.energy > 0;
	};
	isAddableAction = creep => {
		return (
			!creep.room.population ||
			!creep.room.population.actionCount[this.name] ||
			creep.room.population.actionCount[this.name] < this.maxPerAction
		);
	};
	isValidTarget = target => {
		return (
			target != null &&
			(target.my || Task.reputation.allyOwner(target)) &&
			target.progress &&
			target.progress < target.progressTotal
		);
	};
	isAddableTarget = target => {
		//  our site?
		return (
			target &&
			(target.my || Task.reputation.allyOwner(target)) &&
			(!target.targetOf || target.targetOf.length < this.maxPerTarget)
		);
	};
	newTarget = creep => {
		let isAddable = target => this.isAddableTarget(target, creep);
		return creep.room.getBestConstructionSiteFor(creep.pos, isAddable);
	};
	work = creep => {
		creep.getStrategyHandler([this.name], 'getEnergy', creep);
		return creep.build(creep.target);
	};
}

export default new BuildingAction();
