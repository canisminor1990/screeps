import { isFull } from '../_util'
import { attack, transfer, pickup, moveTo, withdraw } from '../action'
export default (creep, newRoom) => {
	let target;
	// memory
	isFull(creep);
	// run
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if (pickup(creep, target[0])) return;
		}
		if (newRoom || newRoom.memory || newRoom.memory.structures || newRoom.memory.structures.canWithdraw) {
			target = newRoom.memory.structures.canWithdraw;
			if (withdraw(creep, target[0])) return;
		}
		const farMiner = newRoom.memory.creeps.my.farMiner;
		if (farMiner.length > 0) {
			target = Game.getObjectById(farMiner[0].id);
			moveTo(creep, target);
			return;
		}
	} else {
		target = Game.getObjectById('58d07b35bfeec6256575be5d')
		if (transfer(creep, target)) return;
	}
}