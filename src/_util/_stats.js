export default () => {
	let stats                  = {}
	// time
	stats['time']              = Game.time;
	// gcl
	stats['gcl.progress']      = Game.gcl.progress;
	stats['gcl.progressTotal'] = Game.gcl.progressTotal;
	stats['gcl.level']         = Game.gcl.level;
	// cpu
	stats['cpu.bucket']        = Game.cpu.bucket;
	stats['cpu.limit']         = Game.cpu.limit;
	stats['cpu.getUsed']       = Game.cpu.getUsed();
	// market
	stats['market.credits']       = Game.market.credits;
	
	var rooms  = Game.rooms;
	var spawns = Game.spawns;
	for (let roomKey in rooms) {
		let room     = Game.rooms[roomKey];
		var isMyRoom = (room.controller ? room.controller.my : 0);
		if (isMyRoom) {
			stats['room.' + room.name + '.myRoom']                  = 1;
			stats['room.' + room.name + '.energyAvailable']         = room.energyAvailable;
			stats['room.' + room.name + '.energyCapacityAvailable'] = room.energyCapacityAvailable;
			stats['room.' + room.name + '.controllerProgress']      = room.controller.progress;
			stats['room.' + room.name + '.controllerProgressTotal'] = room.controller.progressTotal;
			var stored                                              = 0;
			var storedTotal                                         = 0;
			
			if (room.storage) {
				stored      = room.storage.store[RESOURCE_ENERGY];
				storedTotal = room.storage.storeCapacity[RESOURCE_ENERGY]
			}
			
			stats['room.' + room.name + '.storedEnergy'] = stored
		} else {
			stats['room.' + room.name + '.myRoom'] = undefined
		}
	}
	
	Memory.stats = stats
};