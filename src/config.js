export default {
	room    : [
		['W81S67', 'W81S66'],
		['W82S67', 'W82S68']
	],
	terminal: {
		amount : 1000,
		price  : 0.025,
		fee    : 1.5,
		storage: 300000
	},
	role    : {
		// name: [body , num[main,extra], timeout]
		attacker : [{tough: 10, attack: 6}, [0, 2], 100],
		filler   : [{carry: 8}, [2, 0], 20],
		miner    : [{work: 7, carry: 1}, [1, 1], 30],
		transer  : [{carry: 16}, [1, 2], 10],
		cleaner  : [{carry: 6}, [1, 0], 10],
		upfiller : [{carry: 8}, [1, 0], 80],
		upgrader : [{work: 10, carry: 1}, [2, 0], 10],
		claimer  : [{claim: 2}, [0, 1], 10],
		builder  : [{work: 1, carry: 6}, [1, 1], 10],
		terminer : [{carry: 16}, [1, 0], 10]
	},
	friend  : [
		'Ruo',
		'FanHua',
	  'kikooo'
	],
	profiler: false,
	repair  : {
		percent: 0.5,
		maxHits: 80000
	}
};