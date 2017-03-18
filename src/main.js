import {roleHarvester, roleUpgrader, roleBuilder} from './role';
import {taskSpawn} from './task';

function taskBuild(x, y, type) {
	if (x, y, type) {
		Game.spawns['Spawn1'].room.createConstructionSite(x, y, `STRUCTURE_${type.toUpperCase()}`)
		console.log(`[Build] STRUCTURE_${type.toUpperCase()} in x:${x} y:${y}`)
	} else {
		console.log(
				`You can build: ` +
				['spawn',
				 'extension',
				 'road',
				 'constructedWall',
				 'rampart',
				 'keeperLair',
				 'portal',
				 'controller',
				 'link',
				 'storage',
				 'tower',
				 'observer',
				 'powerBank',
				 'powerSpawn',
				 'extractor',
				 'lab',
				 'terminal',
				 'container',
				 'nuker'].join('|')
		)
	}
}

module.exports = {
	taskBuild: taskBuild,
	loop: () => {

		for (let name in Memory.creeps) {
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

		taskSpawn('harvester', 2)
		taskSpawn('upgrader', 1)
		taskSpawn('builder', 1)

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
					(Game.spawns['Spawn1'].energy < 300) ?
							roleHarvester.run(creep) : roleUpgrader.run(creep);
					break;
				case 'upgrader':
					roleUpgrader.run(creep);
					break;
				case 'builder':
					roleBuilder.run(creep);
					break;
			}
		}
	}

}