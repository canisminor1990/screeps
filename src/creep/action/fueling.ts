import { CreepAction } from '../../class';

class FuelingAction extends CreepAction {
	constructor() {
		super('fueling');
	}

	maxPerTarget = 1;
	maxPerAction = 1;
	isValidAction = creep => {
		return creep.carry.energy > 0 && creep.room.towerFreeCapacity > 0;
	};
	isValidTarget = target => {
		return target && (target.energy || target.energy == 0) && target.active && target.energy < target.energyCapacity;
	};
	isAddableTarget = target => {
		return target.my && (!target.targetOf || target.targetOf.length < this.maxPerTarget);
	};
	newTarget = creep => {
		return creep.room.structures.fuelable.length > 0
			? creep.pos.findClosestByRange(creep.room.structures.fuelable)
			: null;
	};
	work = creep => {
		let response = creep.transfer(creep.target, RESOURCE_ENERGY);
		if (creep.target.energyCapacity - creep.target.energy < 20) creep.data.targetId = null;
		return response;
	};
}

export default new FuelingAction();
