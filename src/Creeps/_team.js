import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName = 'W81S65'
	
	if (creep.room.name == roomName) {
		creep.moveTo(25, 48)
	}
	try {
		const attackTarget = Game.getObjectById('58d175038851a6135b3c2751')
		if (attack(creep, attackTarget))return;
	} catch (e) {
		if (creep.moveTo(new RoomPosition(25, 48, roomName)) == OK)return;
	}
}