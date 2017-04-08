import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName = 'W81S65'
	
	try {
		const attackTarget = Game.getObjectById('58d175038851a6135b3c2751')
		if (attack(creep, attackTarget))return;
	} catch (e) {
		if (creep.move(TOP) == OK)return;
	}
}