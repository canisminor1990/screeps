import {roleConfig, roleHarvester, roleUpgrader, roleBuilder, roleMiner} from './role';
import {taskSpawn} from './task';
const mySpawn = Game.spawns['Spawn1'];
module.exports = {

	loop: () => {
		taskSpawn(roleConfig.number, roleConfig.body)
		if (mySpawn.spawning) {
			const spawningCreep = Game.creeps[mySpawn.spawning.name];
			mySpawn.room.visual.text(
					'[Spawn]' + spawningCreep.memory.role,
					mySpawn.pos.x + 1,
					mySpawn.pos.y,
					{align: 'left', opacity: 0.8});
		}
		mySpawn.room.memory = {
			structures: mySpawn.room.find(FIND_STRUCTURES),
			constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
			source : mySpawn.room.find(FIND_SOURCES),
			miner: mySpawn.room.find(FIND_MY_CREEPS, {filter: (miner) => miner.memory.role === "miner"})
		}

		const targetsHarvest = mySpawn.room.memory.structures.filter(structure => (
				structure.structureType == STRUCTURE_EXTENSION ||
				structure.structureType == STRUCTURE_SPAWN ||
				structure.structureType == STRUCTURE_TOWER ||
				structure.structureType == STRUCTURE_CONTAINER
				) && structure.energy < structure.energyCapacity
		)

		const targetsBuild = mySpawn.room.memory.constructionSites;

		for (let name in Game.creeps) {
			const creep = Game.creeps[name];
			switch (creep.memory.role) {
				case 'harvester':
					(targetsHarvest.length > 0) ?
							roleHarvester.run(creep, targetsHarvest[0]) : roleBuilder.run(creep);
					break;
				case 'upgrader':
					roleUpgrader.run(creep);
					break;
				case 'builder':
					(targetsBuild.length > 0) ? roleBuilder.run(creep, targetsBuild[0]) : roleHarvester.run(creep, targetsHarvest[0])
					break;
				case 'miner':
					roleMiner.run(creep);
					break;
			}
		}
	}

}