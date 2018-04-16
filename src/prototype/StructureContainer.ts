Object.defineProperties(StructureContainer.prototype, {
	active: {
		value: true,
	},
	sum: {
		get(): number {
			if (_.isUndefined(this._sum) || this._sumSet != Game.time) {
				this._sumSet = Game.time;
				this._sum = _.sum(this.store);
			}
			return this._sum;
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			if (!this.room.memory.resources) return 0;

			// look up resource and calculate needs
			let containerData = this.room.memory.resources.container.find(s => s.id == this.id);
			if (containerData) {
				let order = containerData.orders.find(o => {
					return o.type == resourceType;
				});
				if (order) {
					let loadTarget = Math.max(order.orderRemaining + (this.store[resourceType] || 0), order.storeAmount);
					let unloadTarget = order.orderAmount + order.storeAmount;
					if (unloadTarget < 0) unloadTarget = 0;
					let store = this.store[resourceType] || 0;
					if (store < loadTarget) return Math.min(loadTarget - store, this.storeCapacity - this.sum);
					if (store > unloadTarget * 1.05) return unloadTarget - store;
				}
			}
			return 0;
		},
	},
});
