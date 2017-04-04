export default (terminal) => {
	if (terminal.store.energy < 10000) return
	if (_.isEmpty(Game.market.orders)){
		console.log(1)
	}else {
		console.log(2)
	}
	
	Game.market.createOrder(ORDER_SELL, RESOURCE_ENERGY, 0.04, 10000)
}