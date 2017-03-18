'use strict';

/*
 * reserver is used to reserve controller in external harvesting rooms
 *
 * Moves to the controller and reserves
 * Currently checks if there are enough sourcer and maybe trigger a defender.
 */

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.reserver = {};
roles.reserver.killPrevious = true;
// TODO should be true, but flee must be fixed  (2016-10-13)
roles.reserver.flee = false;

roles.reserver.settings = {
  layoutString: 'MK',
  maxLayoutAmout: 1
};
roles.reserver.updateSettings = function (room, creep) {
  var level = creep.level ? creep.level : 1;
  if (level === 5) {
    room.log('Build super reserver');
    return {
      amount: [5, 5]
    };
  }
};

roles.reserver.action = function (creep) {
  if (!creep.memory.routing.targetId) {
    // TODO check when this happens and fix it
    creep.log('creep_reserver.action No targetId !!!!!!!!!!!' + (0, _stringify2.default)(creep.memory));
    if (creep.room.name === creep.memory.routing.targetRoom) {
      creep.memory.routing.targetId = creep.room.controller.id;
    }
  }

  // TODO this should be enabled, because the reserver should flee without being attacked
  creep.notifyWhenAttacked(false);

  creep.handleReserver();
  return true;
};

roles.reserver.execute = function (creep) {
  creep.log('Execute!!!');
};