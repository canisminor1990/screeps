import * as moment from 'moment';

StructureTerminal.prototype._send = StructureTerminal.prototype.send;

class StructureTerminalExtend extends StructureTerminal {
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

	send(resourceType: ResourceConstant, amount: number, destination: string, description?: string): ScreepsReturnCode {
		const cb: ScreepsReturnCode = this._send(resourceType, amount, destination, description);
		if (cb === OK) {
			if (!Memory.send) Memory.send = [];
			if (Memory.send.length > 20) Memory.send.shift();
			Memory.send.push({
				time: moment().format(),
				from: this.room.name,
				to: destination,
				type: resourceType,
				amount: amount,
			});
		}
		return cb;
	}

	get sum(): number {
		return this.cache('sum', () => _.sum(this.store), true);
	}

	get charge(): number {
		const needs = this.getNeeds(RESOURCE_ENERGY);
		const terminalTarget = needs ? this.store[RESOURCE_ENERGY] + needs : TERMINAL_ENERGY;
		return Util.chargeScale(this.store.energy, terminalTarget, terminalTarget * 2);
	}

	getNeeds(resourceType: string): number {
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
		let unloadTarget = order.orderAmount + order.storeAmount + (resourceType === RESOURCE_ENERGY ? TERMINAL_ENERGY : 0);
		if (unloadTarget < 0) unloadTarget = 0;
		let store = this.store[resourceType] || 0;
		if (store < loadTarget) ret = Math.min(loadTarget - store, this.storeCapacity - this.sum);
		else if (store > unloadTarget * 1.05) ret = unloadTarget - store;
		return ret;
	}
}

Util.define(StructureTerminal, StructureTerminalExtend);
