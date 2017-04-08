import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName     = 'W81S65'
	const attackTarget = '58d17513bc53f3be7a81e407'
	if (creep.room.name !== roomName) {
		if (moveTo(creep, new RoomPosition(24, 48, roomName)))return;
	} else {
		if (attack(creep, attackTarget))return;
	}
}