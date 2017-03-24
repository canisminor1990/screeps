import configRaw from "../../config"
import creepsRaw from "./_creeps"
import structures from "./_structures"
import sources from "./_sources"
import dropped from "./_dropped"
import flags from "./_flags"
export default (roomArrary) => {
    _.each(roomArrary, room => {
        if (!Game.rooms[room]) return;
        room = Game.rooms[room];
        const config = configRaw(room);
        const creeps = creepsRaw(room, config)
        const memory = {
            energyAvailable: room.energyAvailable,
            config: config,
            creeps: creeps,
            structures: structures(room, config),
            sources: sources(room, creeps.my.miner),
            dropped: dropped(room),
            flags: flags(room)
        }
        room.memory = memory;
        // Memory.game  = Game;
    })
}

