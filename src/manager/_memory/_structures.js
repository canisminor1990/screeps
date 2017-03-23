export default (room, config) => {

	const structures          = room.find(FIND_STRUCTURES),
	      structuresStorage   = room.storage,
	      structuresMy        = _.filter(structures, structure => structure.my),
	      structuresOther     = _.filter(structures, structure => !structure.my),
	      structuresContainer = _.filter(structuresOther, structure => structure.structureType == STRUCTURE_CONTAINER),
	      structuresDocker    = structuresContainer.push(structuresStorage);

	return {
		terminal   : room.terminal,
		controller : room.controller,
		storage    : structuresStorage,
		tower      : _.filter(structuresMy, structure => structure.structureType == STRUCTURE_TOWER)[0],
		spawn      : _.filter(structuresMy, structure => structure.structureType == STRUCTURE_SPAWN)[0],
		container  : _.filter(structuresOther, structure => structure.structureType == STRUCTURE_CONTAINER),
		canWithdraw: _.filter(structuresDocker, structure => structure.store.energy > 0),
		canFill    : _.filter(structuresDocker, structure => structure.store.energy < structure.storeCapacity),
		needFill   : _.filter(structuresMy, structure => (
		                                                 structure.structureType == STRUCTURE_EXTENSION ||
		                                                 structure.structureType == STRUCTURE_SPAWN ||
		                                                 structure.structureType == STRUCTURE_TOWER ) &&
		                                                 structure.energy < structure.energyCapacity),
		needFix    : _.filter(structures, structure =>
		( structure.my || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL ) &&
		(structure.hits / structure.hitsMax) < config.repair.percent && structure.hits < config.repair.maxHits),
		needBuild  : room.find(FIND_MY_CONSTRUCTION_SITES),
	}
}