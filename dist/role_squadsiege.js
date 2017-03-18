'use strict';

/*
 * squadsiege is part of a squad to attack a room
 *
 * Attacks structures, runs away if I will be destroyed (hopefully)
 */

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.squadsiege = {};

roles.squadsiege.settings = {
  layoutString: 'MW',
  maxLayoutAmount: 21
};

roles.squadsiege.preMove = function (creep, directions) {
  if (!directions) {
    return false;
  }
  var posForward = creep.pos.getAdjacentPosition(directions.forwardDirection);
  var structures = posForward.lookFor(LOOK_STRUCTURES);
  for (var _iterator = structures, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) {
        break;
      }

      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();

      if (_i.done) {
        break;
      }

      _ref = _i.value;
    }

    var structure = _ref;

    if (structure.structureType === STRUCTURE_ROAD) {
      continue;
    }
    if (structure.structureType === STRUCTURE_RAMPART && structure.my) {
      continue;
    }

    creep.dismantle(structure);
    creep.say('dismantle');
    break;
  }

  if (!creep.memory.initialized) {
    Memory.squads[creep.memory.squad].siege[creep.id] = {};
    creep.memory.initialized = true;
  }
  var squad = Memory.squads[creep.memory.squad];
  if (squad.action === 'move') {
    if (creep.room.name === squad.moveTarget) {
      var nextExits = creep.room.find(creep.memory.routing.route[creep.memory.routing.routePos].exit);
      var nextExit = nextExits[Math.floor(nextExits.length / 2)];
      var range = creep.pos.getRangeTo(nextExit.x, nextExit.y);
      if (range < 2) {
        Memory.squads[creep.memory.squad].siege[creep.id].waiting = true;
        creep.moveRandom();
        return true;
      }
    }
  }
  return false;
};

//TODO need to check if it works
roles.squadsiege.action = function (creep) {
  creep.siege();
};

roles.squadsiege.execute = function (creep) {
  creep.log('Execute!!!');
};