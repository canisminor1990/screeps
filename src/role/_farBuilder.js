import {isFull} from '../_util'
import {withdraw, build, pickup, transfer} from '../action'
export default (creep, newRoom) => {
	const needBuild = creep.room.memory.structures.needBuild;
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
			target = Game.spawns['Spawn1'].room.storage;
			if (withdraw(creep, target))return;
		} else {
			target = creep.pos.findClosestByRange(needBuild);
			if (build(creep, target))return;
		}
	} else {
		const room = Game.spawns['Spawn1'].room;
		const newRoomMemory = newRoom.memory;
		const farMiner = newRoomMemory.creeps.my.farMiner;

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
			target = room.storage
			if (transfer(creep, target)) return;
		}
	}
}