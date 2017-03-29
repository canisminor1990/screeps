export default  (room) => {

	const needBuild     = (room.memory.structures) ? room.memory.structures.needBuild : [];
	const builderNumber = (needBuild.length > 0) ? needBuild.length : 1
	const noEnemy       = Memory.trigger.noEnemy

	return {
		// [name , body , num[main,extra], time]
		filler  : [{carry: 6}, [2, 0], 10],
		cleaner : [{carry: 4}, [1, 0], 10],
		miner   : [{work: 8, carry: 1}, [0, 1], 10],
		transer : [{carry: 8}, [0, 1], 10],
		linker  : [{carry: 1}, [0, 1], 10],
		builder : [{work: 2, carry: 6}, [1, 1], 10],
		repairer: [{work: 2, carry: 6}, [0, 1], 10],
		upgrader: [{work: 4, carry: 2}, [3, 0], 10],
		claimer : [{claim: 2}, [0, 1], 10],
		// attacker: [{work: 8, carry: 1}, [0, 0], 100],
	}
}

function buildBody(obj) {
	let bodyArray = [];
	let move;
	if (!obj.move) {
		move = Math.ceil(_.sum(obj) / 2);
	} else {
		move = obj.move;
		delete (obj.move)
	}
	_.forEach(obj, (n, key) => {
		bodyArray = bodyArray.concat(_.fill(Array(n), key))
	});
	bodyArray = _.chunk(bodyArray, 2);

	for (let i = move; i > 0; i--) {
		bodyArray[i] = _.flatten([bodyArray[i], 'move'])
	}
	return _.compact(_.flattenDeep(bodyArray))
}


