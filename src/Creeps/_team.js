import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName = 'W81S65'
	
	moveTo(creep,Game.flags['pos'])
	// try {
	// 	const attackTarget = Game.getObjectById('58d175038851a6135b3c2751')
	// 	if (attack(creep, attackTarget))return;
	// } catch (e) {
	// 	if (creep.moveTo(new RoomPosition(25, 48, roomName)) == OK)return;
	// }
}