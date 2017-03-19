const role = {
    number: {
        harvester: [0, 6],
        upgrader: [2],
        builder: [0, 2],
        miner: [1, 2],
        cleaner: [1],
    },
    body: {//300 + 5 * 5 = 550
        harvester: {move: 3, work: 1, carry: 4}, // 350
        upgrader: {move: 1, work: 2, carry: 2}, // 350
        builder: {move: 3, work: 2, carry: 2}, // 350
        miner: {move: 1, work: 4, carry: 2}, // 3
        cleaner: {move: 3, work: 1, carry: 4}, // 350
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

export default {
    role: role
};