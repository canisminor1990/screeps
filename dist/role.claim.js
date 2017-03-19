'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep) {
    "use strict";

    var controller = Game.getObjectById('5873bc3511e3e4361b4d738f');
    creep.claimController(controller) == ERR_NOT_IN_RANGE ? creep.moveTo(controller, {
        reusePath: 8,
        visualizePathStyle: { stroke: '#ffffff' }
    }) : null;
};

module.exports = exports['default'];