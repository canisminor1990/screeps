import {pathFinder} from "../task"
export default (creep,newRoom) => {
	"use strict";
	const controller = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!controller) {
        pathFinder(creep,newRoom)
	} else {
		(creep.reserveController(controller) !== OK) ? pathFinder(creep,controller) : null;
	}

}