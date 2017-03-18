'use strict';

/*
 * structurer is called when there are structures in a reserved room
 *
 * Checks the paths for blocking structures => dismantles them
 * Searches for other structures => dismantles them
 * If there is 'threshold' energy below structurer => call a carry
 */

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.structurer = {};
roles.structurer.boostActions = ['dismantle'];

roles.structurer.settings = {
  layoutString: 'MW',
  amount: [5, 5]
};

roles.structurer.preMove = function (creep, directions) {
  if (creep.room.name === creep.memory.routing.targetRoom) {
    var target = Game.getObjectById(creep.memory.routing.targetId);
    if (target === null) {
      creep.log('Invalid target');
      delete creep.memory.routing.targetId;
    }

    if (directions && directions.forwardDirection) {
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
    }
  }

  // Routing would end within the wall - this is the fix for that
  if (creep.memory.routing.targetId && creep.room.name === creep.memory.routing.targetRoom) {
    var _target = Game.getObjectById(creep.memory.routing.targetId);
    if (_target === null) {
      delete creep.memory.routing.targetId;
      return true;
    }
    if (creep.pos.getRangeTo(_target.pos) <= 1) {
      creep.memory.routing.reached = true;
    }
  }
};

roles.structurer.action = function (creep) {
  if (!creep.room.controller || !creep.room.controller.my) {
    var structure;
    structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function filter(object) {
        if (object.ticksToDecay === null) {
          return false;
        }
        if (object.structureType === 'controller') {
          return false;
        }
        if (object.structureType === 'road') {
          return false;
        }
        return true;
      }
    });
    creep.dismantle(structure);
  }

  creep.spawnReplacement(1);
  creep.handleStructurer();
  return true;
};

roles.structurer.execute = function (creep) {
  creep.log('Execute!!!');
  if (!creep.memory.routing.targetId) {
    return creep.cleanSetTargetId();
  }
};