'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

brain.handleNextroom = function () {
  if (Memory.myRooms && Memory.myRooms.length < Game.gcl.level && Memory.myRooms.length < config.nextRoom.maxRooms) {
    if (Game.time % config.nextRoom.ttlPerRoomForScout === 0) {
      for (var _iterator = Memory.myRooms, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

        var roomName = _ref;

        var room = Game.rooms[roomName];
        if (room.memory.queue && room.memory.queue.length > 3) {
          continue;
        }
        if (room.controller.level < config.nextRoom.scoutMinControllerLevel) {
          continue;
        }
        if (config.nextRoom.notify) {
          Game.notify('Searching for a new room from ' + room.name);
        }
        console.log('Searching for a new room from ' + room.name);
        room.memory.queue.push({
          role: 'scoutnextroom'
        });
      }
    }
  }
};