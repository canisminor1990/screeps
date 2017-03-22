export default (creep, room) => {
	if (creep.carry.energy == 0) {
		creep.memory.full = false
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true
	}

	if (!creep.memory.full) {
		const farMiner = creep.room.memory.creeps.my.farMiner;
		if (farMiner.length > 0) {
			const farMiner = Game.getObjectById(farMiner[0].id)
			creep.moveTo(farMiner)
		}
	}
	else {
		if (creep.room.name !== room.name) {
			creep.moveTo(room)
		} else {
			( creep.transfer(room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
				? pathFinder(creep, room.storage) : null
		}
	}
}