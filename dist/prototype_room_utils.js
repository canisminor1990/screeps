'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.sortMyRoomsByLinearDistance = function (target) {
  var sortByLinearDistance = function sortByLinearDistance(object) {
    return Game.map.getRoomLinearDistance(target, object);
  };

  return _.sortBy(Memory.myRooms, sortByLinearDistance);
};

Room.prototype.nearestRoomName = function (roomsNames, limit) {
  var roomName = this.name;
  var filterByLinearDistance = function filterByLinearDistance(object) {
    var dist = Game.map.getRoomLinearDistance(roomName, object);
    return dist <= limit;
  };
  roomsNames = _.filter(roomsNames, filterByLinearDistance);
  var sortByLinearDistance = function sortByLinearDistance(object) {
    var dist = Game.map.getRoomLinearDistance(roomName, object);
    return dist;
  };
  return _.min(roomsNames, sortByLinearDistance);
};
/**
 * use a static array for filter a find.
 *
 * @param  {String}  findTarget      one of the FIND constant. e.g. [FIND_MY_STRUCTURES]
 * @param  {String}  property        the property to filter on. e.g. 'structureType'
 * @param  {Array}  properties      the properties to filter. e.g. [STRUCTURE_ROAD, STRUCTURE_RAMPART]
 * @param  {Boolean} [without=false] Exclude or include the properties to find.
 * @return {Array}                  the objects returned in an array.
 */
Room.prototype.findPropertyFilter = function (findTarget, property, properties) {
  var without = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var table = {};
  _.each(properties, function (e) {
    return table[e] = true;
  });
  return this.find(findTarget, {
    filter: function filter(s) {
      return without ? !table[s[property]] : table[s[property]];
    }
  });
};

Room.prototype.closestSpawn = function (target) {
  var pathLength = {};
  var roomsMy = this.sortMyRoomsByLinearDistance(target);

  for (var _iterator = roomsMy, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var room = _ref;

    var route = Game.map.findRoute(room, target);
    var routeLength = global.utils.returnLength(route);

    if (route && routeLength) {
      //TODO @TooAngel please review: save found route from target to myRoom Spawn by shortest route!
      //Memory.rooms[room].routing = Memory.rooms[room].routing || {};
      //Memory.rooms[room].routing[room + '-' + target] = Memory.rooms[room].routing[room + '-' + target] || {
      //    path: room + '-' + route,
      //    created: Game.time,
      //    fixed: false,
      //    name: room + '-' + target,
      //    category: 'moveToByClosestSpawn'
      //  };

      pathLength[room] = {
        room: room,
        route: route,
        length: routeLength
      };
    }
  }

  var shortest = _.sortBy(pathLength, global.utils.returnLength);
  return _.first(shortest).room;
};

Room.prototype.getEnergyCapacityAvailable = function () {
  var offset = 0;
  if (this.memory.misplacedSpawn && this.controller.level === 4) {
    offset = 300;
  }
  return this.energyCapacityAvailable - offset;
};

Room.prototype.splitRoomName = function () {
  var patt = /([A-Z]+)(\d+)([A-Z]+)(\d+)/;
  var result = patt.exec(this.name);
  return result;
};

Room.pathToString = function (path) {
  if (!config.performance.serializePath) {
    return path;
  }

  var result = path[0].roomName + ':';
  result += path[0].x.toString().lpad('0', 2) + path[0].y.toString().lpad('0', 2);
  var last = void 0;
  for (var _iterator2 = path, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

    var pos = _ref2;

    if (!last) {
      last = new RoomPosition(pos.x, pos.y, pos.roomName);
      continue;
    }
    var current = new RoomPosition(pos.x, pos.y, pos.roomName);
    result += last.getDirectionTo(current);
    last = current;
  }
  //   console.log(result);
  return result;
};

Room.stringToPath = function (string) {
  if (!config.performance.serializePath) {
    return string;
  }

  var parts = string.split(':');
  var roomName = parts[0];
  string = parts[1];
  var path = [];
  var x = parseInt(string.slice(0, 2), 10);
  string = string.substring(2);
  var y = parseInt(string.slice(0, 2), 10);
  string = string.substring(2);
  var last = new RoomPosition(x, y, roomName);
  path.push(last);
  for (var _iterator3 = string, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

    var direction = _ref3;

    var current = last.buildRoomPosition(parseInt(direction, 10));
    path.push(current);
    last = current;
  }
  //   console.log(path);
  return path;
};

Room.test = function () {
  var original = Memory.rooms.E37N35.routing['pathStart-harvester'].path;
  var string = Room.pathToString(original);
  var path = Room.stringToPath(string);
  for (var i in Memory.rooms.E37N35.routing['pathStart-harvester'].path) {
    if (original[i].x != path[i].x) {
      console.log('x unequal', i, original[i].x, path[i].x);
    }
    if (original[i].y != path[i].y) {
      console.log('y unequal', i, original[i].y, path[i].y);
    }
    if (original[i].roomName != path[i].roomName) {
      console.log('roomName unequal', i, original[i].roomName, path[i].roomName);
    }
  }
};