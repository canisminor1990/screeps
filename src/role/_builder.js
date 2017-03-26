import {isFull} from '../_util'
import {pickup, upgradeController, build, withdraw, repair, dismantle} from '../action'

export default (creep) => {
	let target;
	// memory
	isFull(creep)
	// run
	target = creep.room.memory.flags.dismantle
	if (target.length > 0) {
		target = creep.pos.findClosestByRange(target)
		dismantle(target)
	}
	if (creep.memory.full) {
		const needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findClosestByRange(needBuild);
			if (build(creep, target))return;
		}
		const needFix = creep.room.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if (repair(creep, target)) return;
		}
		target = creep.room.controller;
		if (upgradeController(creep, target)) return;
		
	} else {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if (pickup(creep, target[0])) return;
		}
		target = creep.room.storage;
		if (withdraw(creep, target))return;
	}
}