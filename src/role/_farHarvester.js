import { fullCheck, targetMaker, targetChanger,targetFormat } from '../_util'
import { findClosestInRange, transfer, pickup, withdraw } from '../action'
export default (creep, roomName) => {
	// state
	const isFull = fullCheck(creep);
	const store = targetFormat(creep.room.memory.flags.store);
	// target
	let target;

		target =  _.first(_.filter(Memory.rooms[roomName].structures.container,container => container.id != '58da68e6b6335f86219c4717'))

	targetMaker(creep,target, 'withdraw')
	// run
	if (!isFull) {
		if (pickup(creep, findClosestInRange(creep, creep.room.memory.dropped.energy, 4))) return;
		console.log(creep.memory.target.withdraw.id)
		if (withdraw(creep, creep.memory.target.withdraw)) return
	} else {
		if (creep.pos.roomName == creep.memory.target.withdraw.pos.roomName) {
			if (store && transfer(creep, store, store.store.energy < store.storeCapacity))return;
			const spawn = Memory.rooms[roomName].structures.spawn
			if (spawn && transfer(creep, spawn, spawn.energy < spawn.energyCapacity)) return;
		} else {
			targetChanger(creep,target, 'withdraw')
		}
		if (transfer(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
}