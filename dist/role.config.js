'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    number: {
        miner: 0,
        harvester: 8,
        upgrader: 1,
        builder: 1
    },
    body: {
        miner: buildBody({ move: 1, work: 2, carry: 1 }),
        harvester: buildBody({ move: 3, work: 1, carry: 1 }),
        upgrader: buildBody({ move: 1, work: 1, carry: 3 }),
        builder: buildBody({ move: 3, work: 1, carry: 1 })
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
        var keyType = void 0;
        switch (key) {
            case 'work':
                keyType = WORK;
                break;
            case 'move':
                keyType = MOVE;
                break;
            case 'attack':
                keyType = ATTACK;
                break;
            case 'ganged_attack':
                keyType = RANGED_ATTACK;
                break;
            case 'heal':
                keyType = HEAL;
                break;
            case 'claim':
                keyType = CLAIM;
                break;
            case 'tough':
                keyType = TOUGH;
                break;
        }

        for (var num = 0; num < obj[key]; num++) {
            array.push(keyType);
        }

        return array;
    }
}
module.exports = exports['default'];