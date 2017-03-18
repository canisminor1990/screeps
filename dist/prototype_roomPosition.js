'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

RoomPosition.prototype.findInRangeStructures = function (structures, range, structureTypes) {
  return this.findInRangeStructures(FIND_STRUCTURES, 1, {
    filter: function filter(object) {
      return structureTypes.indexOf(object.structureType) >= 0;
    }
  });
};

RoomPosition.prototype.findClosestStructure = function (structures, structureType) {
  return this.findClosestByPath(structures, {
    filter: function filter(object) {
      return object.structureType === structureType;
    }
  });
};

RoomPosition.prototype.getAdjacentPosition = function (direction) {
  var adjacentPos = [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
  return new RoomPosition(this.x + adjacentPos[direction][0], this.y + adjacentPos[direction][1], this.roomName);
};

RoomPosition.prototype.checkForWall = function () {
  return this.lookFor(LOOK_TERRAIN)[0] === 'wall';
};

RoomPosition.prototype.inPath = function () {
  var room = Game.rooms[this.roomName];
  for (var pathName in room.getMemoryPaths()) {
    var path = room.getMemoryPath(pathName);
    for (var _iterator = path, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

      var pos = _ref;

      if (this.isEqualTo(pos.x, pos.y)) {
        return true;
      }
    }
  }
  return false;
};

RoomPosition.prototype.inPositions = function () {
  var room = Game.rooms[this.roomName];

  if (!room.memory.position) {
    return false;
  }

  for (var creepId in room.memory.position.creep) {
    var pos = room.memory.position.creep[creepId];
    if (!pos) {
      // TODO introduce this.log()
      console.log('inPositions:', this.roomName, creepId);
      continue;
    }
    if (this.isEqualTo(pos.x, pos.y)) {
      return true;
    }
  }
  for (var structureId in room.memory.position.structure) {
    var poss = room.memory.position.structure[structureId];
    for (var _iterator2 = poss, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      var _pos = _ref2;

      // TODO special case e.g. when powerSpawn can't be set on costmatrix.setup - need to be fixed there
      if (!_pos) {
        continue;
      }
      if (this.isEqualTo(_pos.x, _pos.y)) {
        return true;
      }
    }
  }

  return false;
};

RoomPosition.prototype.isExit = function () {
  if (this.x <= 1 || this.x >= 48 || this.y <= 1 || this.y >= 48) {
    return true;
  }
  return false;
};

RoomPosition.prototype.validPosition = function () {
  if (this.isExit()) {
    return false;
  }
  if (this.checkForWall()) {
    return false;
  }
  if (this.inPositions()) {
    return false;
  }
  if (this.inPath()) {
    return false;
  }
  return true;
};

RoomPosition.prototype.buildRoomPosition = function (direction, distance) {
  if (distance > 1) {
    console.log('!!!! Distance > 1 not yet implemented');
  }
  return this.getAdjacentPosition((direction - 1) % 8 + 1);
};

RoomPosition.prototype.findNearPosition = _regenerator2.default.mark(function _callee() {
  var distanceMax, distance, direction, posNew;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          distanceMax = 1;
          distance = 1;

        case 2:
          if (!(distance <= distanceMax)) {
            _context.next = 16;
            break;
          }

          direction = 1;

        case 4:
          if (!(direction <= 8 * distance)) {
            _context.next = 13;
            break;
          }

          posNew = this.buildRoomPosition(direction, distance);

          if (posNew.validPosition()) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('continue', 10);

        case 8:
          _context.next = 10;
          return posNew;

        case 10:
          direction++;
          _context.next = 4;
          break;

        case 13:
          distance++;
          _context.next = 2;
          break;

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
});