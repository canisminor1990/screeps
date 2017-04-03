import buildPart from './_part'

const partCost = {
	"move"         : 50,
	"work"         : 100,
	"attack"       : 80,
	"carry"        : 50,
	"heal"         : 250,
	"ranged_attack": 150,
	"tough"        : 10,
	"claim"        : 600
}

export default (partData = {}, energy = 0) => {
	let cost = 0,
	    body = buildPart(partData)
	_.forEach(body, part => {
		cost += partCost[part]
	})
	while (cost > energy) {
		cost = 0,
			_.forEach(partData, (mumber, part) => {
				if (mumber > 1) partData[part]--
			})
		body = buildPart(partData)
		_.forEach(body, part => {
			cost += partCost[part]
		})
	}

	return {
		body: body,
		cost: cost
	}
}
