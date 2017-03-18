'use strict';

/*
 * scoutnextroom is called when the number of rooms is < possible rooms
 *
 * Random walk to find a room with 'threshold' distance and two sources.
 * Claims the controller and room revive will drop in.
 */

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.scoutnextroom = {};

roles.scoutnextroom.settings = {
  layoutString: 'MK',
  maxLayoutAmount: 1
};

roles.scoutnextroom.execute = function (creep) {
  creep.notifyWhenAttacked(false);
  if (creep.memory.claimRoom) {
    creep.moveTo(creep.room.controller);
    var _returnCode = creep.claimController(creep.room.controller);
    if (_returnCode === OK) {
      delete Memory.next_room;
      creep.suicide();
    }
    return true;
  }

  if (!creep.memory.target || creep.memory.target === null || creep.memory.target.roomName != creep.room.name) {
    var hostileCreeps = creep.room.getEnemys();

    var opponentRoom = hostileCreeps.length > 0;
    if (!creep.inBase()) {
      opponentRoom = opponentRoom || creep.room.controller && creep.room.controller.my;

      // TODO No way to controller doesn't mean it is an opponentRoom
      //      if (creep.room.controller) {
      //        var path = creep.pos.findPathTo(creep.room.controller.pos);
      //        if (path.length === 0) {
      //          creep.log('Can not find way to controller');
      //          opponentRoom = true;
      //        } else {
      //
      //          let lastPos = path[path.length - 1];
      //          if (!creep.room.controller.pos.isEqualTo(lastPos.x, lastPos.y)) {
      //            creep.log('Can not find way to controller');
      //            opponentRoom = true;
      //          }
      //        }
      //      }
    }

    var checkNewRoom = function checkNewRoom(creep, opponentRoom) {
      if (creep.inBase()) {
        return false;
      }

      if (opponentRoom) {
        return false;
      }

      var targets = [];
      if (!creep.room.controller) {
        creep.log('No controller');
        return false;
      }
      var sources = creep.room.find(FIND_SOURCES);
      if (sources.length < 2) {
        creep.log('Not enough sources');
        return false;
      }

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

        var _roomName = _ref;

        var distance = Game.map.getRoomLinearDistance(creep.room.name, _roomName);
        if (distance < config.nextRoom.minNewRoomDistance) {
          creep.log('To close to: ' + _roomName + ' ' + distance);
          return false;
        }
      }

      creep.memory.claimRoom = true;
      creep.moveTo(creep.room.controller.pos);
      creep.log('claim');
      return true;
    };

    if (checkNewRoom(creep, opponentRoom)) {
      return true;
    }
    var exits = Game.map.describeExits(creep.room.name);

    var handleTarget = function handleTarget(creep, exits) {
      var offset = Math.floor(Math.random() * 4);

      if (!creep.memory.base) {
        return false;
      }

      for (var i = 0; i < 4; i++) {
        // Don't go back
        var direction = (offset + i) % 4 * 2 + 1;
        if (direction === (creep.memory.dir + 4) % 8) {
          continue;
        }

        var roomName = exits[direction];
        if (typeof roomName === 'undefined') {
          continue;
        }

        var exit = creep.room.findExitTo(roomName);
        if (exit === -2) {
          continue;
        }

        var exit_pos = creep.pos.findClosestByPath(exit, {
          ignoreCreeps: true
        });

        if (!exit_pos) {
          continue;
        }

        var route = Game.map.findRoute(creep.memory.base, roomName);
        var max_route = 10;
        if (route.length > max_route) {
          continue;
        }

        // Way blocked
        var _search = PathFinder.search(creep.pos, exit_pos, {
          maxRooms: 1
        });
        if (_search.incomplete) {
          continue;
        }

        creep.memory.target = exit_pos;
        creep.memory.goalRoom = roomName;
        creep.memory.dir = direction;
        return true;
      }
      return false;
    };

    if (opponentRoom || !handleTarget(creep, exits)) {
      // Go back, no other way
      if (!creep.memory.dir) {
        creep.memory.dir = Math.floor(Math.random() * 8);
      }
      var roomName = exits[(creep.memory.dir + 4) % 8];
      if (!roomName) {
        creep.memory.dir = Math.floor(Math.random() * 8);
      }
      var exit_to = creep.room.findExitTo(roomName);
      var exit = creep.pos.findClosestByRange(exit_to);
      creep.memory.target = exit;
      creep.memory.dir = (creep.memory.dir + 4) % 8;
    }
  }

  if (!creep.memory.target) {
    // Still haven't found target, no point in continuing.
    creep.log('Cannot find a target');
    return;
  }

  var targetPosObject = void 0;
  try {
    targetPosObject = new RoomPosition(creep.memory.target.x, creep.memory.target.y, creep.room.name);
  } catch (e) {
    creep.log((0, _stringify2.default)(creep.memory));
    throw e;
  }
  var search = PathFinder.search(creep.pos, {
    pos: targetPosObject,
    range: 1
  }, {
    // TODO Can prevent the creep move through the room (base: W1N7, room: W2N7, private server)
    roomCallback: creep.room.getAvoids(creep.room, {
      //        pos: targetPosObject,
      scout: true
    }),
    maxRooms: 1
  });

  if (search.incomplete || search.path.length === 0) {
    creep.say('incomplete');
    if (creep.isStuck()) {
      delete creep.memory.target;
      delete creep.memory.last;
    } else {
      creep.moveTo(targetPosObject);
    }
    return true;
  }
  creep.say(creep.memory.target.goalRoom);
  var returnCode = creep.move(creep.pos.getDirectionTo(search.path[0]));
};