// Sell
Game.market.createOrder(ORDER_SELL, 'energy', 0.02, 20000, 'roomName')
// Buy
Game.market.createOrder(ORDER_BUY, 'energy', 0.02, 20000, 'roomName')
// Extend
Game.market.extendOrder('id',20000)
// Deal
Game.market.deal('id', 2000, 'roomName')