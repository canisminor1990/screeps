import {Console} from '../_util'
import Config from '../config'
export default (terminal) => {
	const room   = "W81S67",
	      amount = Config.terminal.amount;
	if (terminal.store.energy < amount * (1 + Config.terminal.fee)) return
	const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
	let list     = []
	_.forEach(orders, order => {
		const fee = Game.market.calcTransactionCost(amount, room, order.roomName);
		
		let trade      = amount * (1 + Config.terminal.fee) / Config.terminal.price,
		    orderTrade = (fee + amount) / order.price,
		    ifTrade    = (orderTrade < trade) ? true : false;
		if (ifTrade) {
			list.push({
				id    : order.id,
				price : order.price,
				fee   : fee,
				amount: order.amount,
				sort  : orderTrade
			})
		}
	})
	if (list.length > 0) {
		list              = _.sortBy(list, 'sort')
		// console.log(JSON.stringify(list, null, 2))
		list              = list[0]
		const finalAmount = (amount < list.amount) ? amount : list.amount;
		Console.succeed('Market',
			`Pay: ${list.price * Config.terminal.amount}(${list.price})`,
			`Fee: ${list.fee}`, `Amount: ${finalAmount}/${list.amount}`,
			Game.market.deal(list.id, finalAmount, room)
		)
	}
}