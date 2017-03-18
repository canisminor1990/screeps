'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

RoomPosition.prototype.setSpawn = function (posPath, posNext) {
  // TODO Check distance to other spawns
  var room = Game.rooms[this.roomName];
  if (room.memory.position.structure.spawn.length >= CONTROLLER_STRUCTURES.spawn[8]) {
    return false;
  }

  var pathPosObject = new RoomPosition(posPath.x, posPath.y, this.roomName);
  var directionStructure = pathPosObject.getDirectionTo(this.x, this.y);

  if (directionStructure === BOTTOM) {
    return true;
  }

  if (!posNext) {
    room.log('No posNext: ' + (0, _stringify2.default)(posPath));
    return false;
  }

  var directionNext = pathPosObject.getDirectionTo(posNext.x, posNext.y);

  if (directionNext === RIGHT && directionStructure === BOTTOM_RIGHT) {
    return true;
  }

  if (directionNext === LEFT && directionStructure === BOTTOM_LEFT) {
    return true;
  }

  if (directionNext === TOP_RIGHT && directionStructure === RIGHT) {
    return true;
  }

  if (directionNext === TOP_LEFT && directionStructure === LEFT) {
    return true;
  }

  return false;
};

RoomPosition.prototype.setExtension = function () {
  var room = Game.rooms[this.roomName];
  if (room.memory.position.structure.extension.length >= CONTROLLER_STRUCTURES.extension[8]) {
    return false;
  }
  return true;
};

RoomPosition.prototype.inRamparts = function () {
  var room = Game.rooms[this.roomName];
  for (var _iterator = room.memory.walls.ramparts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var rampart = _ref;

    if (this.isEqualTo(rampart.x, rampart.y)) {
      return true;
    }
  }
};