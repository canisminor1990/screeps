export default (terminal) => {
	if (terminal.store.energy < 10000) return
	console.log(Game.market.orders)
	Game.market.createOrder(ORDER_SELL, RESOURCE_ENERGY, 0.04, 10000)
}