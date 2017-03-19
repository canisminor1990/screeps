const roleConfig = {
    number: {
        harvester: [0, 8],
        upgrader: [2],
        builder: [0,2],
        miner: [1, 3],
    },
    body: {//300 + 5 * 5 = 550
        miner: buildBody({move: 1, work: 4, carry: 2}), // 3
        harvester: buildBody({move:6 , work: 1, carry: 3}), // 350
        upgrader: buildBody({move: 1, work: 4, carry: 2}), // 350
        builder: buildBody({move: 6, work: 1, carry: 3}), // 350
    }
}


/*
 "move": 50,
 "work": 100,
 "attack": 80,
 "carry": 50,
 "heal": 250,
 "ranged_attack": 150,
 "tough": 10,
 "claim": 600
 */

function buildBody(obj) {
    let array = [];
    for (let key in obj) {
        for (let num = 0; num < obj[key]; num++) {
            array.push(key)
        }
    }
    return array;
}

export default roleConfig;