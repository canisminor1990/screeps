import config from "../config"
import { isFriend } from '../_util'

export default (roomName) => {
	const room            = Game.rooms[roomName]
	const structures      = room.find(FIND_STRUCTURES),
	      myStructures    = _.filter(structures, structure => structure.my),
	      otherStructures = _.filter(structures, structure => !structure.my);
	const creeps          = room.find(FIND_CREEPS),
	      myCreeps        = _.filter(creeps, creep => creep.my),
	      otherCreeps     = _.filter(creeps, creep => !creep.my);

	const memory           = {
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
			spawn     : _.filter(myStructures, structure => structure.structureType == STRUCTURE_CONTAINER),
			container : _.filter(otherStructures, structure => structure.structureType == STRUCTURE_CONTAINER),
			needFix   : _.filter(structures, config.repair)
		},
		constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
		sources: mySpawn.room.find(FIND_SOURCES),
		droppedEnergy: mySpawn.room.find(FIND_DROPPED_ENERGY)
	}
	Memory.test = memory;
}

function creepRole(myCreeps, configRole) {
	let my = {}
	configRole.forEach(role => {
		my[role.role] = _.filter(myCreeps, creep => creep.name.split('#')[0] == role.role)
	})
	return my
}

