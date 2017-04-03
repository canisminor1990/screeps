import {pickup, build, repair, findInRange, withdraw, upgradeController, transfer, moveTo} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName    = creep.memory.roomName;
	const isFull      = Is.full(creep);
	// target
	let builderTarget = Memory.tasks[roonName].build
	if (isFull) {
		if (creep.carry.energy == 0) transfer(creep, creep.room.storage);
		
			if (creep.room.name !== creep.memory.roomName) {
				let target = Memory.tasks[creep.memory.roomName].build[0];
				if (!target) target = Memory.tasks[creep.memory.roomName].repair[0];
				if (moveTo(creep, target))return
			}
		
		if (build(creep, builderTarget))return
		if (creep.room.memory.structures.my.tower.length > 0) {
			if (repair(creep, findInRange(creep, Memory.tasks[roonName].repair, 4)))return
		} else {
			if (repair(creep, Memory.tasks[roonName].repair))return
		}
		if (upgradeController(creep, Memory.tasks[roonName].upgrade))return
	} else {
		if (creep.room.name == creep.memory.roomName && creep.memory.roomType == "extra") {
			if (withdraw(creep, Memory.tasks[roonName].withdraw, false))return
		}
		const storage = Game.rooms[creep.memory.bornRoom].storage
		if (storage && storage.store.energy > 0) {
			if (withdraw(creep, storage, false))return
		} else {
			if (withdraw(creep, Memory.tasks[roonName].withdraw, false))return
		}
	}
}