export default {
	room    : [
		['W81S67', 'W81S66'],
		['W82S67','W82S68']
	],
	role    : {
		// name: [body , num[main,extra], timeout]
		attacker : [{tough: 10, attack: 6}, [0, 1], 100],
		filler   : [{carry: 4}, [2, 0], 10],
		miner    : [{work: 8, carry: 1}, [1, 1], 10],
		transer  : [{carry: 12}, [1, 2], 10],
		cleaner  : [{carry: 4}, [1, 0], 10],
		builder  : [{work: 2, carry: 6}, [1, 1], 10],
		upgrader : [{work: 6, carry: 12}, [2, 0], 10],
		claimer  : [{claim: 2}, [0, 1], 10],
		traveller: [{move: 1}, [0, 0], 10],
		
	},
	friend  : [
		"Ruo",
		"FanHua"
	],
	profiler: false,
	repair  : {
		percent: 0.5,
		maxHits: 80000,
	},
}