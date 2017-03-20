export default (creep) => {
	"use strict";
	const controller = Game.getObjectById('5873bc3511e3e4361b4d738f');

	if (!controller) {
		creep.moveTo(new RoomPosition(27, 21, 'W81S66'), {
			reusePath         : 8,
			visualizePathStyle: {stroke: '#ffffff'}
		})
	} else {
		(creep.reserveController(controller) == ERR_NOT_IN_RANGE) ? creep.moveTo(controller, {
			                                                          reusePath         : 8,
			                                                          visualizePathStyle: {stroke: '#ffffff'}
		                                                          }) : null;
	}

}