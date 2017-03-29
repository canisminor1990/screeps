export default  (roomArray = []) => {
	const roleConfig = {
		// [name , body , num[main,extra], time]
		filler   : [{carry: 6}, [2, 0], 10],
		cleaner  : [{carry: 4}, [1, 0], 10],
		miner    : [{work: 8, carry: 1, move: 4}, [1, 1], 10],
		transer  : [{carry: 8}, [1, 1], 10],
		linker   : [{carry: 1}, [1, 0], 10],
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
	let i         = 0, proprity = 0;
	let newConfig = {}
	_.forEach(roomArray, (roomName) => {
		_.forEach(config, (array, key) => {
			let name   = key,
			    body   = buildBody(array[0]),
			    number = (i == 0) ? array[1][0] : array[1][1];
			number     = buildNumber(key, number, roomName);
			if (number == 0) return;
			if (i > 0) name = name + '#' + roomName;

			newConfig[name] = {
				role    : key,
				roomName: roomName,
				roomType: (i == 0) ? "main" : "extra",
				body    : body[0],
				cost    : body[1],
				number  : number,
				timeout : array[2],
				proprity: proprity
			}
			proprity++;
		})
		i++;
	})
	return newConfig;
}

function buildNumber(role, number, roomName) {
	try {
		const room = Memory.rooms[roomName]
		switch (role) {
			case 'miner':
				number = room.sources.length * number
				break
			case 'transer':
				number = room.sources.length * number - room.structures.link.length + 1
				break
			case 'builder':
				number = Math.ceil(room.structures.needBuild.length / 4)
		}
		return number
	} catch (e) {
		console.log(`# Error BuildNumber ${role}-${roomName} ${e}`)
		return 0
	}
}

const costSpend = {
	"move"         : 50,
	"work"         : 100,
	"attack"       : 80,
	"carry"        : 50,
	"heal"         : 250,
	"ranged_attack": 150,
	"tough"        : 10,
	"claim"        : 600
}

function buildBody(obj = {}) {
	let cost = 0,
	    body = buildBodyFormat(obj)
	_.forEach(body, part => {
		cost = cost + costSpend[part]
	})
	return [body, cost]
}

function buildBodyFormat(obj = {}) {
	let move, bodyArray = [];
	move                = Math.ceil(_.sum(obj) / 2);
	if (obj.move) {
		move = (move > obj.move) ? obj.move : move;
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