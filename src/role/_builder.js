import {isFull} from '../_util'
import {pickup, upgradeController, build, withdraw} from '../action'

export default (creep) => {
	const needBuild = creep.memory.structures.needBuild;
	let target;
	// memory
	isFull(creep)
	// run
	if (creep.memory.full) {
		if (needBuild.length > 0) {
			target = creep.pos.findClosestByRange(needBuild);
			if (build(creep, target))return;
		} else {
			target = creep.room.controller;
			if (upgradeController(creep, target)) return;
		}
	} else {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 3);
			if (pickup(creep, target[0])) return;
		}
		target = creep.room.storage;
		if (withdraw(creep, target))return;
	}
}