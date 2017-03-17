import roleHarvester from './role.harvester';
import roleUpgrader from'./role.upgrader';

function autoSpawn(roleSpawn, maxNum) {
	const roleNumber = _.filter(Game.creeps, (creep) => creep.memory.role == roleSpawn).length;
	if (roleNumber.length < maxNum) {
		const newName = Game.spawns['Spawn1'].createCreep(
			[WORK, CARRY, MOVE],
			`${roleSpawn}${roleNumber + 1}`,
			{role: roleSpawn}
		);
		console.log('Spawn: ' + newName);
	}
}

module.exports.loop = () => {

	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	autoSpawn('harvester', 2)
	autoSpawn('upgrader', 1)


	if (Game.spawns['Spawn1'].spawning) {
		const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
			'[Spawn]' + spawningCreep.memory.role,
			Game.spawns['Spawn1'].pos.x + 1,
			Game.spawns['Spawn1'].pos.y,
			{align: 'left', opacity: 0.8});
	}

	for (let name in Game.creeps) {
		const creep = Game.creeps[name];
		switch (creep.memory.role) {
			case 'harvester':
				roleHarvester.run(creep);
				break;
			case 'upgrader':
				roleUpgrader.run(creep);
				break;
		}

	}
}