import { Is } from '../_util'

const buildStructures = (data = []) => {
	const all        = [].concat(data);
	let container    = _.remove(data, s => s.structureType == STRUCTURE_CONTAINER),
	      controller = _.remove(data, s => s.structureType == STRUCTURE_CONTROLLER),
	      extension  = _.remove(data, s => s.structureType == STRUCTURE_EXTENSION),
	      extractor  = _.remove(data, s => s.structureType == STRUCTURE_EXTRACTOR),
	      keeperLair = _.remove(data, s => s.structureType == STRUCTURE_KEEPER_LAIR),
	      lab        = _.remove(data, s => s.structureType == STRUCTURE_LAB),
	      link       = _.remove(data, s => s.structureType == STRUCTURE_LINK),
	      nuker      = _.remove(data, s => s.structureType == STRUCTURE_NUKER),
	      observer   = _.remove(data, s => s.structureType == STRUCTURE_OBSERVER),
	      powerBank  = _.remove(data, s => s.structureType == STRUCTURE_POWER_BANK),
	      powerSpawn = _.remove(data, s => s.structureType == STRUCTURE_POWER_SPAWN),
	      portal     = _.remove(data, s => s.structureType == STRUCTURE_PORTAL),
	      rampart    = _.remove(data, s => s.structureType == STRUCTURE_RAMPART),
	      road       = _.remove(data, s => s.structureType == STRUCTURE_ROAD),
	      spawn      = _.remove(data, s => s.structureType == STRUCTURE_SPAWN),
	      storage    = _.remove(data, s => s.structureType == STRUCTURE_STORAGE),
	      terminal   = _.remove(data, s => s.structureType == STRUCTURE_TERMINAL),
	      tower      = _.remove(data, s => s.structureType == STRUCTURE_TOWER),
	      wall       = _.remove(data, s => s.structureType == STRUCTURE_WALL);


	return {
		all       : all,
		container : container,
		controller: controller,
		extension : extension,
		extractor : extractor,
		container : container,
		keeperLair: keeperLair,
		lab       : lab,
		link      : link,
		nuker     : nuker,
		observer  : observer,
		powerBank : powerBank,
		powerSpawn: powerSpawn,
		portal    : portal,
		rampart   : rampart,
		road      : road,
		spawn     : spawn,
		storage   : storage,
		terminal  : terminal,
		tower     : tower,
		wall      : wall
	}
}

export default (data = []) => {
	let structuresMy       = _.remove(data, s =>
	                                  s.my ||
	                                  s.structureType == STRUCTURE_ROAD ||
	                                  s.structureType == STRUCTURE_WALL ||
	                                  s.structureType == STRUCTURE_CONTAINER
	    ),
	    structuresFriendly = _.remove(data, s => Is.firendly(s.owner)),
	    structuresHostile  = data;
	return {
		my      : buildStructures(structuresMy),
		friendly: buildStructures(structuresFriendly),
		hostile : buildStructures(structuresHostile)
	}
}

