import { pathFinder } from "../task";
export default (creep) => {
	"use strict";
	const controller = Game.getObjectById('5873bc3511e3e4361b4d738f');

	if (!controller) {
		creep.moveTo(new RoomPosition(27, 21, 'W81S66'))
	} else {
		(creep.reserveController(controller) == ERR_NOT_IN_RANGE) ? creep.moveTo(controller) : null;
	}

}