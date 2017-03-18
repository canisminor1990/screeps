'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.isRoomUnderAttack = function (roomName) {
  if (!Memory.rooms[roomName]) {
    return false;
  }

  if (!Memory.rooms[roomName].hostile) {
    return false;
  }

  if (Game.time - Memory.rooms[roomName].hostile.lastUpdate > config.hostile.remeberInRoom) {
    delete Memory.rooms[roomName].hostile;
    var room = Game.rooms[roomName];
    room.log('newmove: isRoomUnderAttack: lastUpdate too old');
    return false;
  }

  // Maybe also add? Rethink wayBlocked
  //	    if (this.memory.role === 'nextroomer' && Game.rooms[this.memory.target]) {
  //	      Game.rooms[this.memory.target].memory.wayBlocked = true;
  //	    }

  return true;
};

Room.prototype.setFillerArea = function (storagePos, costMatrixBase, route) {
  var fillerPosIterator = storagePos.findNearPosition();
  for (var _iterator = fillerPosIterator, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var fillerPos = _ref;

    this.memory.position.creep.filler = fillerPos;

    // TODO Bug in E37N35 path was different compared to the fillerPos. costMatrix should be resetted, too
    this.deleteMemoryPath('pathStart-filler');

    var pathFiller = this.getPath(route, 0, 'pathStart', 'filler', true);
    for (var _iterator2 = pathFiller, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      costMatrixBase.set(pos.x, pos.y, config.layout.pathAvoid);
    }
    this.setMemoryCostMatrix(costMatrixBase);

    var linkStoragePosIterator = fillerPos.findNearPosition();
    for (var _iterator3 = linkStoragePosIterator, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

      var linkStoragePos = _ref3;

      this.memory.position.structure.link.unshift(linkStoragePos);

      var powerSpawnPosIterator = fillerPos.findNearPosition();
      for (var _iterator4 = powerSpawnPosIterator, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) {
            break;
          }

          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();

          if (_i4.done) {
            break;
          }

          _ref4 = _i4.value;
        }

        var powerSpawnPos = _ref4;

        this.memory.position.structure.powerSpawn.push(powerSpawnPos);

        var towerPosIterator = fillerPos.findNearPosition();
        for (var _iterator5 = towerPosIterator, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
          var _ref5;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) {
              break;
            }

            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();

            if (_i5.done) {
              break;
            }

            _ref5 = _i5.value;
          }

          var towerPos = _ref5;

          this.memory.position.structure.tower.push(towerPos);

          costMatrixBase.set(fillerPos.x, fillerPos.x, config.layout.creepAvoid);
          this.setMemoryCostMatrix(costMatrixBase);

          return;
        }
      }
    }
  }
};

