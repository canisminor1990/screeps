export default (creep) => {
	"use strict";
	const targetsStorage = Game.getObjectById('58d07b35bfeec6256575be5d')
	if (targetsStorage.store['energy'] < targetsStorage.storeCapacity) {
		(creep.transfer(targetsStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ?
		creep.moveTo(targetsStorage, {reusePath: 8, visualizePathStyle: {stroke: '#3f51b5'}}) : null
	} else {
		const controller = creep.room.controller;
		(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) ?
		creep.moveTo(controller, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}}) : null
	}
}