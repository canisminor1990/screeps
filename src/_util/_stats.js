export default (room) => {
	let stats = {
		// time
		'time'             : Game.time,
		// gcl
		'gcl.progress'     : Game.gcl.progress,
		'gcl.progressTotal': Game.gcl.progressTotal,
		'gcl.level'        : Game.gcl.level,
		// cpu
		'cpu.bucket'       : Game.cpu.bucket,
		'cpu.limit'        : Game.cpu.limit,
		'cpu.getUsed'      : Game.cpu.getUsed(),
		// market
		'market.credits'   : Game.market.credits,
		// creeps
		'creeps'           : _.size(Memory.creeps)
	}
	// rooms
	_.forEach(room, roomGroup => {
		const roomName                                    = roomGroup[0],
		      roomMain                                    = Game.rooms[roomName];
		stats[`room.${roomName}.myRoom`]                  = 1;
		stats[`room.${roomName}.energyAvailable`]         = roomMain.energyAvailable;
		stats[`room.${roomName}.energyCapacityAvailable`] = roomMain.energyCapacityAvailable;
		stats[`room.${roomName}.rcl`]                     = roomMain.controller.level;
		stats[`room.${roomName}.controllerProgress`]      = roomMain.controller.progress;
		stats[`room.${roomName}.controllerProgressTotal`] = roomMain.controller.progressTotal;
		stats[`room.${roomName}.storedEnergy`]            = roomMain.storage.store[RESOURCE_ENERGY]
	})
	
	Memory.stats = stats
};