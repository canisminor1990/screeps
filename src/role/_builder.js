import { taskFindMiner, pathFinder } from '../task'
import config from '../config'
export default (creep) => {

	if (creep.memory.building && creep.carry.energy == 0) {
		creep.memory.building = false;
	}
	if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		creep.memory.building = true;
		creep.say('[B]build');
	}

	if (creep.memory.building) {
		const targets    = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES),
		      halfBroken = creep.pos.findInRange(FIND_STRUCTURES, 5, {
			      filter: structure => config.repair(structure) &&
			                           structure.structureType != STRUCTURE_WALL &&
			                           structure.structureType != STRUCTURE_RAMPART
		      })[0];

		(halfBroken && creep.repair(halfBroken) == ERR_NOT_IN_RANGE) ?
		pathFinder(creep, halfBroken) : null;

		(targets && creep.build(targets) == ERR_NOT_IN_RANGE) ?
		pathFinder(creep, targets) : null;

	} else {
		taskFindMiner(creep)
	}
}