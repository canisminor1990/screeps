import { isFull } from '../_util'
import { pickup, upgradeController, build, withdraw, repair, dismantle, findClosestByRange,findClosestInRange } from '../action'

export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	// target = creep.room.memory.flags.dismantle
	// if (target.length > 0, target[0] != null) {
	// 	if (dismantle(creep, target[0]))return
	// }
	if (creep.memory.full) {
		target = findClosestByRange(creep, creep.room.memory.structures.needBuild);
		if (build(creep, target))return;
		target = findClosestByRange(creep, creep.room.memory.structures.needFix);
		if (repair(creep, target)) return;
		target = creep.room.controller;
		if (upgradeController(creep, target)) return;
	} else {
		target = findClosestInRange(creep, creep.room.memory.dropped.energy, 2);
		if (pickup(creep, target[0])) return;
		target = creep.room.storage;
		if (withdraw(creep, target))return;
	}
}