import {isFull} from '../_util'
import {attack, transfer, pickup, repair,withdraw} from '../action'
export default (creep, newRoom) => {
	const room = Game.spawns['Spawn1'].room;
	const newRoomMemory = newRoom.memory;
	const enemy = newRoomMemory.creeps.enemy;
	let target;
	// memory
	isFull(creep);
	// run
	if (enemy.length > 0) {
		target = creep.pos.findClosestByRange(enemy);
		if (attack(creep, target)) return;
	}

	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if (pickup(creep, target[0])) return;
		}
		target = newRoom.memory.structures.container;
		if (withdraw(creep, target)) return;
	} else {
		const needFix = newRoom.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if (repair(creep, target)) return;
		}
		if (transfer(creep, room.storage)) return;
	}
}