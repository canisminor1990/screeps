import {isFull} from '../_util'
import {withdraw, build, pickup, transfer,repair} from '../action'
import {pathFinder} from '../task'
export default (creep, newRoom) => {
	const room = Game.spawns['Spawn1'].room;
	const needBuild = newRoom.memory.structures.needBuild;
	let target;
	// memory
	isFull(creep)
	// run
	if (needBuild.length > 0) {
		if (!creep.memory.full) {
			const dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findInRange(dropped, 3);
				if (pickup(creep, target[0])) return;
			}
			target = room.storage;
			if (withdraw(creep, target))return;
		} else {
			target = creep.pos.findClosestByRange(needBuild);
			if (build(creep, target))return;
			pathFinder(creep, newRoom.pos)
		}
	} else {
		const farMiner = newRoom.memory.creeps.my.farMiner;
		if (!creep.memory.full) {
			const dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findInRange(dropped, 4);
				if (pickup(creep, target[0])) return;
			}
			if (farMiner.length > 0) {
				target = Game.getObjectById(farMiner[0].id);
				pathFinder(creep, target)
			}
		} else {
			const needFix =  newRoom.memory.structures.needFix;
			if (needFix.length > 0){
				target = creep.pos.findClosestByRange(needFix);
				if (repair(creep, target)) return;
			}
			target = room.storage
			if (transfer(creep, target)) return;
		}
	}
}