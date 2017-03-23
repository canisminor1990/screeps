import {isFull} from '../_util'
import {attack, transfer, pickup, repair} from '../action'
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
		target = _.filter(newRoom.memory.structures.container,
				container => container.id != '58d31e9dbbb5793fe9d0ad71' &&
				container.store.energy > 0
		).sort((a, b) => b.store.energy - a.store.energy)
		if (withdraw(creep, target[0])) return;
	} else {
		const needFix = newRoom.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if (repair(creep, target)) return;
		}
		if (transfer(creep, room.storage)) return;
	}
}