"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var role = {
    number: {
        claim: [1],
        farMiner: [1],
        farHarvester: [5],
        harvester: [0, 6],
        upgrader: [2],
        builder: [0, 3],
        miner: [1, 2],
        cleaner: [1]
    },
    body: { //300 + 5 * 5 = 550
        claim: { move: 1, claim: 1 },
        farMiner: { move: 3, work: 4, carry: 3 }, // 3
        farHarvester: { move: 3, work: 1, carry: 4 }, // 350
        harvester: { move: 2, work: 1, carry: 5 }, // 350
        upgrader: { move: 1, work: 2, carry: 2 }, // 350
        builder: { move: 3, work: 2, carry: 2 }, // 350
        miner: { move: 2, work: 4, carry: 2 }, // 3
        cleaner: { move: 2, work: 1, carry: 2 } }
};

var repair = function repair(structure) {
    return structure.hits / structure.hitsMax < 0.5 && structure.hits < 6000;
};

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

exports.default = {
    role: role,
    repair: repair
};
module.exports = exports["default"];