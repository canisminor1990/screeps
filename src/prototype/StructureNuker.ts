Object.defineProperties(StructureNuker.prototype, {
	getNeeds: {
		value(resourceType: string): number {
			if (!this.room.isCriticallyFortifyable) {
				if (resourceType == RESOURCE_ENERGY && this.energy < this.energyCapacity) {
					return this.energyCapacity - this.energy;
				}
				if (resourceType == RESOURCE_GHODIUM && this.ghodium < this.ghodiumCapacity) {
					return this.ghodiumCapacity - this.ghodium;
				}
				return 0;
			}
			if (!this.room.memory.resources || !this.room.memory.resources.nuker) return 0;
			let loadTarget = 0;
			let unloadTarget = 0;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.nuker.find(s => s.id == this.id);
			if (containerData) {
				let order = containerData.orders.find(o => {
					return o.type == resourceType;
				});
				if (order) {
					let amt = 0;
					if (resourceType == RESOURCE_ENERGY) amt = this.energy;
					else if (resourceType == RESOURCE_GHODIUM) amt = this.ghodium;
					loadTarget = Math.max(order.orderRemaining + amt, order.storeAmount);
					unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
				}
			}
			let store = 0;
			let space = 0;
			if (resourceType == RESOURCE_ENERGY) {
				store = this.energy;
				space = this.energyCapacity - this.energy;
			} else if (resourceType == RESOURCE_GHODIUM) {
				store = this.ghodium;
				space = this.ghodiumCapacity - this.ghodium;
			}
			if (store < loadTarget) return Math.min(loadTarget - store, space);
			if (store > unloadTarget * 1.05) return unloadTarget - store;
			return 0;
		},
	},
});
