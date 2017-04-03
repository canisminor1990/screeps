import structures from "./_structures"
import constructionSites from "./_constructionSites"
import flags from "./_flags"
import resources from "./_resources"
import creeps from "./_creeps"
import drops from "./_drops"
import {Timer} from '../_util'

const buildRoom = (room, type, extra) => {
	const gameRoom = Game.rooms[room];
	return {
		name                   : gameRoom.name,
		type                   : type,
		extra                  : extra,
		mode                   : gameRoom.mode,
		rcl                    : gameRoom.controller.level,
		energyAvailable        : gameRoom.energyAvailable,
		energyCapacityAvailable: gameRoom.energyCapacityAvailable,
		structures             : structures(gameRoom.find(FIND_STRUCTURES)),
		constructionSites      : constructionSites(gameRoom.find(FIND_MY_CONSTRUCTION_SITES)),
		flags                  : flags(gameRoom.find(FIND_FLAGS)),
		resources              : resources(gameRoom.find(FIND_SOURCES),
			gameRoom.find(FIND_MINERALS)),
		creeps                 : creeps(gameRoom.find(FIND_CREEPS)),
		drops                  : drops(gameRoom.find(FIND_DROPPED_RESOURCES))
	};
}

export default (roomGroup) => {
	let i;
	if (!Memory.rooms) Memory.rooms = {}

	_.forEach(roomGroup, room => {
		const type         = (i > 0) ? 'extra' : 'main',
		      extra        = _.drop(roomGroup);
		Memory.rooms[room] = buildRoom(room, type, extra)
		i++;
	})
}

