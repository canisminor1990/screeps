import {isFull} from '../_util'
import {attack, transfer} from '../action'
import {pathFinder} from '../task'
export default (creep, newRoom) => {
	const room = Game.spawns['Spawn1'].room;
	const newRoomMemory = newRoom.memory;
	const farMiner = newRoomMemory.creeps.my.farMiner;
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
		target = Game.getObjectById(farMiner[0].id);
		pathFinder(creep, target)
	}
	else {
		if (transfer(creep, room.storage)) return;
	}
}