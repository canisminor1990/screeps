export default (container, targetsHarvest, targetsBuild) => {

	const targets = container.pos.findInRange(FIND_MY_CREEPS, 2, {
		filter: tCreep =>
		tCreep.memory.role !== 'miner' &&
		tCreep.memory.role !== 'cleaner' &&
		((targetsHarvest > 0) ? (tCreep.memory.role !== 'harvester' && tCreep.memory.role !== 'farHarvester') : null) &&
		((targetsBuild = 0) ? tCreep.memory.role !== 'builder' : null)
	})[0];



	if (targets) {
		console.log(targets)
		container.transfer(targets, RESOURCE_ENERGY);
		container.room.visual.text(
				'[Transfer]',
				container.pos.x + 1,
				container.pos.y,
				{align: 'left', opacity: 0.8});
	}
}