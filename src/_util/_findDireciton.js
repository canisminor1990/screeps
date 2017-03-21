export default (pos, nextPos) => {

	console.log(JSON.stringify(pos), JSON.stringify(nextPos))
	let directionFix  = [], directonPos = [nextPos.x - pos.x, nextPos.y - pos.y];
	let directonArray = [
		[0, 1],
		[1, 1],
		[0, 1],
		[-1, 1],
		[-1, 0],
		[-1, -1],
		[0, -1],
		[1, -1]
	]

	for (let i = 0; i < directonArray.length; i++) {
		if (directonArray[i].toString() == directonPos.toString()) {
			const nextI   = (i + 1 < 7) ? i + 1 : 0,
			      beforeI = (i - 1 > 0) ? i - 1 : 7;
			directionFix.push(directonArray[nextI])
			directionFix.push(directonArray[beforeI])

		}
	}

	return {
		directionFixPos: [
			DirecitonFixPos(directionFix[0], nextPos.roomName),
			DirecitonFixPos(directionFix[1], nextPos.roomName)
		],
		directionFix   : [Direciton(directionFix[0]), Direciton(directionFix[1])],
		direction      : Direciton(directonPos)
	}
}

function DirecitonFixPos(pos, roomName) {

	return {
		x       : (pos) ? pos[0] : 0,
		y       : (pos) ? pos[1] : 0,
		roomName: roomName
	}

}

function Direciton(pos) {
	let directon;
	switch (pos) {
		case [0, 1]:
			directon = TOP
			break
		case [1, 1]:
			directon = TOP_RIGHT
			break
		case [0, 1]:
			directon = RIGHT
			break
		case [-1, 1]:
			directon = BOTTOM_RIGHT
			break
		case [-1, 0]:
			directon = BOTTOM
			break
		case [-1, -1]:
			directon = BOTTOM_LEFT
			break
		case [0, -1]:
			directon = LEFT
			break
		case [1, -1]:
			directon = TOP_LEFT
			break
	}
	return directon;
}

// TOP         : 1,
// TOP_RIGHT   : 2,
// RIGHT       : 3,
// BOTTOM_RIGHT: 4,
// BOTTOM      : 5,
// BOTTOM_LEFT : 6,
// LEFT        : 7,
// TOP_LEFT    : 8,