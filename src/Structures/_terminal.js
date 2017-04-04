import {Console} from '../_util'
export default (terminal) => {
	// let price  = 0.03,
	//     amount = 10000;
	// if (terminal.store.energy < 10000) return
	// if (_.isEmpty(Game.market.orders)) {
	// 	console.log(amount*pirce)
	// 	console.log(Game.market.createOrder(ORDER_SELL, RESOURCE_ENERGY, price, amount))
	// }
	const room   = "W81S67"
	const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
	let orderFee = []
	_.forEach(orders, order => {
		const pay = order.price * 1000,
		      fee = Game.market.calcTransactionCost(1000, room, order.roomName);
		if (fee < 1500 && order.price >= 0.02) {
			console.log(Game.market.deal(order.id, 1000))
			// if (Game.market.deal(order.id, 1000) == OK) {
			// 	Console.succeed('Market', `Pay: ${pay}(${order.price})`, `Fee: ${fee}`, `Amount: ${order.amount}`)
			// }
		}
	})
}