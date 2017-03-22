import baseconfig from "../config"
import { isFriend } from '../_util'

export default (room) => {
	const config          = baseconfig(room)
	const structures      = room.find(FIND_STRUCTURES),
	      myStructures    = _.filter(structures, structure => structure.my),
	      otherStructures = _.filter(structures, structure => !structure.my),
	      container       = _.filter(otherStructures, structure => structure.structureType == STRUCTURE_CONTAINER),
	      storage         = room.storage,
	      dock     = container.push(storage);
	const creeps          = room.find(FIND_CREEPS),
	      myCreeps        = _.filter(creeps, creep => creep.my),
	      otherCreeps     = _.filter(creeps, creep => !creep.my),
	      my              = creepRole(myCreeps, config.role);
	const sources         = room.find(FIND_SOURCES);

	const sourceMiner = (rawSources) => {
		let sources = []
		rawSources.forEach(source => {
			                   let minerNumber = 0;
			                   my.miner.forEach(creep => {
				                                    (creep.memory.sourceTarget = source.id)
				                                    minerNumber++
			                                    }
			                   )

			                   sources.push({
				                                source     : source,
				                                minerNumber: minerNumber
			                                })
		                   }
		)
		if (sources.length > 0) {
			sources.sort((a, b) => a.minerNumber - b.minerNumber)
		}
		return sources
	}

	const memory = {
		energyAvailable: room.energyAvailable,
		creeps         : {
			my    : my,
			friend: _.filter(otherCreeps, creep => isFriend(creep.owner.username)),
			enemy : _.filter(otherCreeps, creep => !isFriend(creep.owner.username))
		},
		structures     : {
			terminal   : room.terminal,
			controller : room.controller,
			storage    : storage,
			tower      : _.filter(myStructures, structure => structure.structureType == STRUCTURE_TOWER)[0],
			spawn      : _.filter(myStructures, structure => structure.structureType == STRUCTURE_CONTAINER)[0],
			container  : container,
			canWithdraw: _.filter(dock, structure => structure.storage.energy > 0),
			canFill    : _.filter(dock, structure => structure.store.energy < structure.storeCapacity),
			needFill   : _.filter(myStructures, structure =>
			structure.structureType == (STRUCTURE_EXTENSION || STRUCTURE_SPAWN || STRUCTURE_TOWER) &&
			structure.energy < structure.energyCapacity),
			needFix    : _.filter(structures, structure =>
			( structure.my || structure.structureType == (STRUCTURE_ROAD || STRUCTURE_WALL) ) &&
			(structure.hits / structure.hitsMax) < config.repair.percent && structure.hits < config.repair.maxHits),
			needBuild  : room.find(FIND_MY_CONSTRUCTION_SITES),
		},
		sources        : sourceMiner(sources),
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
