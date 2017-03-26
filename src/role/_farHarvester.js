import {isFull} from '../_util'
import {attack, transfer, pickup, moveTo, withdraw} from '../action'
export default (creep, newRoom) => {
	const room = Game.spawns['Spawn1'].room;
	let target;
	// memory
	isFull(creep);
	// run
	const enemy = newRoom.memory.creeps.enemy;
	if (enemy.length > 0) Memory.if.noEnemy = false;
	
	if (!creep.memory.full) {
		const dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if (pickup(creep, target[0])) return;
		}
		target = newRoom.memory.structures.canWithdraw;
		if (withdraw(creep, target[0])) return;
		const farMiner = newRoom.memory.creeps.my.farMiner;
		if (farMiner.length > 0) {
			target = Game.getObjectById(farMiner[0].id);
			moveTo(creep, target);
			return;
		}
	} else {
		if (transfer(creep, room.storage)) return;
	}
}