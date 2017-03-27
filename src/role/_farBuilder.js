import {isFull} from '../_util'
import {moveTo,withdraw, build, pickup, transfer,repair} from '../action'
export default (creep, newRoom) => {
	if(!newRoom.memory || !newRoom.memory.structures) return;
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
			moveTo(creep, newRoom.pos)
			return
		}
	} else {
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