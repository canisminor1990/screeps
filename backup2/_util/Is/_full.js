export default (creep, all = true) => {
	if (all) {
		if (!creep.memory.full && _.sum(creep.carry) == creep.carryCapacity) creep.memory.full = true;
		if (creep.memory.full && _.sum(creep.carry) == 0) creep.memory.full = false;
	} else {
		if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
		if (creep.memory.full && creep.carry.energy == 0) creep.memory.full = false;
	}
	return creep.memory.full
}