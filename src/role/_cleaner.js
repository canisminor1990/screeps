import { isFull } from '../_util'
import { pickup, transfer, withdraw } from '../action'

export default (creep) => {
	let target;
	let dropped = creep.room.memory.dropped.energy;
	if (dropped.length > 0) {
		target = creep.pos.findInRange(dropped, 5);
		if (pickup(creep, target[0])) return;
	}
};
