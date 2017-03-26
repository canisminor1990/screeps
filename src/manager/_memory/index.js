import configRaw from "../../config"
import creepsRaw from "./_creeps"
import structures from "./_structures"
import sources from "./_sources"
import dropped from "./_dropped"
import flags from "./_flags"
export default (roomArrary) => {
	_.each(roomArrary, room => {
		room         = Game.rooms[room];
		if (!room) return;
		const config = configRaw(room);
		const creeps = creepsRaw(room, config)
		const memory = {
			energyAvailable: room.energyAvailable,
			config         : config,
			creeps         : creeps,
			structures     : structures(room, config),
			sources        : sources(room, _.merge(creeps.my.miner,creeps.my.farMiner,creeps.my.farMinerSec)),
			dropped        : dropped(room),
			flags          : flags(room)
		}
		
		 room.memory = memory;
		// Memory.game  = Game;
	})
}

