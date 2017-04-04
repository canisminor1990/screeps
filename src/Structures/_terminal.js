import {Console} from '../_util'
export default (terminal) => {
	if (terminal.store.energy < 10000) return
	const room   = "W81S67",
	      amount = 1000,
	      orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
	_.forEach(orders, order => {
		const pay = order.price * amount,
		      fee = Game.market.calcTransactionCost(amount, room, order.roomName);
		if (fee < amount * 1.5 && order.price >= 0.02) {
			if (Game.market.deal(order.id, amount) == OK) {
				Console.succeed('Market', `Pay: ${pay}(${order.price})`, `Fee: ${fee}`, `Amount: ${amount}/${order.amount}`)
			}
		}
	})
}