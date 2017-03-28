import { fullCheck, targetMaker, targetChanger,targetFormat } from '../_util'
import { findClosestInRange, transfer, pickup, withdraw } from '../action'
export default (creep, roomName) => {
	// state
	const isFull = fullCheck(creep);
	// target
	const targetWithdraw = _.filter(Memory.rooms[roomName].structures.container,container.id != '58da68e6b6335f86219c4717')[0]
	targetMaker(creep, targetWithdraw, 'withdraw')
	// run
	if (!isFull) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		if (withdraw(creep, creep.memory.target.withdraw)) return
	} else {
		if (creep.pos.roomName == creep.memory.target.withdraw.pos.roomName) {
			const store = targetFormat(creep.room.memory.flags.store);
			if (store && transfer(creep, store, store.store.energy < store.storeCapacity))return;
			const spawn = Memory.rooms[roomName].structures.spawn
			if (spawn && transfer(creep, spawn, spawn.energy < spawn.energyCapacity)) return;
		} else {
			targetChanger(creep, targetWithdraw, 'withdraw')
		}
		if (transfer(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
}