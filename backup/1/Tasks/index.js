import build     from'./_build';
import repair    from'./_repair';
import harvest   from'./_harvest';
import pickup    from'./_pickup';
import transfer  from'./_transfer';
import withdraw  from'./_withdraw';
import attack    from'./_attack';
import heal      from'./_heal';
import upgrade   from'./_upgrade';
import dismantle from'./_dismantle';
import market from'./_market';
export default (roomGroup) => {
	if (!Memory.tasks) Memory.tasks = {}
	
	_.forEach(roomGroup, roomName => {
		const room             = Memory.rooms[roomName];
		Memory.tasks[roomName] = {
			build    : build(room) || [],
			repair   : repair(room) || [],
			harvest  : harvest(room) || [],
			pickup   : pickup(room) || [],
			transfer : transfer(room) || [],
			withdraw : withdraw(room) || [],
			attack   : attack(room) || [],
			heal     : heal(room) || [],
			upgrade  : upgrade(room) || [],
			dismantle: dismantle(room) || []
		}
		Memory.tasks.market    = market()
	})
}