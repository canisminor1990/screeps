export default {
	room    : [
		['W81S67', 'W81S66'],
		['W82S67','W82S68']
	],
	terminal:{
		amount:1000,
		price:0.2,
		fee:1.5
	},
	role    : {
		// name: [body , num[main,extra], timeout]
		attacker : [{tough: 10, attack: 6}, [0, 1], 100],
		filler   : [{carry: 6}, [2, 0], 10],
		miner    : [{work: 8, carry: 1}, [1, 1], 10],
		transer  : [{carry: 16}, [1, 2], 10],
		cleaner  : [{carry: 6}, [1, 0], 10],
		builder  : [{work: 2, carry: 6}, [1, 1], 10],
		upgrader : [{work: 6, carry: 12}, [2, 0], 10],
		claimer  : [{claim: 2}, [0, 1], 50],
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