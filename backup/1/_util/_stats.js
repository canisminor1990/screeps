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
		'creeps'           : _.size(Game.creeps)
	};
	// rooms
	_.forEach(room, roomGroup => {
		const roomName                                    = roomGroup[0],
		      roomMemory                                  = Memory.rooms[roomName];
		// room
		stats[`room.${roomName}.myRoom`]                  = 1;
		// energy
		stats[`room.${roomName}.energyAvailable`]         = roomMemory.energyAvailable;
		stats[`room.${roomName}.energyCapacityAvailable`] = roomMemory.energyCapacityAvailable;
		// rcl
		const controller                                  = roomMemory.structures.my.controller[0];
		stats[`room.${roomName}.rcl`]                     = controller.level;
		stats[`room.${roomName}.controllerProgress`]      = controller.progress;
		stats[`room.${roomName}.controllerProgressTotal`] = controller.progressTotal;
		// storage
		const storage                                     = roomMemory.structures.my.storage[0];
		try {
			stats[`room.${roomName}.storedEnergy`]  = storage.store[RESOURCE_ENERGY];
			stats[`room.${roomName}.storedMineral`] = _.sum(storage.store) - storage.store[RESOURCE_ENERGY];
		} catch (e) {
			stats[`room.${roomName}.storedEnergy`]  = 0;
			stats[`room.${roomName}.storedMineral`] = 0;
		}
		// terminals
		const terminal = roomMemory.structures.my.terminal[0];
		try {
			stats[`room.${roomName}.terminalEnergy`]  = terminal.store[RESOURCE_ENERGY];
			stats[`room.${roomName}.terminalMineral`] = _.sum(terminal.store) - terminal.store[RESOURCE_ENERGY];
		} catch (e) {
			stats[`room.${roomName}.terminalEnergy`]  = 0;
			stats[`room.${roomName}.terminalMineral`] = 0;
		}
		// roles
		_.forEach(roomMemory.creeps.my, (c = [], role) => {
			stats[`room.${roomName}.roles.${role}`] = c.length;
		});
	});

	Memory.stats = stats;
};