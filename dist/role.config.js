"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var roleConfig = {
    number: {
        harvester: 8,
        upgrader: 1,
        builder: 1,
        miner: 0
    },
    body: {
        miner: [MOVE, WORK, WORK, CARRY],
        harvester: [MOVE, MOVE, MOVE, WORK, CARRY],
        upgrader: [MOVE, MOVE, CARRY, CARRY, WORK],
        builder: [MOVE, MOVE, MOVE, WORK, CARRY]
    }
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