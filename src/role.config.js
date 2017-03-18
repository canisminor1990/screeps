const roleConfig = {
    number: {
        harvester: [0, 8],
        upgrader: [1],
        builder: [0,1],
        miner: [1, 2],
    },
    body: {
        miner: buildBody({move: 1, work: 2, carry: 2}),
        harvester: buildBody({move: 3, work: 1, carry: 1}),
        upgrader: buildBody({move: 1, work: 1, carry: 3}),
        builder: buildBody({move: 3, work: 1, carry: 1}),
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