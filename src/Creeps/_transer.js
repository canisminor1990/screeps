import {pickup, moveTo, transfer, findInRange, withdraw} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName     = creep.memory.roomName;
	const isFull       = Is.full(creep);
	// target
	let withdrawTarget = creep.memory.target.withdraw
	// run
	const storage      = Game.rooms[creep.memory.bornRoom].storage
	if (isFull) {
		if (creep.memory.roomType == 'extra' && creep.room.name == creep.memory.bornRoom) {
			let link = findInRange(creep, creep.room.memory.structures.my.link, 3)
			if (link.length > 0) {
				if (transfer(creep, link))return
			}
		}
		if (creep.memory.roomType == 'extra') {
			if (moveTo(creep, storage) && transfer(creep, storage))return
		}
		if (!storage) {
			if (transfer(creep, Memory.tasks[roonName].transfer))return
		} else {
			if (transfer(creep, storage))return
		}
	} else {
		if (creep.room.name !== creep.memory.roomName) {
			withdrawTarget = Memory.tasks[creep.memory.roomName].withdraw[0]
			if (moveTo(creep, withdrawTarget))return
		}
		if (pickup(creep, findInRange(creep, Memory.tasks[roonName].pickup, 4))) return
		if (withdraw(creep, withdrawTarget))return
	}
}