export default (creep) => {
	if (!creep.memory.hasEnergy && creep.carry.energy > 0) creep.memory.hasEnergy = true;
	if (creep.memory.hasEnergy && creep.carry.energy == 0) creep.memory.hasEnergy = false;
	return creep.memory.hasEnergy
}