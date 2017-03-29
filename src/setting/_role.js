export default  (roomArray = []) => {
	const roleConfig = {
		// [name , body , num[main,extra], time]
		filler   : [{carry: 6}, [2, 0], 10],
		cleaner  : [{carry: 4}, [1, 0], 10],
		miner    : [{work: 8, carry: 1, move: 4}, [0, 1], 10],
		transer  : [{carry: 8}, [0, 1], 10],
		linker   : [{carry: 1}, [0, 1], 10],
		builder  : [{work: 2, carry: 6}, [1, 1], 10],
		repairer : [{work: 2, carry: 6}, [0, 1], 10],
		upgrader : [{work: 4, carry: 2}, [3, 0], 10],
		claimer  : [{claim: 2}, [0, 1], 10],
		traveller: [{move: 1}, [0, 0], 10],
		attacker : [{tough: 10, attack: 4}, [0, 0], 100],
	}
	return buildRole(roleConfig, roomArray)
}

function buildRole(config = {}, roomArray = []) {
	let i = 0, proprity = 0;
	_.forEach(roomArray, (roomName) => {
		_.forEach(config, (array, key) => {
			let name = key + '#';
			if (i > 0) name = name + roomName + '#';
			config[name] = {
				role    : key,
				roomName: roomName,
				roomType: (i == 0) ? "main" : "extra",
				body    : buildBody(array[0]),
				// number  : (i == 0) ? array[1][0] : array[1][1],
				timeout : array[2],
				proprity: proprity
			}
			proprity++;
		})
		i++;
	})
	return config;
}

function buildBody(obj = {}) {
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


