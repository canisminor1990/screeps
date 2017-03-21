import 'screeps-perf';
import { pathFinder } from './task'
import { Timer, Build } from './_util'

const mySpawn = Game.spawns['Spawn1'];

module.exports.loop = () => {

	for (let name in Game.creeps) {
		const creep = Game.creeps[name];
		pathFinder(creep, mySpawn)
	}
}



