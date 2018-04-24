class StructureStorageExtend extends StructureStorage {
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

	get sum(): number {
		return this.cache('sum', () => _.sum(this.store), true);
	}

	get charge(): number {
		// TODO per-room strategy
		const rcl = this.room.RCL;
		return Util.chargeScale(this.store.energy, MIN_STORAGE_ENERGY[rcl], MAX_STORAGE_ENERGY[rcl]);
	}

	getNeeds(resourceType: string): number {
		let ret = 0;
		if (!this.room.memory.resources) return 0;

		const storageData = this.room.memory.resources.storage[0];
		// look up resource and calculate needs
		let order = null;
		if (storageData)
			order = storageData.orders.find((o: obj) => {
				return o.type === resourceType;
			});
		if (!order) order = { orderAmount: 0, orderRemaining: 0, storeAmount: 0 };
		const rcl = this.room.RCL;
		const loadTarget = Math.max(
			order.orderRemaining + (this.store[resourceType] || 0),
			order.storeAmount + (resourceType === RESOURCE_ENERGY ? MIN_STORAGE_ENERGY[rcl] : MAX_STORAGE_MINERAL),
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
	}
}

Util.define(StructureStorage, StructureStorageExtend);
