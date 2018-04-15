Object.defineProperties(StructurePowerSpawn.prototype, {
	getNeeds: {
		value(resourceType: string): number {
			// if parameter is enabled then autofill powerSpawns
			if (FILL_POWERSPAWN && !this.room.isCriticallyFortifyable) {
				if (resourceType === RESOURCE_ENERGY && this.energy < this.energyCapacity * 0.75) {
					return this.energyCapacity - this.energy;
				}
				if (resourceType === RESOURCE_POWER && this.power < this.powerCapacity * 0.25) {
					return this.powerCapacity - this.power;
				}
				return 0;
			}
			if (!this.room.memory.resources || !this.room.memory.resources.powerSpawn) return 0;
			let loadTarget = 0;
			let unloadTarget = 0;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.powerSpawn.find((s: obj) => s.id === this.id);
			if (containerData) {
				let order = containerData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
				if (order) {
					let amt = 0;
					if (resourceType === RESOURCE_ENERGY) amt = this.energy;
					else if (resourceType === RESOURCE_POWER) amt = this.power;
					loadTarget = Math.max(order.orderRemaining + amt, order.storeAmount);
					unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
				}
			}
			let store = 0;
			let space = 0;
			if (resourceType === RESOURCE_ENERGY) {
				store = this.energy;
				space = this.energyCapacity - this.energy;
			} else if (resourceType === RESOURCE_POWER) {
				store = this.power;
				space = this.powerCapacity - this.power;
			}
			if (store < loadTarget) return Math.min(loadTarget - store, space);
			if (store > unloadTarget * 1.05) return unloadTarget - store;
			return 0;
		},
	},
});
