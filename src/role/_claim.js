import { pathFinder } from "../task"
import { claimController } from '../action'
export default (creep, newRoom) => {
	const target = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!target) {
		pathFinder(creep, newRoom.pos)
		return;
	} else {
		if (claimController(creep, target))return;
	}
}