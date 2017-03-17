module.exports.loop = () => {

	Game.creeps.map(name => {
		                console.log(name)
		                const creep = Game.creeps[name];
		                if (creep.carry.energy < creep.carryCapacity) {
			                const sources = creep.room.find(FIND_SOURCES);
			                (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) ? creep.moveTo(sources[0]) : null;
		                }
		                else {
			                (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) ? creep.moveTo(Game.spawns['Spawn1']) : null
		                }
	                }
	)

}