import { isFull } from '../_util'
import { pickup, transfer, withdraw } from '../action'

export default (creep) => {
	let target;
	if (creep.room.memory.creeps.my.harvester.length > 0 &&
	    creep.room.memory.creeps.my.miner.length > 0) {
		// memory
		isFull(creep)
		if (!creep.memory.full) {
			let dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findClosestByRange(dropped);
				if (pickup(creep, target)) return;
			}

			target = creep.room.memory.structures.container.sort((a, b) => b.store.enengy - a.store.enengy);
			if (withdraw(creep, target)) return;
		} else {
			target = creep.room.memory.structures.needFill;
			if (target.length > 0) {
				target = creep.pos.findClosestByRange(target);
			} else {
				target = creep.room.storage
			}
			if (transfer(creep, target)) return;
		}
	} else {
		if (creep.carry.energy < 50) {
			target = creep.room.storage;
			if (withdraw(creep, target)) return;
		} else {
			target = creep.room.memory.structures.needFill;
			target = creep.pos.findClosestByRange(target);
			if (transfer(creep, target)) return;
		}
	}
};
