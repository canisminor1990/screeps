'use strict';

/*
 * storagefiller should be present on RCL > 4
 *
 * Normal:
 * Gets the energy from the link and transfers it to the tower of storage
 *
 * Under attack:
 * Gets the energy from the storage and transfers it to the link
 */

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.storagefiller = {};
roles.storagefiller.killPrevious = true;

roles.storagefiller.settings = {
  layoutString: 'MC',
  amount: [1, 4]
};

roles.storagefiller.action = function (creep) {
  if (!creep.memory.routing.targetId && creep.memory.routing.reached) {
    creep.memory.routing.reached = false;
    creep.memory.routing.targetId = 'filler';
  }
  if (creep.memory.routing.reached && creep.memory.routing.pathPos === 0) {
    creep.memory.routing.reached = false;
  }

  creep.setNextSpawn();
  creep.spawnReplacement(1);

  var towers = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
    filter: function filter(object) {
      if (object.structureType != STRUCTURE_TOWER) {
        return false;
      }
      if (object.energy > 0.5 * object.energyCapacity) {
        return false;
      }
      return true;
    }
  });

  if (creep.room.controller.level === 4) {
    if (towers.length > 0) {
      if (creep.carry.energy === 0) {
        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
      } else {
        creep.transfer(towers[0], RESOURCE_ENERGY);
      }
    }
  }

  if (!creep.memory.link) {
    var links = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
      filter: {
        structureType: STRUCTURE_LINK
      }
    });
    if (links.length === 0) {
      return true;
    }
    creep.memory.link = links[0].id;
  }

  var storage = creep.room.storage;
  var link = Game.getObjectById(creep.memory.link);
  if (link === null) {
    //creep.log('No link');
    return true;
  }

  var room = Game.rooms[creep.room.name];
  if (room.memory.attackTimer > 50 && room.controller.level > 6) {
    creep.withdraw(storage, RESOURCE_ENERGY);
    for (var _iterator = towers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

      var tower = _ref;

      var returnCode = creep.transfer(tower, RESOURCE_ENERGY);
      if (returnCode === OK) {
        return true;
      }
    }
    creep.transfer(link, RESOURCE_ENERGY);
  } else {
    link.transferEnergy(creep);
    for (var _iterator2 = towers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) {
          break;
        }

        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();

        if (_i2.done) {
          break;
        }

        _ref2 = _i2.value;
      }

      var _tower = _ref2;

      var _returnCode = creep.transfer(_tower, RESOURCE_ENERGY);
      if (_returnCode === OK) {
        return true;
      }
    }
    for (var resource in creep.carry) {
      creep.transfer(storage, resource);
    }
  }
  return true;
};

roles.storagefiller.execute = function (creep) {
  //  creep.log('Execute called, why?');
  //  creep.log(new Error().stack);
};