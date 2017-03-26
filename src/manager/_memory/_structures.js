export default (room, config) => {
	
	const structures          = room.find(FIND_STRUCTURES),
	      structuresStorage   = room.storage,
	      structuresMy        = _.filter(structures, structure => structure.my),
	      structuresOther     = _.filter(structures, structure => !structure.my),
	      structuresContainer = _.filter(structuresOther, structure => structure.structureType == STRUCTURE_CONTAINER);
	
	let structuresDocker = _.compact(structuresContainer.concat([structuresStorage]));
	
	let needFix = _.filter(structures, structure =>
	( structure.my || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL ) &&
	(structure.hits / structure.hitsMax) < config.repair.percent &&
	structure.hits < config.repair.maxHits);
	
	if (room.memory.flags.dismantle.length > 0) {
		needFix = _.filter(needFix, structure => structure.id != room.memory.flags.dismantle[0].id)
	}
	
	return {
		enemy      : _.filter(structuresOther, structure => structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_WALL),
		terminal   : room.terminal,
		controller : room.controller,
		storage    : structuresStorage,
		link       : _.filter(structuresMy, structure =>
		structure.structureType == STRUCTURE_LINK),
		tower      : _.filter(structuresMy, structure => structure.structureType == STRUCTURE_TOWER),
		spawn      : _.filter(structuresMy, structure => structure.structureType == STRUCTURE_SPAWN)[0],
		extension  : _.filter(structuresMy, structure => structure.structureType == STRUCTURE_EXTENSION),
		container  : _.filter(structuresOther, structure => structure.structureType == STRUCTURE_CONTAINER),
		canWithdraw: (structuresDocker.length > 0) ? _.filter(structuresDocker, structure =>
			structure.store && structure.store.energy > 0) : [],
		canFill    : (structuresDocker.length > 0) ? _.filter(structuresDocker, structure =>
			structure.store && structure.store.energy < structure.storeCapacity) : [],
		needFill   : _.filter(structuresMy, structure => (
		structure.structureType == STRUCTURE_EXTENSION ||
		structure.structureType == STRUCTURE_SPAWN ||
		structure.structureType == STRUCTURE_TOWER ) && (
		structure.energy < structure.energyCapacity && structure.energy < 300)),
		needFix    : needFix.sort((a, b) => a.hits - b.hits),
		needBuild  : room.find(FIND_MY_CONSTRUCTION_SITES),
	}
}