import config from "../config"
import { isFriend } from '../_util'

export default (room) => {
	const config          = config(room)
	const structures      = room.find(FIND_STRUCTURES),
	      myStructures    = _.filter(structures, structure => structure.my),
	      otherStructures = _.filter(structures, structure => !structure.my);
	const creeps          = room.find(FIND_CREEPS),
	      myCreeps        = _.filter(creeps, creep => creep.my),
	      otherCreeps     = _.filter(creeps, creep => !creep.my);

	const memory = {
		energyAvailable: room.energyAvailable,
		creeps         : {
			my    : creepRole(myCreeps, config.role),
			friend: _.filter(otherCreeps, creep => isFriend(creep.owner.username)),
			enemy : _.filter(otherCreeps, creep => !isFriend(creep.owner.username))
		},
		structures     : {
			terminal  : room.terminal,
			controller: room.controller,
			storage   : room.storage,
			tower     : _.filter(myStructures, structure => structure.structureType == STRUCTURE_TOWER)[0],
			spawn     : _.filter(myStructures, structure => structure.structureType == STRUCTURE_CONTAINER)[0],
			container : _.filter(otherStructures, structure => structure.structureType == STRUCTURE_CONTAINER),
			needFill  : _.filter(myStructures, structure =>
			structure.structureType == (STRUCTURE_EXTENSION || STRUCTURE_SPAWN || STRUCTURE_TOWER) &&
			structure.energy < structure.energyCapacity),
			needFix   : _.filter(structures, structure =>
			( structure.my || structure.structureType == (STRUCTURE_ROAD || STRUCTURE_WALL) ) &&
			(structure.hits / structure.hitsMax) < config.repair.percent && structure.hits < config.repair.maxHits),
			needBuild : room.find(FIND_MY_CONSTRUCTION_SITES),
		},
		sources        : room.find(FIND_SOURCES),
		dropped        : {
			energy: room.find(FIND_DROPPED_ENERGY)
		}
	}
	room.memory  = memory;
}

function creepRole(myCreeps, configRole) {
	let my = {}
	configRole.forEach(role => {
		my[role.role] = _.filter(myCreeps, creep => creep.name.split('#')[0] == role.role)
	})
	return my
}

