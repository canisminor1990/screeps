const role = {
    number: {
        claim: [2],
        farMiner: [1],
        farHarvester: [5],
        harvester: [0, 6],
        upgrader: [3],
        builder: [0, 3],
        miner: [1, 2],
        cleaner: [1],
    },
    body: {//300 + 5 * 5 = 550
        claim: {move: 1, claim: 1},
        farMiner: {move: 3, work: 4, carry: 3}, // 3
        farHarvester: {move: 4, work: 1, carry: 4}, // 350
        harvester: {move: 3, work: 1, carry: 5}, // 350
        upgrader: {move: 1, work: 2, carry: 2}, // 350
        builder: {move: 3, work: 3, carry: 3}, // 350
        miner: {move: 2, work: 4, carry: 2}, // 3
        cleaner: {move: 2, work: 1, carry: 2}, // 350
    }
}

const repair = (structure) => (structure.hits / structure.hitsMax) < 0.5 && structure.hits < 100000

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
    role: role,
    repair: repair,
};