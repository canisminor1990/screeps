import { CreepAction } from '../../class';

class FeedingAction extends CreepAction {
	constructor() {
		super('feeding');
	}
	maxPerTarget = 1;

	isValidAction = creep => {
		return creep.carry.energy > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable;
	};
	isValidTarget = target => {
		return target && !_.isUndefined(target.energy) && target.energy < target.energyCapacity;
	};
	isAddableTarget = target => {
		return (
			target.my && (!target.targetOf || _.filter(target.targetOf, { actionName: 'feeding' }).length < this.maxPerTarget)
		);
	};
	newTarget = creep => {
		if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
			return null;
		}
		return creep.pos.findClosestByRange(creep.room.structures.feedable, {
			filter: structure => {
				return this.isValidTarget(structure) && this.isAddableTarget(structure, creep);
			},
		});
	};
	work = creep => {
		let result = creep.transfer(creep.target, RESOURCE_ENERGY);
		if (result == OK && creep.carry.energy > creep.target.energyCapacity - creep.target.energy) {
			creep.target = null;
			this.assign(creep);
		}
		return result;
	};
}

export default new FeedingAction();
