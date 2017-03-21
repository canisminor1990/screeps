const role = [
	{
		role    : "claim",
		body    : {move: 1, claim: 1},
		number  : [1],
		priority: 7
	},
	{
		role    : "farMiner",
		body    : {move: 3, work: 4, carry: 3},
		number  : [1],
		priority: 4
	},
	{
		role    : 'farHarvester',
		body    : {move: 4, work: 1, carry: 4},
		number  : [4],
		priority: 5
	},
	{
		role    : 'harvester',
		body    : {move: 3, work: 1, carry: 6},
		number  : [0, 2],
		priority: 1
	},
	{
		role    : 'upgrader',
		body    : {move: 1, work: 4, carry: 2},
		number  : [2],
		priority: 3
	},
	{
		role    : 'builder',
		body    : {move: 3, work: 3, carry: 3},
		number  : [0, 2],
		priority: 6
	},
	{
		role    : "miner",
		body    : {move: 2, work: 5, carry: 1},
		number  : [1, 2],
		priority: 2
	},
	{
		role    : 'cleaner',
		body    : {move: 2, work: 1, carry: 2},
		number  : [1],
		priority: 8
	}
]

const repair = (structure) => (structure.hits / structure.hitsMax) < 0.5 && structure.hits < 10000

/*
 "move": 50,
 "work": 100,
 "attack": 80,
 "carry": 50,
 "heal": 250,
 "ranged_attack": 150,
 "tough": 10,
 "claim": 600
 */
b

export default {
	role  : role.sort((a, b) => a.priority - b.priority),
	repair: repair,
};
