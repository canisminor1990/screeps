import {Console} from '../_util'
import Config from '../config'
export default (terminal) => {
	const room   = "W81S67",
	      amount = Config.terminal.amount;
	if (terminal.store.energy < amount * (1 + Config.terminal.fee)) return
	const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
	let list     = []
	_.forEach(orders, order => {
		const pay = order.price * amount,
		      fee = Game.market.calcTransactionCost(amount, room, order.roomName);
		
		let trade      = amount * (1 + Config.terminal.fee) / Config.terminal.price,
		    orderTrade = (fee + amount) / order.price,
		    ifTrade    = (orderTrade < trade) ? true : false;
		if (ifTrade) {
			list.push({
				id   : order.id,
				price: order.price,
				fee  : fee,
				sort : orderTrade
			})
			console.log(ifTrade, orderTrade, trade, fee, 1500, order.price, 0.02);
		}
		// if (fee < amount * Config.terminal.fee && order.price >= Config.terminal.price) {
		// 	Console.succeed('Market',
		// 		`Pay: ${pay}(${order.price})`,
		// 		`Fee: ${fee}`, `Amount: ${amount}/${order.amount}`,
		// 		Game.market.deal(order.id, amount, room))
		// }
	})
}