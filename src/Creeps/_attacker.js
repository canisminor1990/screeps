import {attack, findClosestByRange, moveTo, isNearTo} from  '../Action'
export default (creep) => {
	// target
	let attackTarget;
	if (creep.room.name !== creep.memory.roomName) {
		attackTarget = Memory.tasks[creep.memory.roomName].attack[0]
		if (moveTo(creep, attackTarget))return;
	} else {
		attackTarget = findClosestByRange(creep, Memory.tasks[creep.memory.roomName].attack)
	}
	if (attack(creep, attackTarget))return;
	if (!attackTarget) {
		let spawn = Memory.rooms[creep.memory.bornRoom].structures.my.spawn[0];
		if (!isNearTo(creep, spawn)) {
			if (moveTo(creep, spawn))return
		} else {
			spawn.recycleCreep(creep)
		}
		
	}
}