Room.prototype.updatePosition = function () {
  // Instead of doing the complete setup, this could also be done on request
  this.log('Update position');
  cache.rooms[this.name] = {};
  delete this.memory.routing;

  var costMatrixBase = this.getCostMatrix();

  this.memory.position = {
    creep: {}
  };
  this.memory.position.structure = {
    storage: [],
    spawn: [],
    extension: [],
    tower: [],
    link: [],
    observer: [],
    lab: [],
    terminal: [],
    nuker: [],
    powerSpawn: [],
    extractor: []
  };

  var sources = this.find(FIND_SOURCES);
  for (var _iterator6 = sources, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
    var _ref6;

    if (_isArray6) {
      if (_i6 >= _iterator6.length) {
        break;
      }

      _ref6 = _iterator6[_i6++];
    } else {
      _i6 = _iterator6.next();

      if (_i6.done) {
        break;
      }

      _ref6 = _i6.value;
    }

    var _source = _ref6;

    var _sourcer2 = _source.pos.findNearPosition().next().value;
    this.memory.position.creep[_source.id] = _sourcer2;
    // TODO E.g. E11S8 it happens that sourcer has no position
    if (_sourcer2) {
      var link = _sourcer2.findNearPosition().next().value;
      this.memory.position.structure.link.push(link);
      costMatrixBase.set(link.x, link.y, config.layout.structureAvoid);
      this.setMemoryCostMatrix(costMatrixBase);
    }
  }

  var minerals = this.find(FIND_MINERALS);
  for (var _iterator7 = minerals, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
    var _ref7;

    if (_isArray7) {
      if (_i7 >= _iterator7.length) {
        break;
      }

      _ref7 = _iterator7[_i7++];
    } else {
      _i7 = _iterator7.next();

      if (_i7.done) {
        break;
      }

      _ref7 = _i7.value;
    }

    var _mineral = _ref7;

    var extractor = _mineral.pos.findNearPosition().next().value;
    this.memory.position.creep[_mineral.id] = extractor;
    costMatrixBase.set(extractor.x, extractor.y, config.layout.creepAvoid);
    this.setMemoryCostMatrix(costMatrixBase);
  }

  if (this.controller) {
    for (var _iterator8 = minerals, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
      var _ref8;

      if (_isArray8) {
        if (_i8 >= _iterator8.length) {
          break;
        }

        _ref8 = _iterator8[_i8++];
      } else {
        _i8 = _iterator8.next();

        if (_i8.done) {
          break;
        }

        _ref8 = _i8.value;
      }

      var mineral = _ref8;

      this.memory.position.structure.extractor.push(mineral.pos);
    }

    var upgraderPos = this.controller.pos.findNearPosition().next().value;
    this.memory.position.creep[this.controller.id] = upgraderPos;
    costMatrixBase.set(upgraderPos.x, upgraderPos.y, config.layout.creepAvoid);
    this.setMemoryCostMatrix(costMatrixBase);

    var storagePos = this.memory.position.creep[this.controller.id].findNearPosition().next().value;
    this.memory.position.structure.storage.push(storagePos);
    // TODO should also be done for the other structures
    costMatrixBase.set(storagePos.x, storagePos.y, config.layout.structureAvoid);
    this.setMemoryCostMatrix(costMatrixBase);

    this.memory.position.creep.pathStart = storagePos.findNearPosition().next().value;

    var route = [{
      room: this.name
    }];
    var pathUpgrader = this.getPath(route, 0, 'pathStart', this.controller.id, true);
    // TODO exclude the last position (creepAvoid) in all paths
    for (var _iterator9 = pathUpgrader, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
      var _ref9;

      if (_isArray9) {
        if (_i9 >= _iterator9.length) {
          break;
        }

        _ref9 = _iterator9[_i9++];
      } else {
        _i9 = _iterator9.next();

        if (_i9.done) {
          break;
        }

        _ref9 = _i9.value;
      }

      var pos = _ref9;

      if (upgraderPos.isEqualTo(pos.x, pos.y)) {
        continue;
      }
      costMatrixBase.set(pos.x, pos.y, config.layout.pathAvoid);
    }
    this.setMemoryCostMatrix(costMatrixBase);

    for (var _iterator10 = sources, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : (0, _getIterator3.default)(_iterator10);;) {
      var _ref10;

      if (_isArray10) {
        if (_i10 >= _iterator10.length) {
          break;
        }

        _ref10 = _iterator10[_i10++];
      } else {
        _i10 = _iterator10.next();

        if (_i10.done) {
          break;
        }

        _ref10 = _i10.value;
      }

      var source = _ref10;

      var _route = [{
        room: this.name
      }];
      var path = this.getPath(_route, 0, 'pathStart', source.id, true);
      for (var _iterator11 = path, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : (0, _getIterator3.default)(_iterator11);;) {
        var _ref11;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) {
            break;
          }

          _ref11 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();

          if (_i11.done) {
            break;
          }

          _ref11 = _i11.value;
        }

        var _pos = _ref11;

        var posObject = new RoomPosition(_pos.x, _pos.y, this.name);
        var _sourcer = this.memory.position.creep[source.id];
        if (posObject.isEqualTo(_sourcer.x, _sourcer.y)) {
          continue;
        }

        costMatrixBase.set(_pos.x, _pos.y, config.layout.pathAvoid);
      }
      var sourcer = this.memory.position.creep[source.id];
      costMatrixBase.set(sourcer.x, sourcer.y, config.layout.creepAvoid);
      this.setMemoryCostMatrix(costMatrixBase);
    }

    this.setFillerArea(storagePos, costMatrixBase, route);
  }

  this.setMemoryCostMatrix(costMatrixBase);
  return costMatrixBase;
};

