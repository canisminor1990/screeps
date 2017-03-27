export default (room = Game.rooms['W81S67']) => {
	const needBuild     = (room.memory.structures) ? room.memory.structures.needBuild : [];
	const builderNumber = (needBuild.length > 0) ? needBuild.length : 1
	const noEnemy       = Memory.trigger.noEnemy

	const repair = {
		percent: 0.5,
		maxHits: 20000,
	}
	const role   = [
		{
			role    : "claim",
			body    : {claim: 2, move: 1},
			timeout : 100,
			number  : (noEnemy['W81S66'].safe) ? 1 : 0,
			priority: 7
		}, {
			role    : "claimSec",
			body    : {claim: 2, move: 4},
			timeout : 100,
			number  : (noEnemy['W82S67'].safe) ? 1 : 0,
			priority: 7
		},
		{
			role    : "farMiner",
			body    : {work: 8, carry: 1, move: 4},
			timeout : 100,
			number  : (noEnemy['W81S66'].safe) ? 1 : 0,
			priority: 1
		},
		{
			role    : "farMinerSec",
			body    : {work: 4, carry: 6, move: 5},
			timeout : 100,
			number  : (noEnemy['W82S67'].safe) ? 8 : 0,
			priority: 2
		},
		{
			role    : 'farHarvester',
			body    : {carry: 8, move: 4},
			number  : (noEnemy['W81S66'].safe) ? 2 : 0,
			priority: 5
		},
		{
			role    : 'farBuilder',
			body    : {carry: 5, work: 1, move: 3},
			number  : (noEnemy['W81S66'].safe) ? 1 : 0,
			priority: 5
		},
		{
			role    : 'harvester',
			body    : {carry: 2, move: 1},
			number  : 0,
			priority: 2
		},
		{
			role    : 'linker',
			body    : {carry: 1, move: 1},
			number  : 1,
			priority: 2
		},
		{
			role    : 'upgrader',
			body    : {carry: 2, work: 4, move: 2},
			number  : (builderNumber > 1) ? 1 : 3,
			priority: 3
		},
		{
			role    : 'builder',
			body    : {work: 3, carry: 3, move: 3},
			number  : (builderNumber > 4) ? 4 : builderNumber,
			priority: 6
		},
		{
			role    : "miner",
			body    : {work: 8, move: 4, carry: 1},
			number  : 2,
			priority: 1
		},
		{
			role    : 'cleaner',
			body    : {carry: 6, move: 3},
			number  : 2,
			priority: 0
		},
		{
			role    : 'attacker',
			body    : {attack: 2, move: 3},
			number  : 0,
			priority: 0
		},
		{
			role    : 'traveller',
			body    : {move: 1},
			number  : 0,
			priority: 0
		}
	]

	return {
		role    : role.sort((a, b) => a.priority - b.priority),
		repair  : repair,
		linkMain: '58d505eb204ecd9e507951f0',
	};
}