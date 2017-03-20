export default (container, targetsHarvest, targetsBuild) => {

	let targets = container.pos.findInRange(FIND_MY_CREEPS, 2, {
		filter: creep =>
		creep.carry.energy < creep.carryCapacity &&
		creep.memory.role !== 'miner' &&
		creep.memory.role !== 'cleaner'
	});

	if (targetsHarvest == 0) {
		targets = targets.filter(creep => creep.memory.role !== 'harvester' &&
		                                  creep.memory.role !== 'farHarvester'
		)
	}

	if (targetsBuild == 0) {
		targets = targets.filter(creep => creep.memory.role !== 'builder')
	}

	if (targets[0]) {
		if (container.transfer(targets[0], RESOURCE_ENERGY) == OK) {
			// console.log(['[Log]','Transfer:',targets[0]].join(' '))
			container.room.visual.text(
				'[Transfer]',
				container.pos.x + 1,
				container.pos.y,
				{align: 'left', opacity: 0.8});
		}
	}
}