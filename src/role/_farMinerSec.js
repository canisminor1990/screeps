// import {transfer, harvest, repair, build, pickup} from '../action'
// import {isFull} from '../_util'
// export default (creep, newRoom) => {
// 	let target;
// 	isFull(creep)
// 	//
// 	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = newRoom.memory.sources[0].source.id;
// 	//
// 	if (!creep.memory.full) {
// 		const dropped = creep.room.memory.dropped.energy;
// 		if (dropped.length > 0) {
// 			target = creep.pos.findInRange(dropped, 4);
// 			if (pickup(creep, target[0])) return;
// 		}
// 		target = Game.getObjectById(creep.memory.harvestTarget)
// 		if (harvest(creep, target)) return;
// 	} else {
// 		const needFix =  newRoom.memory.structures.needFix;
// 		if (needFix.length > 0){
// 			target = creep.pos.findClosestByRange(needFix);
// 			if (repair(creep, target)) return;
// 		}
// 		const needBuild = creep.room.memory.structures.needBuild;
// 		if (needBuild.length > 0) {
// 			target = creep.pos.findClosestByRange(needBuild);
// 			if (build(creep, target))return;
// 		}
// 		target = Game.getObjectById('58d07b35bfeec6256575be5d')
// 		if (transfer(creep, target)) return;
// 	}
// }


import {moveTo, harvest, repair, build, findInRange, findClosestInRange} from '../action'
import {isFull, targetMaker} from '../_util'
export default (creep,roomName) => {
	let target;
	isFull(creep)
	//
	targetMaker(creep, Memory.rooms[roomName].sources[0].source, 'harvest')
	//
	if (creep.memory.full) {
		target = findClosestInRange(creep, creep.room.memory.structures.container, 2);
		if (target) {
			if (!creep.pos.isEqualTo(target.pos) && moveTo(creep, target)) return;
			if (repair(creep, target, target.hits < target.hitsMax))return;
		} else {
			creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER)
		}
		if (build(creep, findInRange(creep, creep.room.memory.structures.needBuild, 0)))return;
	}
	if (harvest(creep, creep.memory.target.harvest)) return;
}
