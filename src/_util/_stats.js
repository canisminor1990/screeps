module.exports = function () {
	if (Memory.stats == undefined) {
		Memory.stats = {}
	}

	var rooms = Game.rooms;
	var spawns = Game.spawns;
	for (let roomKey in rooms) {
		let room = Game.rooms[roomKey];
		var isMyRoom = (room.controller ? room.controller.my : 0);
		if (isMyRoom) {
			Memory.stats['room.' + room.name + '.myRoom'] = 1;
			Memory.stats['room.' + room.name + '.energyAvailable'] = room.energyAvailable;
			Memory.stats['room.' + room.name + '.energyCapacityAvailable'] = room.energyCapacityAvailable;
			Memory.stats['room.' + room.name + '.controllerProgress'] = room.controller.progress;
			Memory.stats['room.' + room.name + '.controllerProgressTotal'] = room.controller.progressTotal;
			var stored = 0;
			var storedTotal = 0;

			if (room.storage) {
				stored = room.storage.store[RESOURCE_ENERGY];
				storedTotal = room.storage.storeCapacity[RESOURCE_ENERGY]
			}

			Memory.stats['room.' + room.name + '.storedEnergy'] = stored
		} else {
			Memory.stats['room.' + room.name + '.myRoom'] = undefined
		}
	}
	Memory.stats['gcl.progress'] = Game.gcl.progress;
	Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
	Memory.stats['gcl.level'] = Game.gcl.level;

	Memory.stats['cpu.bucket'] = Game.cpu.bucket;
	Memory.stats['cpu.limit'] = Game.cpu.limit;
	Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();

};