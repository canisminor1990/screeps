Object.defineProperties(StructureTerminal.prototype, {
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
			const needs = this.getNeeds(RESOURCE_ENERGY);
			const terminalTarget = needs ? this.store[RESOURCE_ENERGY] + needs : TERMINAL_ENERGY;
			return Util.chargeScale(this.store.energy, terminalTarget, terminalTarget * 2);
		},
	},
	getNeeds: {
		value(resourceType: string): number {
			let ret = 0;
			if (!this.room.memory.resources) return 0;
			const terminalData = this.room.memory.resources.terminal[0];
			// look up resource and calculate needs
			let order = null;
			if (terminalData)
				order = terminalData.orders.find((o: obj) => {
					return o.type === resourceType;
				});
			if (!order) order = { orderAmount: 0, orderRemaining: 0, storeAmount: 0 };
			const loadTarget = Math.max(
				order.orderRemaining + (this.store[resourceType] || 0),
				order.storeAmount + (resourceType === RESOURCE_ENERGY ? TERMINAL_ENERGY : 0),
			);
			let unloadTarget =
				order.orderAmount + order.storeAmount + (resourceType === RESOURCE_ENERGY ? TERMINAL_ENERGY : 0);
			if (unloadTarget < 0) unloadTarget = 0;
			let store = this.store[resourceType] || 0;
			if (store < loadTarget) ret = Math.min(loadTarget - store, this.storeCapacity - this.sum);
			else if (store > unloadTarget * 1.05) ret = unloadTarget - store;
			return ret;
		},
	},
});
