import {Console} from '../_util'
import Config from '../config'
export default (terminal) => {
	const room   = "W81S67",
	      amount = Config.terminal.amount;
	if (terminal.store.energy < amount * (1 + Config.terminal.fee)) return
	const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
	_.forEach(orders, order => {
		const pay = order.price * amount,
		      fee = Game.market.calcTransactionCost(amount, room, order.roomName);
		if (fee < amount * Config.terminal.fee && order.price >= Config.terminal.price) {
			console.log(Game.market.deal(order.id, amount))
			if (Game.market.deal(order.id, amount) == OK) {
				Console.succeed('Market', `Pay: ${pay}(${order.price})`, `Fee: ${fee}`, `Amount: ${amount}/${order.amount}`)
			}
		}
	})
}