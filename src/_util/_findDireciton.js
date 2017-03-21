export default (pos, nextPos) => {

    const directonArray = [
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1]
    ]

    let directionFix = [],
        directonPos = [nextPos.x - pos.x, nextPos.y - pos.y];

    for (let i = 0; i < directonArray.length; i++) {
        if (directonArray[i].toString() == directonPos.toString()) {
            const nextI = (i + 1 <= 7) ? i + 1 : 0,
                beforeI = (i - 1 >= 0) ? i - 1 : 7;

            directionFix.push(directonArray[nextI])
            directionFix.push(directonArray[beforeI])

        }
    }
    // return {
    //     direction      : Direciton(directonPos),
    //     directionFix   : [Direciton(directionFix[0]), Direciton(directionFix[1])],
    //     directionFixPos: [
    //         DirecitonFixPos(pos, directionFix[0], nextPos.roomName),
    //         DirecitonFixPos(pos, directionFix[1], nextPos.roomName)
    //     ],
    // }

    return {
        road: [
            DirecitonFixPos(pos, directionFix[0], nextPos.roomName),
            DirecitonFixPos(pos, directionFix[1], nextPos.roomName)
        ],
        path:[
            DirecitonPos(pos, directionFix[0], nextPos.roomName),
            DirecitonPos(pos, directionFix[1], nextPos.roomName)
        ],
    }
}

function DirecitonFixPos(creep, pos, roomName) {
    return new RoomPosition(creep.x + pos[0], creep.y + pos[1], roomName)
}

function DirecitonPos(creep, pos, roomName) {
    return {
        x:creep.x + pos[0],
        y: creep.y + pos[1],
        roomName : roomName
    }
}

//
// function Direciton(pos = [0, 0]) {
//     let directon;
//     switch (pos.toString()) {
//         case '0,-1':
//             directon = TOP
//             break
//         case '1,-1':
//             directon = TOP_RIGHT
//             break
//         case '1,0':
//             directon = RIGHT
//             break
//         case '1,1':
//             directon = BOTTOM_RIGHT
//             break
//         case '0,1':
//             directon = BOTTOM
//             break
//         case '-1,1':
//             directon = BOTTOM_LEFT
//             break
//         case '-1,0':
//             directon = LEFT
//             break
//         case '-1,-1':
//             directon = TOP_LEFT
//             break
//     }
//
//     return directon;
// }

// TOP         : 1,
// TOP_RIGHT   : 2,
// RIGHT       : 3,
// BOTTOM_RIGHT: 4,
// BOTTOM      : 5,
// BOTTOM_LEFT : 6,
// LEFT        : 7,
// TOP_LEFT    : 8,