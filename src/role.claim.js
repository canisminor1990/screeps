export default (creep) => {
    "use strict";
    const controller = Game.getObjectById('5873bc3511e3e4361b4d738f');
    (creep.reserveController(controller) == ERR_NOT_IN_RANGE) ? creep.moveTo(controller, {
            reusePath: 8,
            visualizePathStyle: {stroke: '#ffffff'}
        }) : null;
}