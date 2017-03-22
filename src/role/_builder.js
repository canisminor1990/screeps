import {pathFinder} from '../task'

export default (creep, needBuild, newRoom) => {

	if (creep.carry.energy == 0) {
		creep.memory.canBuild = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canBuild = true;
	}


	let newNeedBuild = newRoom.memory.structures.needBuild;
	if (creep.memory.canBuild && newNeedBuild.length > 0) {
		const newBuildTarget = creep.pos.findClosestByRange(newNeedBuild);
		(newBuildTarget && creep.build(newBuildTarget) != OK)
						? pathFinder(creep, newBuildTarget) : null;

	} else {
		let storage = Game.getObjectById('58d07b35bfeec6256575be5d');
		(creep.withdraw(storage, RESOURCE_ENERGY) != OK)
				? pathFinder(creep, storage) : null
	}
	// if (needBuild.length > 0) {
	// 	if (creep.memory.canBuild) {
	// 		const buildTarget = creep.pos.findClosestByRange(needBuild);
	// 		(buildTarget && creep.build(buildTarget) != OK)
	// 				? pathFinder(creep, buildTarget) : null;
	// 	} else {
	// 		const canWithdraw = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
	// 		(canWithdraw && creep.withdraw(canWithdraw, RESOURCE_ENERGY) != OK)
	// 				? pathFinder(creep, canWithdraw) : null
	// 	}
	// } else {
	//
	//
	// }
}