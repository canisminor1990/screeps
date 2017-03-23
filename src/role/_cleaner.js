import {isFull} from '../_util'
import {pickup, transfer, withdraw} from '../action'
import {pathFinder} from '../task'
export default (creep) => {
	let target;
	if (creep.room.name !== 'W81S67') {
		pathFinder(creep, Game.spawns['Spawn1'])
		return;
	}
	// memory
	isFull(creep)
	// run
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findClosestByRange(dropped);
			if (pickup(creep, target)) return;
		}
		target = creep.room.storage;
		if (withdraw(creep, target)) return;
	} else {
		target = creep.room.memory.structures.needFill;
		target = creep.pos.findClosestByRange(target);
		if (transfer(creep, target)) return;
		target = creep.room.memory.structures.tower;
		if (target && target.energy == target.energyCapacity) return;
		if (transfer(creep, target)) return;
	}
};
