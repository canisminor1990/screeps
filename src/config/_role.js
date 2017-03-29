export default  (room) => {

	const needBuild     = (room.memory.structures) ? room.memory.structures.needBuild : [];
	const builderNumber = (needBuild.length > 0) ? needBuild.length : 1
	const noEnemy       = Memory.trigger.noEnemy

	return [
		{
			role    : "claim",
			body    : {claim: 2, move: 1},
			timeout : 100,
			number  : (noEnemy['W81S66'].safe) ? 1 : 0,
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
			body    : {work: 8, carry: 1, move: 4},
			timeout : 100,
			number  : (noEnemy['W82S67'].safe) ? 2 : 0,
			priority: 1
		},
		{
			role    : 'farHarvester',
			body    : {carry: 8, move: 4},
			number  : (noEnemy['W81S66'].safe) ? 3 : 0,
			priority: 2
		},
		{
			role    : 'farHarvesterSec',
			body    : {carry: 8, move: 4},
			number  : (noEnemy['W82S67'].safe) ? 5 : 0,
			priority: 0
		},
		{
			role    : 'farBuilder',
			body    : {carry: 6, work: 2, move: 4},
			number  : (noEnemy['W81S66'].safe) ? 1 : 0,
			priority: 5
		}, {
			role    : 'farBuilderSec',
			body    : {carry: 6, work: 2, move: 4},
			number  : (noEnemy['W82S67'].safe) ? 2 : 0,
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
			priority: 0
		},
		{
			role    : 'upgrader',
			body    : {carry: 2, work: 4, move: 2},
			number  : (builderNumber > 1) ? 1 : 3,
			priority: 3
		},
		{
			role    : 'farUpgrader',
			body    : {carry: 6, work: 2, move: 4},
			number  : (noEnemy['W82S67'].safe) ? 3 : 0,
			priority: 3
		},
		{
			role    : 'builder',
			body    : {work: 2, carry: 6, move: 4},
			number  : (builderNumber > 2) ? 2 : builderNumber,
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
			body    : {tough:2,attack: 2, move: 2},
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
}