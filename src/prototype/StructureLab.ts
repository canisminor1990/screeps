class StructureLabExtend extends StructureLab {
	constructor() {}

	get active(): boolean {
		if (!this.room.owner) return false;
		if (this.room.owner !== this.owner.username) return false;
		if (this.room.RCL < 6) return false;
		return _.get(this.room.memory, ['structures', this.id, 'active'], true);
	}

	getNeeds(resourceType: string): number {
		if (!this.room.memory.resources) return 0;
		let loadTarget = 0;
		let unloadTarget = 0;
		let reaction = this.room.memory.resources.reactions;

		// look up resource and calculate needs
		let containerData = this.room.memory.resources.lab.find((s: obj) => s.id === this.id);
		if (containerData) {
			let order = containerData.orders.find((o: obj) => {
				return o.type === resourceType;
			});
			if (order) {
				let amt = 0;
				if (resourceType === RESOURCE_ENERGY) amt = this.energy;
				else if (resourceType === this.mineralType) amt = this.mineralAmount;
				loadTarget = Math.max(order.orderRemaining + amt, order.storeAmount);
				unloadTarget = order.orderAmount + order.storeAmount;
				if (unloadTarget < 0) unloadTarget = 0;
			}
		}
		let store = 0;
		let space = 0;
		let cap = 0;
		if (resourceType === RESOURCE_ENERGY) {
			store = this.energy;
			space = this.energyCapacity - this.energy;
			cap = this.energyCapacity;
		} else {
			if (this.mineralType === resourceType) store = this.mineralAmount;
			space = this.mineralCapacity - this.mineralAmount;
			cap = this.mineralCapacity;
		}

		if (
			containerData &&
			reaction &&
			reaction.orders.length > 0 &&
			(this.id === reaction.seed_a || this.id === reaction.seed_b) &&
			(resourceType !== LAB_REACTIONS[reaction.orders[0].type][0] ||
				resourceType !== LAB_REACTIONS[reaction.orders[0].type][1])
		) {
			if (store > unloadTarget) return unloadTarget - store;
		}

		if (store < Math.min(loadTarget, cap) / 2) return Math.min(loadTarget - store, space);
		if (containerData && containerData.reactionType === this.mineralType) {
			if (store > unloadTarget + (cap - Math.min(unloadTarget, cap)) / 2) return unloadTarget - store;
		} else {
			if (store > unloadTarget) return unloadTarget - store;
		}
		return 0;
	}
}

Util.define(StructureLab, StructureLabExtend);
