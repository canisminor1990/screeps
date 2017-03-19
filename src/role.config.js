const roleConfig = {
	number: {
		harvester: [1,
		            6],
		upgrader: [2],
		builder: [0,
		          2],
		miner: [1,
		        3],
	},
	body: {//300 + 5 * 5 = 550
		miner: {move: 1, work: 4, carry: 2}, // 3
		harvester: {move: 5, work: 1, carry: 3}, // 350
		upgrader: {move: 1, work: 2, carry: 2}, // 350
		builder: {move: 3, work: 1, carry: 3}, // 350
	}
}

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

export default roleConfig;