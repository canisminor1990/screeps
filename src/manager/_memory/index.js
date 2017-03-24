import configRaw from "../../config"
import creepsRaw from "./_creeps"
import structures from "./_structures"
import sources from "./_sources"
import dropped from "./_dropped"
export default (roomArrary) => {
	_.each(roomArrary, room => {
		room         = Game.rooms[room];
		const config = configRaw(room);
		const creeps = creepsRaw(room, config)
		const memory = {
			energyAvailable: room.energyAvailable,
			config         : config,
			creeps         : creeps,
			structures     : structures(room, config),
			sources        : sources(room, creeps.my.miner),
			dropped        : dropped(room),
		}
		room.memory  = memory;
		// Memory.game  = Game;
	})
}

