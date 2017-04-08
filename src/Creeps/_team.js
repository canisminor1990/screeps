import {attack, moveTo} from  '../Action'
export default (creep) => {
	// target
	// const roomName = 'W81S65'
	// creep.move(TOP)
	// try {
	// 	const attackTarget = Game.getObjectById('58d1196f9f9ea1683142ac81')
	// 	if (attack(creep, attackTarget))return;
	// } catch (e) {
	// 	if (creep.move(TOP) == OK)return;
	// }
	const attackTarget = Game.getObjectById('58d1754e6dc0fb7f03e88991')
	attack(creep, attackTarget)
}