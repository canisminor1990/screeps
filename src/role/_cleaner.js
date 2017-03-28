import { fullCheck } from '../_util'
import { moveTo, pickup, transfer, withdraw, findClosestByRange } from '../action'
export default (creep) => {
	let target;
	if (creep.room.name !== 'W81S67') {
		moveTo(creep, Game.spawns['Spawn1'])
		return;
	}
	// memory
	fullCheck(creep)
	// run
	const needFill = creep.room.memory.structures.needFill;
	if (!creep.memory.full) {
		target = Game.getObjectById(creep.room.memory.config.linkMain);
		if (withdraw(creep, target, target.energy > 0)) return;
		if (!needFill || needFill.length == 0) {
			target = findClosestByRange(creep, creep.room.memory.dropped.energy);
			if (pickup(creep, target)) return;
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
