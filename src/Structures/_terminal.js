export default (terminal) => {
	if (terminal.store.energy < 10000) return
	if (_.isEmpty(Game.market.orders)){
		console.log(Game.market.createOrder(ORDER_SELL, RESOURCE_ENERGY, 0.03, 8888))
	}
}