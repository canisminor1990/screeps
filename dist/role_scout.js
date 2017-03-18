'use strict';

/*
 * scout moves around to provide visibility
 *
 * Pre observer the scout moves through surrounding rooms
 */

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.scout = {};
roles.scout.settings = {
  layoutString: 'M',
  maxLayoutAmount: 1
};

function onBorder(creep) {
  return creep.pos.x === 49 || creep.pos.x === 0 || creep.pos.y === 49 || creep.pos.y === 0;
}

function haveNotSeen(creep, room) {
  return creep.memory.search.seen.indexOf(room) === -1 && creep.memory.skip.indexOf(room) === -1;
}

roles.scout.execute = function (creep) {
  if (creep.memory.skip === undefined) {
    creep.memory.skip = [];
  }
  var breadthFirstSearch = function breadthFirstSearch(creep) {
    var setNewTarget = function setNewTarget(creep) {
      for (var _iterator = creep.memory.search.levels[creep.memory.search.level], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

        if (haveNotSeen(creep, room)) {
          creep.memory.search.target = room;
          return true;
        }
      }
      return false;
    };
    if (!creep.memory.search) {
      creep.memory.search = {};
      creep.memory.search.seen = [creep.room.name];
      creep.memory.search.level = 1;
      creep.memory.search.levels = [[creep.room.name], []];
      var rooms = Game.map.describeExits(creep.room.name);
      for (var direction in rooms) {
        creep.memory.search.levels[1].push(rooms[direction]);
        creep.memory.search.target = rooms[direction];
      }
    }

    if (creep.memory.scoutSkip || creep.room.name === creep.memory.search.target) {
      if (creep.memory.scoutSkip) {
        creep.memory.skip.push(creep.memory.search.target);
        delete creep.memory.scoutSkip;
      } else {
        creep.memory.search.seen.push(creep.room.name);
      }
      if (!setNewTarget(creep)) {
        creep.memory.search.levels.push([]);
        for (var _iterator2 = creep.memory.search.levels[creep.memory.search.level], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

          var room = _ref2;

          var _rooms = Game.map.describeExits(room);
          for (var _direction in _rooms) {
            var roomNext = _rooms[_direction];
            if (haveNotSeen(creep, roomNext)) {
              creep.memory.search.levels[creep.memory.search.level + 1].push(roomNext);
              creep.memory.search.target = roomNext;
            }
          }
        }
        creep.memory.search.level++;
      }
    }

    if (!creep.memory.search.target) {
      creep.log('Suiciding: ' + (0, _stringify2.default)(creep.memory.search));
      creep.suicide();
      return true;
    }
    var targetPosObject = new RoomPosition(25, 25, creep.memory.search.target);

    var search = void 0;

    try {
      search = PathFinder.search(creep.pos, {
        pos: targetPosObject,
        range: 20
      }, {
        roomCallback: creep.room.getCostMatrixCallback(targetPosObject, true)
      });
    } catch (e) {
      creep.log('search: ' + targetPosObject + ' ' + e + ' ' + e.stack);
      // creep.memory.search.seen.push(creep.memory.search.target);
      // // TODO extract to a method
      // if (!setNewTarget(creep)) {
      //   creep.memory.search.levels.push([]);
      //   for (let room of creep.memory.search.levels[creep.memory.search.level]) {
      //     let rooms = Game.map.describeExits(room);
      //     for (let direction in rooms) {
      //       let roomNext = rooms[direction];
      //       if (haveNotSeen(creep, roomNext)) {
      //         creep.memory.search.levels[creep.memory.search.level + 1].push(roomNext);
      //         creep.memory.search.target = roomNext;
      //       }
      //     }
      //   }
      //   creep.memory.search.level++;
      // }
      return false;
    }

    if (search.incomplete || search.path.length === 0 || creep.inBase() && creep.room.memory.misplacedSpawn) {
      creep.say('hello', true);
      //       creep.log(creep.pos + ' ' + targetPosObject + ' ' + JSON.stringify(search));
      if (creep.isStuck() && onBorder(creep)) {
        creep.say('imstuck at the border', true);
        if (config.room.scoutSkipWhenStuck) {
          creep.say('skipping', true);
          creep.memory.scoutSkip = true;
          delete creep.memory.last; // Delete to reset stuckness.
        }
      }
      //if (search.path.length > 0) {
      //creep.move(creep.pos.getDirectionTo(search.path[0]));
      //} else {
      var _returnCode = creep.moveTo(targetPosObject, {
        ignoreCreeps: true,
        costCallback: creep.room.getCostMatrixCallback()
      });
      //}
      return true;
    }
    creep.say(creep.pos.getDirectionTo(search.path[0]));
    var returnCode = creep.move(creep.pos.getDirectionTo(search.path[0]));
  };

  creep.notifyWhenAttacked(false);
  return breadthFirstSearch(creep);
};