"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var roleConfig = {
    number: {
        harvester: [0, 12],
        upgrader: [2],
        builder: [0, 2],
        miner: [1, 3]
    },
    body: {
        miner: buildBody({ move: 1, work: 2, carry: 2 }), // 350
        harvester: buildBody({ move: 3, work: 1, carry: 2 }), // 350
        upgrader: buildBody({ move: 1, work: 2, carry: 2 }), // 350
        builder: buildBody({ move: 3, work: 1, carry: 2 }) }
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

function buildBody(obj) {
    var array = [];
    for (var key in obj) {
        for (var num = 0; num < obj[key]; num++) {
            array.push(key);
        }
    }
    return array;
}

exports.default = roleConfig;
module.exports = exports["default"];