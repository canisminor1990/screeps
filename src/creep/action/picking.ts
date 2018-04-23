import { CreepAction } from '../Action';

class PickingAction extends CreepAction {
	constructor() {
		super('picking');
		this.setDefault({
			energyOnly: true,
		});
	}

	maxPerAction = 4;
	maxPerTarget = 2;
	isValidAction = creep => {
		return creep.sum < creep.carryCapacity;
	};
	isValidTarget = target => {
		return target != null && target.amount != null && target.amount > 0;
	};
	isAddableAction = creep => {
		if (creep.data.creepType.indexOf('remote') > 0) return true;
		else
			return (
				this.maxPerAction === Infinity ||
				!creep.room.population ||
				!creep.room.population.actionCount[this.name] ||
				creep.room.population.actionCount[this.name] < this.maxPerAction
			);
	};
	isAddableTarget = (target, creep) => {
		let max;
		if (creep.data.creepType.indexOf('remote') > 0) max = Infinity;
		else max = this.maxPerTarget;
		let pickers = target.targetOf ? _.filter(target.targetOf, { actionName: 'picking' }) : [];
		return (
			!target.targetOf ||
			!pickers.length ||
			(pickers.length < max && target.amount > _.sum(pickers.map(t => t.carryCapacityLeft)))
		);
	};
	newTarget = creep => {
		const droppedResources = this.getStrategy('energyOnly', creep)
			? _.filter(creep.room.droppedResources, { resourceType: RESOURCE_ENERGY })
			: creep.room.droppedResources;
		let filter;
		if (creep.room.my && creep.room.situation.invasion) {
			// pickup near sources only
			filter = r => this.isAddableTarget(r, creep) && r.pos.findInRange(creep.room.sources, 1).length > 0;
		} else {
			filter = r => this.isAddableTarget(r, creep);
		}
		return creep.pos.findClosestByPath(droppedResources, { filter: filter });
	};
	work = creep => {
		let result = creep.pickup(creep.target);
		if (result == OK) {
			if (creep.sum < creep.carryCapacity * 0.8) {
				// is there another in range?
				let loot = creep.pos.findInRange(creep.room.droppedResources, 1, {
					filter: o => o.resourceType != RESOURCE_ENERGY && this.isAddableTarget(o, creep),
				});
				if (!loot || loot.length < 1)
					loot = creep.pos.findInRange(creep.room.droppedResources, 1, {
						filter: o => this.isAddableTarget(o, creep),
					});
				if (loot && loot.length > 0) {
					this.assign(creep, loot[0]);
					return result;
				}
			}
			// Check for containers to uncharge
			if (creep.sum < creep.carryCapacity) {
				let containers = creep.pos.findInRange(creep.room.structures.container.in, 2, {
					filter: o => Creep.action.uncharging.isValidTarget(o, creep),
				});
				if (containers && containers.length > 0) {
					Creep.action.uncharging.assign(creep, containers[0]);
					return result;
				}
			}
			// unregister
			delete creep.data.actionName;
			delete creep.data.targetId;
		}
		return result;
	};
}

export default new PickingAction();
