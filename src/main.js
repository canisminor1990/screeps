import roleHarvester from './role.harvester';
import roleUpgrader from'./role.upgrader';

module.exports.loop = () => {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	console.log('Harvesters: ' + harvesters.length);

	if (harvesters.length < 2) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
		console.log('Spawning new harvester: ' + newName);
	}

	if (Game.spawns['Spawn1'].spawning) {
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
			'🌝' + spawningCreep.memory.role,
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