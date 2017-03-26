import {claimController, moveTo} from '../action'
export default (creep,newRoom) => {

	const target = Game.getObjectById('5873bc1d11e3e4361b4d7140');
	if (!target) {
		moveTo(creep, newRoom.pos)
		return;
	} else {
		if (claimController(creep, target))return;
	}
}