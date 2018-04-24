class StructureContainerExtend extends StructureContainer {
	constructor() {}

	/// ///////////////////////////////////////////////////////////////////
	// cache
	/// ///////////////////////////////////////////////////////////////////

	private cache(key: string, func: Function, checkTime: boolean): any {
		if (checkTime) {
			if (_.isUndefined(this[`_${key}`]) || this[`_${key}Set`] !== Game.time) {
				this[`_${key}Set`] = Game.time;
				this[`_${key}`] = func();
			}
		} else {
			if (_.isUndefined(this[`_${key}`])) {
				this[`_${key}`] = func();
			}
		}

		return this[`_${key}`];
	}

	/// ///////////////////////////////////////////////////////////////////
	// extend
	/// ///////////////////////////////////////////////////////////////////

	active: boolean = true;

	get sum(): number {
		return this.cache('sum', () => _.sum(this.store), true);
	}

	getNeeds(resourceType: string): number {
		if (!this.room.memory.resources) return 0;

		// look up resource and calculate needs
		let containerData = this.room.memory.resources.container.find((s: obj) => s.id == this.id);
		if (containerData) {
			let order = containerData.orders.find((o: obj) => {
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
	}
}

Util.define(StructureContainer, StructureContainerExtend);
