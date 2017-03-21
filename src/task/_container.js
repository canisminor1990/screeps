export default (creep) => {
	"use strict";
	// const targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	// 	filter: structure =>
	// 	structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity
	// });
	// if (targetsContainer) {
		// (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ?
		// 		creep.moveTo(targetsContainer, {reusePath: 8, visualizePathStyle: {stroke: '#3f51b5'}}) : null
	// } else {
		const controller = creep.room.controller;
		(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) ?
				creep.moveTo(controller, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}}) : null
	// }
}