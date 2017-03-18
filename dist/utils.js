'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this should be a collection of useful functions,
 * they should be as general as they can be, so we can use them as often as possible
 **/
global.utils = {
  /**
   * return object.length if exist else return _.size
   *
   * @param {Array} object
   * @returns {*}
   */
  returnLength: function returnLength(object) {
    return object && object.length ? object.length : _.size(object);
  },

  checkPlayers: function checkPlayers() {
    for (var name in Memory.players) {
      var player = Memory.players[name];
      if (player.name === undefined) {
        player.name = name;
        console.log('Missing name: ' + name);
      }
      if (player.counter === undefined) {
        player.counter = 0;
        console.log('Missing counter: ' + name);
      }

      if (player.level === undefined) {
        player.level = 0;
        console.log('Missing level: ' + name);
      }
      if (player.idiot === undefined) {
        player.idiot = 0;
        console.log('Missing idiot: ' + name);
      }
    }
  },

  roomCheck: function roomCheck() {
    for (var roomName in Memory.rooms) {
      if (Memory.rooms[roomName].state === 'Occupied') {
        console.log(roomName + ' ' + Memory.rooms[roomName].player);
      }
    }
  },

  terminals: function terminals() {
    console.log('Terminals:');
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
      if (room.terminal) {
        console.log(roomName + ' ' + (0, _stringify2.default)(room.terminal.store));
      }
    }
  },

  csstats: function csstats() {
    var aggregate = function aggregate(result, value, key) {
      result[value.pos.roomName] = (result[value.pos.roomName] || (result[value.pos.roomName] = 0)) + 1;
      return result;
    };
    var resultReduce = _.reduce(Game.constructionSites, aggregate, {});
    console.log((0, _stringify2.default)(resultReduce));
  },

  memory: function memory() {
    for (var keys in Memory) {
      console.log(keys, (0, _stringify2.default)(Memory[keys]).length);
    }
  },

  memoryRooms: function memoryRooms() {
    for (var keys in Memory.rooms) {
      console.log(keys, (0, _stringify2.default)(Memory.rooms[keys]).length);
    }
  },

  memoryRoom: function memoryRoom(roomName) {
    for (var keys in Memory.rooms[roomName]) {
      console.log(keys, (0, _stringify2.default)(Memory.rooms[roomName][keys]).length);
    }
  },

  showReserveredRooms: function showReserveredRooms() {
    for (var roomName in Memory.rooms) {
      var room = Memory.rooms[roomName];
      if (room.state === 'Reserved') {
        console.log(roomName, (0, _stringify2.default)(room.reservation));
      }
    }
  },

  checkMinerals: function checkMinerals() {
    var minerals = {};
    for (var _iterator2 = Memory.myRooms, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      var name = _ref2;

      var room = Game.rooms[name];
      if (room.terminal) {
        console.log(name, (0, _stringify2.default)(room.terminal.store));
        for (var mineral in room.terminal.store) {
          if (mineral === 'U') {
            console.log(room.name, room.terminal.store[mineral]);
          }
          if (!minerals[mineral]) {
            minerals[mineral] = room.terminal.store[mineral];
          } else {
            minerals[mineral] += room.terminal.store[mineral];
          }
        }
      }
    }

    console.log((0, _stringify2.default)(minerals));
    console.log(minerals.U);
  },

  findRoomsWithMineralsToTransfer: function findRoomsWithMineralsToTransfer() {
    var minerals = {};
    for (var _iterator3 = Memory.myRooms, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) {
          break;
        }

        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();

        if (_i3.done) {
          break;
        }

        _ref3 = _i3.value;
      }

      var name = _ref3;

      var room = Game.rooms[name];
      if (room.terminal) {
        if (room.terminal.store.energy < 10000) {
          continue;
        }
        console.log(name, (0, _stringify2.default)(room.terminal.store));
        for (var mineral in room.terminal.store) {
          if (mineral === 'U') {
            console.log(room.name, room.terminal.store[mineral]);
          }
          if (!minerals[mineral]) {
            minerals[mineral] = room.terminal.store[mineral];
          } else {
            minerals[mineral] += room.terminal.store[mineral];
          }
        }
      }
    }

    console.log((0, _stringify2.default)(minerals));
    console.log(minerals.U);
  },

  queueCheck: function queueCheck(roomName) {
    // todo move to global.utils
    // todo save functions by prop so creation should only be once
    var prop = function prop(_prop) {
      return function (object) {
        return object[_prop];
      };
    };

    var found = _.countBy(Memory.rooms[roomName].queue, prop('role'));
    console.log((0, _stringify2.default)(found));
    return found;
  },

  stringToParts: function stringToParts(stringParts) {
    if (!stringParts || typeof stringParts !== 'string') {
      return;
    }
    var partsConversion = {
      M: MOVE,
      C: CARRY,
      A: ATTACK,
      W: WORK,
      R: RANGED_ATTACK,
      T: TOUGH,
      H: HEAL,
      K: CLAIM
    };
    var arrayParts = [];
    for (var i = 0; i < stringParts.length; i++) {
      arrayParts.push(partsConversion[stringParts.charAt(i)]);
    }
    return arrayParts;
  }
};