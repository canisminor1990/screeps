Object.defineProperties(StructureStorage.prototype, {
	sum: {
		get(): number {
			if (_.isUndefined(this._sum) || this._sumSet !== Game.time) {
				this._sumSet = Game.time;
				this._sum = _.sum(this.store);
			}
			return this._sum;
		},
	},
	charge: {
		get(): number {
			// TODO per-room strategy
			return Util.chargeScale(
				this.store.energy,
				MIN_STORAGE_ENERGY[this.room.controller.level],
				MAX_STORAGE_ENERGY[this.room.controller.level],
			);
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			let ret = 0;
			if (!this.room.memory.resources) return 0;

			let storageData = this.room.memory.resources.storage[0];
			// look up resource and calculate needs
			let order = null;
			if (storageData)
				order = storageData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
			if (!order) order = { orderAmount: 0, orderRemaining: 0, storeAmount: 0 };
			let rcl = this.room.controller.level;
			let loadTarget = Math.max(
				order.orderRemaining + (this.store[resourceType] || 0),
				order.storeAmount +
					(resourceType === RESOURCE_ENERGY ? MIN_STORAGE_ENERGY[rcl] : MAX_STORAGE_MINERAL),
			);
			// storage always wants energy
			let unloadTarget =
				resourceType === RESOURCE_ENERGY
					? this.storeCapacity - this.sum + this.store.energy
					: order.orderAmount + order.storeAmount + MAX_STORAGE_MINERAL;
			if (unloadTarget < 0) unloadTarget = 0;
			let store = this.store[resourceType] || 0;
			if (store < loadTarget) ret = Math.min(loadTarget - store, this.storeCapacity - this.sum);
			else if (store > unloadTarget * 1.05) ret = unloadTarget - store;
			return ret;
		},
	},
});
