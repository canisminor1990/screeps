import { pathFinder }from '../task'
export default (creep) => {

	if (creep.carry.energy < creep.carryCapacity) {
		const source = creep.room.memory.source[creep.memory.source];
		const pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 0);
		if (pickup.length > 0 && creep.pickup(pickup[0]) == OK) {
			creep.say('pickup')
		} else {
			(creep.harvest(source) == ERR_NOT_IN_RANGE) ?
			pathFinder(creep, source) : null;
		}
	}
	if (creep.carry.energy >= 50) {


			const targetsContainer = creep.pos.findInRange(FIND_STRUCTURES, 6, {filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity})[0]
			if (targetsContainer) {
				if (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetsContainer, {reusePath: 8, visualizePathStyle: {stroke: '#ffffff'}});
				}
			} else {
				const targetsBuild = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 6)[0]
				if (creep.build(targetsBuild) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetsBuild, {visualizePathStyle: {reusePath: 8, stroke: '#ffffff'}});
				}
			}
		}

}