Room.prototype.getCreepPositionForId = function (to) {
  if (this.memory.position && this.memory.position.creep && this.memory.position.creep[to]) {
    var _pos2 = this.memory.position.creep[to];
    return new RoomPosition(_pos2.x, _pos2.y, this.name);
  }

  var target = Game.getObjectById(to);
  if (target === null) {
    // this.log('getCreepPositionForId: No object: ' + to);
    return;
  }
  this.memory.position = this.memory.position || {
    creep: {}
  };
  this.memory.position.creep[to] = target.pos.findNearPosition().next().value;

  var pos = this.memory.position.creep[to];
  if (!pos) {
    //this.log('getCreepPositionForId no pos in memory take pos of target: ' + to);
    pos = Game.getObjectById(to).pos;
  }
  return new RoomPosition(pos.x, pos.y, this.name);
};

Room.prototype.findRoute = function (from, to) {
  var routeCallback = function routeCallback(roomName, fromRoomName) {
    if (roomName === to) {
      return 1;
    }

    if (Memory.rooms[roomName] && Memory.rooms[roomName].state === 'Occupied') {
      //         console.log(`Creep.prototype.getRoute: Do not route through occupied rooms ${roomName}`);
      if (config.path.allowRoutingThroughFriendRooms && friends.indexOf(Memory.rooms[roomName].player) > -1) {
        console.log('routing through friendly room' + roomName);
        return 1;
      }
      //         console.log('Not routing through enemy room' + roomName);
      return Infinity;
    }

    if (Memory.rooms[roomName] && Memory.rooms[roomName].state === 'Blocked') {
      //         console.log(`Creep.prototype.getRoute: Do not route through blocked rooms ${roomName}`);
      return Infinity;
    }

    return 1;
  };
  return Game.map.findRoute(from, to, {
    routeCallback: routeCallback
  });
};

Room.prototype.buildPath = function (route, routePos, from, to) {
  if (!to) {
    this.log('newmove: buildPath: no to from: ' + from + ' to: ' + to + ' routePos: ' + routePos + ' route: ' + (0, _stringify2.default)(route));
    throw new Error();
  }
  var start = void 0;
  if (routePos === 0 || from === 'pathStart') {
    start = this.getCreepPositionForId(from);
  } else {
    start = this.getMyExitTo(from);
  }
  var end = void 0;
  if (routePos < route.length - 1) {
    end = this.getMyExitTo(to);
  } else {
    end = this.getCreepPositionForId(to);
    if (!end) {
      return;
    }
  }

  // TODO avoid swamps in external rooms
  var callback = this.getMatrixCallback;

  if (this.memory.costMatrix && this.memory.costMatrix.base) {
    var room = this;
    callback = function callback(end) {
      var callbackInner = function callbackInner(roomName) {
        var costMatrix = PathFinder.CostMatrix.deserialize(room.memory.costMatrix.base);
        return costMatrix;
      };
      return callbackInner;
    };
  }

  var search = PathFinder.search(start, {
    pos: end,
    range: 1
  }, {
    roomCallback: callback(end),
    maxRooms: 1,
    swampCost: config.layout.swampCost,
    plainCost: config.layout.plainCost
  });

  search.path.splice(0, 0, start);
  search.path.push(end);
  return search.path;
};

