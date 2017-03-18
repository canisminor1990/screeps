'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.getCostMatrixCallback = function (end, excludeStructures) {
  var costMatrix = this.getMemoryCostMatrix();
  if (!costMatrix) {
    this.log('getCostMatrixCallback updatePosition: ' + (0, _stringify2.default)(costMatrix));
    this.updatePosition();
    // this.log('costmatrix: ' + JSON.stringify(this.getMemoryCostMatrix()));
  }

  var room = this;
  var callbackInner = function callbackInner(roomName) {
    var costMatrix = room.getMemoryCostMatrix();
    // TODO the ramparts could be within existing walls (at least when converging to the newmovesim
    if (end) {
      costMatrix.set(end.x, end.y, 0);
    }

    if (excludeStructures) {
      // TODO excluding structures, for the case where the spawn is in the wrong spot (I guess this can be handled better)
      var structures = room.find(FIND_STRUCTURES, {
        filter: function filter(object) {
          if (object.structureType == STRUCTURE_RAMPART) {
            return false;
          }
          if (object.structureType == STRUCTURE_ROAD) {
            return false;
          }
          if (object.structureType == STRUCTURE_CONTAINER) {
            return false;
          }
          return true;
        }
      });
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

        costMatrix.set(structure.pos.x, structure.pos.y, config.layout.structureAvoid);
      }
    }
    return costMatrix;
  };
  return callbackInner;
};

Room.prototype.getCostMatrix = function () {
  var costMatrix = new PathFinder.CostMatrix();
  // Keep distance to walls
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      var roomPos = new RoomPosition(x, y, this.name);
      var terrain = roomPos.lookFor(LOOK_TERRAIN)[0];
      var cost = costMatrix.get(x, y);
      if (terrain === 'wall') {
        costMatrix.set(roomPos.x, roomPos.y, 0xFF);
        for (var i = 1; i < 9; i++) {
          var pos = new RoomPosition(x, y, this.name).getAdjacentPosition(i);
          costMatrix.set(pos.x, pos.y, Math.max(costMatrix.get(pos.x, pos.y), config.layout.wallAvoid));
        }
      }
    }
  }

  for (var _i2 = 0; _i2 < 50; _i2++) {
    var value = config.layout.borderAvoid;
    costMatrix.set(_i2, 0, Math.max(costMatrix.get(_i2, 0), 0xFF));
    costMatrix.set(_i2, 49, Math.max(costMatrix.get(_i2, 49), 0xFF));
    costMatrix.set(0, _i2, Math.max(costMatrix.get(0, _i2), 0xFF));
    costMatrix.set(49, _i2, Math.max(costMatrix.get(49, _i2), 0xFF));

    for (var j = 1; j < 5; j++) {
      costMatrix.set(_i2, 0 + j, Math.max(costMatrix.get(_i2, 0 + j), value));
      costMatrix.set(_i2, 49 - j, Math.max(costMatrix.get(_i2, 49 - j), value));
      costMatrix.set(0 + j, _i2, Math.max(costMatrix.get(0 + j, _i2), value));
      costMatrix.set(49 - j, _i2, Math.max(costMatrix.get(49 - j, _i2), value));
    }
  }

  return costMatrix;
};

Room.prototype.getAvoids = function (target, inRoom) {
  var _this = this;

  var costMatrix = this.getMemoryCostMatrix();
  if (!costMatrix) {
    this.log('get avoids No costmatrix.base?');
    this.updatePosition();
  }

  var room = this;
  var callback = function callback(roomName) {
    var costMatrix = PathFinder.CostMatrix.deserialize(room.memory.costMatrix.base);
    if (target && target.pos) {
      costMatrix.set(target.pos.x, target.pos.y, 0);
    }

    var structures = _this.findPropertyFilter(FIND_STRUCTURES, 'structureType', [STRUCTURE_RAMPART, STRUCTURE_ROAD], true);
    for (var _iterator2 = structures, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i3 >= _iterator2.length) {
          break;
        }

        _ref2 = _iterator2[_i3++];
      } else {
        _i3 = _iterator2.next();

        if (_i3.done) {
          break;
        }

        _ref2 = _i3.value;
      }

      var _structure = _ref2;

      costMatrix.set(_structure.pos.x, _structure.pos.y, 255);
    }

    // Noobie walls
    var walls = room.find(FIND_STRUCTURES, {
      filter: function filter(object) {
        if (object.structureType == STRUCTURE_WALL && !object.hits) {
          return true;
        }
        return false;
      }
    });
    for (var _iterator3 = walls, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i4 >= _iterator3.length) {
          break;
        }

        _ref3 = _iterator3[_i4++];
      } else {
        _i4 = _iterator3.next();

        if (_i4.done) {
          break;
        }

        _ref3 = _i4.value;
      }

      var wall = _ref3;

      costMatrix.set(wall.pos.x, wall.pos.y, 255);
    }

    if (target && target.scout) {
      var _structures = room.find(FIND_STRUCTURES, {
        filter: function filter(object) {
          if (object.structureType == STRUCTURE_WALL) {
            return true;
          }
          return false;
        }
      });
      for (var _iterator4 = _structures, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
        var _ref4;

        if (_isArray4) {
          if (_i5 >= _iterator4.length) {
            break;
          }

          _ref4 = _iterator4[_i5++];
        } else {
          _i5 = _iterator4.next();

          if (_i5.done) {
            break;
          }

          _ref4 = _i5.value;
        }

        var structure = _ref4;

        costMatrix.set(structure.pos.x, structure.pos.y, 255);
      }
    }
    return costMatrix;
  };
  return callback;
};