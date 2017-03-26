import {claimController, moveTo} from '../action'
export default (creep) => {
	const newRoom = {
		pos   : new RoomPosition(25, 47, 'W82S67'),
		memory: (Game.rooms['W82S67']) ? Game.rooms['W82S67'].memory : {}
	};
	//
	// const enemy = newRoom.memory.creeps.enemy;
	// if (enemy.length > 0) Memory.if.noEnemy = false;
	//
	const target = Game.getObjectById('5873bc1d11e3e4361b4d7140');
	if (!target) {
		moveTo(creep, newRoom.pos)
		return;
	} else {
		if (claimController(creep, target))return;
	}
}