// Providing the targetId is a bit odd
Room.prototype.getPath = function (route, routePos, startId, targetId, fixed) {
  if (!this.memory.position) {
    this.log('getPath no position');
    this.updatePosition();
  }

  var from = startId;
  if (routePos > 0) {
    from = route[routePos - 1].room;
  }
  var to = targetId;
  if (routePos < route.length - 1) {
    to = route[routePos + 1].room;
  }

  var pathName = from + '-' + to;
  if (!this.getMemoryPath(pathName)) {
    var path = this.buildPath(route, routePos, from, to);
    if (!path) {
      // this.log('getPath: No path');
      return;
    }
    this.setMemoryPath(pathName, path, fixed);
  }

  // TODO When switch to global cache is done, this can be removed
  if (!this.cache) {
    this.cache = {};
  }

  var cacheName = this.name + ':' + pathName;
  if (!this.cache[cacheName]) {
    try {
      this.cache[cacheName] = this.getMemoryPath(pathName);
    } catch (e) {
      this.log('Can not parse path in cache will delete Memory');
      delete Memory.rooms[this.name];
    }
  }

  return this.cache[cacheName];
};

Room.prototype.getMyExitTo = function (room) {
  // Handle rooms with newbie zone walls
  var exitDirection = this.findExitTo(room);
  var nextExits = this.find(exitDirection);
  var nextExit = nextExits[Math.floor(nextExits.length / 2)];
  return new RoomPosition(nextExit.x, nextExit.y, this.name);
};

Room.prototype.getMatrixCallback = function (end) {
  // TODO cache?!
  //  console.log('getMatrixCallback', this);
  var callback = function callback(roomName) {
    var room = Game.rooms[roomName];
    var costMatrix = new PathFinder.CostMatrix();
    // Previous Source Keeper where also excluded?

    var sources = room.find(FIND_SOURCES, {
      filter: function filter(object) {
        return !end || object.pos.x != end.x || object.pos.y != end.y;
      }
    });

    for (var _iterator12 = sources, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : (0, _getIterator3.default)(_iterator12);;) {
      var _ref12;

      if (_isArray12) {
        if (_i12 >= _iterator12.length) {
          break;
        }

        _ref12 = _iterator12[_i12++];
      } else {
        _i12 = _iterator12.next();

        if (_i12.done) {
          break;
        }

        _ref12 = _i12.value;
      }

      var source = _ref12;

      for (var _x = -1; _x < 2; _x++) {
        for (var _y = -1; _y < 2; _y++) {
          if (end && source.pos.x + _x === end.x && source.pos.y + _y != end.y) {
            continue;
          }
          costMatrix.set(source.pos.x + _x, source.pos.y + _y, 0xff);
        }
      }
    }

    if (room.controller) {
      for (var x = -1; x < 2; x++) {
        for (var y = -1; y < 2; y++) {
          if (end && room.controller.pos.x + x === end.x && room.controller.pos.y + y != end.y) {
            continue;
          }
          costMatrix.set(room.controller.pos.x + x, room.controller.pos.y + y, 0xff);
        }
      }
    }

    // Ignore walls?
    //    let structures = room.find(FIND_STRUCTURES, {
    //      filter: function(object) {
    //        if (object.structureType === STRUCTURE_ROAD) {
    //          return false;
    //        }
    //        if (object.structureType === STRUCTURE_RAMPART) {
    //          return !object.my;
    //        }
    //        return true;
    //      }
    //    });
    //    for (let structure of structures) {
    //      costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
    //    }
    //    let constructionSites = room.find(FIND_CONSTRUCTION_SITES, {
    //      filter: function(object) {
    //        if (object.structureType === STRUCTURE_ROAD) {
    //          return false;
    //        }
    //        if (object.structureType === STRUCTURE_RAMPART) {
    //          return object.my;
    //        }
    //        return true;
    //      }
    //    });
    //    for (let constructionSite of constructionSites) {
    //      costMatrix.set(constructionSite.pos.x, constructionSite.pos.y, 0xFF);
    //    }
    return costMatrix;
  };

  return callback;
};