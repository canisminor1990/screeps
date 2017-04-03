import {pickup, transfer, withdraw,moveTo,findInRange} from  '../Action'
import {Is} from  '../_util'
export default (creep) => {
	const roonName = creep.memory.roomName;
	const isFull   = Is.full(creep);
	//
	let pickTarget = Memory.tasks[roonName].pickup
	const storage  = Game.rooms[creep.memory.bornRoom].storage
	// run
	if (isFull) {
		if (!storage) {
			if (transfer(creep, Memory.tasks[roonName].transfer))return
		} else {
			if (transfer(creep, storage))return
		}
	} else {
		if (creep.room.name !== creep.memory.roomName) {
			pickTarget = Memory.tasks[creep.memory.roomName].pickup[0];
			if (moveTo(creep, pickTarget))return
		}
		let target = findInRange(Memory.tasks[creep.memory.roomName].withdraw,2)
		console.log(target)
		if (withdraw(creep,target))return
		if (pickup(creep, pickTarget))return
	}
	if (_.sum(creep.carry) > 0 && transfer(creep, storage))return
}