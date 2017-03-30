import {fullCheck, targetMaker, targetChanger, targetFormat} from '../_util'
import {findInRange, pickup, withdraw, upgradeController} from '../action'
export default (creep, roomName) => {
	// state
	const ifFull = fullCheck(creep);
	// target
	targetMaker(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
	// task
	if (!ifFull) {
		try {
			if (pickup(creep, findInRange(creep, creep.room.memory.dropped.energy, 2)[0])) return;
			const store = targetFormat(creep.room.memory.flags.store, target => target.structureType != STRUCTURE_ROAD);
			if (store) {
				try {
					if (store && withdraw(creep, store, store.store.energy > 0))return;
				} catch (e) {
					console.log(e)
				}
			}
			if (withdraw(creep, Memory.rooms[roomName].structures.spawn)) return;
			if (withdraw(creep, Memory.rooms[roomName].structures.container[0])) return;
			if (withdraw(creep, creep.memory.target.withdraw)) return;
		}catch (e){}
	} else {
		targetChanger(creep, Memory.rooms[roomName].structures.container[0], 'withdraw')
		if (upgradeController(creep, creep.room.controller)) return;
	}
}