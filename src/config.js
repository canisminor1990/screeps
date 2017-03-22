const mySpawn      = Game.spawns['Spawn1'];
const targetsBuild = mySpawn.room.memory.constructionSites;
const friends      = ["Ruo", "FanHua"]
const role         = [
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
		body    : {move: 4, work: 0, carry: 4},
		number  : [4],
		priority: 5
	},
	{
		role    : 'harvester',
		body    : {move: 4, work: 0, carry: 8},
		number  : [0, 6],
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
		number  : [(targetsBuild.length / 2 < 4) ? targetsBuild.length / 2 : 4],
		priority: 6
	},
	{
		role    : "miner",
		body    : {move: 2, work: 8, carry: 1},
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

export default {
	role   : role.sort((a, b) => a.priority - b.priority),
	friends: friends,
	repair : repair,
};
