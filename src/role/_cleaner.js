import {isFull} from '../_util'
import {moveTo, pickup, transfer, withdraw} from '../action'
export default (creep) => {
	let target;
	if (creep.room.name !== 'W81S67') {
		moveTo(creep, Game.spawns['Spawn1'])
		return;
	}
	// memory
	isFull(creep)
	// run
	let needFill = creep.room.memory.structures.needFill;
	if (!creep.memory.full) {
		target = Game.getObjectById(creep.room.memory.config.linkMain);
		if (target.energy > 0) {
			if (withdraw(creep, target)) return;
		}
		if (!needFill || needFill.length == 0) {
			const dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findClosestByRange(dropped);
				if (pickup(creep, target)) return;
			}
		}
		target = creep.room.storage;
		if (withdraw(creep, target)) return;
	} else {
		target = creep.pos.findClosestByRange(needFill);
		if (transfer(creep, target)) return;
		target = creep.room.memory.structures.tower.sort((a, b) => a.energy - b.energy)[0];
		if (target && target.energy == target.energyCapacity) {
			target = creep.room.storage;
			if (transfer(creep, target)) return;
		} else {
			if (transfer(creep, target)) return;
		}
		
	}
};
