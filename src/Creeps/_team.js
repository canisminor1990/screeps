import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	const roomName = 'W81S65'
	creep.move(TOP)
	try {
		const attackTarget = Game.getObjectById('58d1756c4e0586606f3144b0')
		if (attack(creep, attackTarget))return;
	} catch (e) {
		if (creep.move(TOP) == OK)return;
	}
}