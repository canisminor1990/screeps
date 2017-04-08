import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName     = 'W81S65'
	
	try {
		const attackTarget = Game.getObjectById('58d17513bc53f3be7a81e407')
		if (attack(creep, attackTarget))return;
	} catch (e){
		if (creep.moveTo(new RoomPosition(25, 48, roomName)) == OK)return;
	}
}