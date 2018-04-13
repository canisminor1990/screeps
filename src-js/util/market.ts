export const marketUtils = {
	countPrices(orderType: string, mineral: string, roomName: string): number {
		let prices = (orderType: string, mineral: string, amount: number, roomName: string) => {
			return Game.market.getAllOrders(o => {
				let transactionCost, credits;

				if (o.type !== orderType || o.resourceType !== mineral || o.amount < amount) return false;
				else {
					transactionCost = Game.market.calcTransactionCost(amount, o.roomName, roomName);
					if (transactionCost > Game.rooms[roomName].terminal.store[RESOURCE_ENERGY]) return false;
					credits = amount * o.price;
					o.transactionAmount = Math.min(o.amount, amount);
					o.ratio = (credits - transactionCost * ENERGY_VALUE_CREDITS) / o.transactionAmount;
					return true;
				}
			});
		};

		Array.prototype.sum = function() {
			return this.reduce((sum, a) => {
				return sum + Number(a);
			}, 0);
		};

		Array.prototype.average = function() {
			return this.sum() / (this.length || 1);
		};

		switch (orderType) {
			case ORDER_BUY:
				let allBuyOrders = prices(ORDER_BUY, mineral, MIN_MINERAL_SELL_AMOUNT, roomName),
					minBuyOrder = _.min(allBuyOrders, 'ratio'),
					buyOrders = _.filter(allBuyOrders, order => {
						return order.id !== minBuyOrder.id;
					}),
					buyRatios = [],
					buyRatio;

				for (let order of buyOrders) buyRatios.push(order.ratio);

				buyRatio = Util.roundUp(buyRatios.average(), 4);
				return buyRatio;

			case ORDER_SELL:
				let allSellOrders = prices(ORDER_SELL, mineral, TRADE_THRESHOLD, roomName),
					maxSellOrder = _.max(allSellOrders, 'ratio'),
					sellOrders = _.filter(allSellOrders, order => {
						return order.id !== maxSellOrder.id;
					}),
					sellRatios = [],
					sellRatio;

				for (let order of sellOrders) sellRatios.push(order.ratio);

				sellRatio = Util.roundUp(sellRatios.average(), 4);
				return sellRatio;
		}
	},
	sumCompoundType(object: obj, property: string = 'amount') {
		return _(object)
			.flatten()
			.groupBy('type')
			.transform((result, val, key) => (result[key] = _.sum(val, property)))
			.value();
	},
	roundUp(num: number, precision: number = 0): number {
		precision = Math.pow(10, precision);
		return Math.ceil(num * precision) / precision;
	},
	roundUpTo(number: number, upTo: number): number {
		if (number % upTo !== 0) number = number + upTo - number % upTo;
		return number;
	},
	orderingRoom(): Room[] {
		let myRooms = _.filter(Game.rooms, { my: true });
		const result = _.filter(myRooms, (room: Room) => {
			let data = room.memory.resources;
			if (_.isUndefined(data) || _.isUndefined(data.orders)) return false;
			if (_.isUndefined(data.boostTiming)) data.boostTiming = {};
			return data.orders.length > 0 && _.sum(data.orders, 'amount') > 0;
		});
		return result;
	},
};
