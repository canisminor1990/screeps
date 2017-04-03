const partProprity = {
	"tough"        : 1,
	"carry"        : 2,
	"work"         : 3,
	"move"         : 4,
	"attack"       : 5,
	"ranged_attack": 6,
	"claim"        : 7,
	"heal"         : 8,
}

export default (partData = {}) => {
	let move, tough = [], bodyArray = [];
	if (partData.tough) {
		tough = _.fill(Array(partData.tough), 'tough')
		delete (partData.tough)
	}
	const moveRaw = partData.move;
	delete (partData.move)
	move = Math.floor(_.sum(partData) / 2);
	move = (move > moveRaw) ? moveRaw : move;
	move = (move > 0) ? move : 1;
	_.forEach(partData, (n, key) => bodyArray.push(_.fill(Array(n), key)));
	bodyArray = _.sortBy(bodyArray, n => partProprity[n[0]])
	if (partData.tough) bodyArray.unshift(tough)
	bodyArray = _.compact(_.flattenDeep(bodyArray))
	bodyArray = [].concat(tough, bodyArray)
	bodyArray = _.chunk(bodyArray, 2);
	for (let i = move; i > 0; i--) {
		bodyArray[i] = _.flatten([bodyArray[i],
		                          'move'])
	}
	bodyArray = _.compact(_.flattenDeep(bodyArray))
	
	return bodyArray
}