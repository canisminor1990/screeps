import { CreepAction } from '../Action';

class FortifyingAction extends CreepAction {
	constructor() {
		super('fortifying');
	}

	maxPerTarget = 2;
	maxPerAction = 3;
	targetRange = 3;
	isValidAction = creep => {
		return (
			creep.carry.energy > 0 && (!creep.room.storage || !creep.room.storage.active || creep.room.storage.charge > 0.6)
		);
	};
	isValidTarget = target => {
		return target && target.active && target.hits && target.hits < target.hitsMax;
	};
	newTarget = creep => {
		let isAddable = target => this.isAddableTarget(target, creep);
		return _.find(creep.room.structures.fortifyable, isAddable);
	};
	work = creep => {
		return creep.repair(creep.target);
	};
}

export default new FortifyingAction();
