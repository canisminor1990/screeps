'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.buildBlockers = function () {
  //   this.log('buildBlockers: ' + this.memory.controllerLevel.buildBlockersInterval);

  var spawns = this.findPropertyFilter(FIND_MY_STRUCTURES, 'structureType', [STRUCTURE_SPAWN]);
  if (spawns.length === 0) {
    return false;
  }

  if (this.closeExitsByPath()) {
    return true;
  }
  return this.checkRamparts();
};

Room.prototype.checkRamparts = function () {
  var room = Game.rooms[this.name];
  if (!room.memory.walls) {
    return false;
  }
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

    var pos = new RoomPosition(rampart.x, rampart.y, rampart.roomName);
    pos.createConstructionSite(STRUCTURE_RAMPART);
  }
};

Room.prototype.checkExitsAreReachable = function () {
  // Make sure every exit is reachable

  var inLayer = function inLayer(room, pos) {
    for (var i = 0; i < room.memory.walls.layer_i; i++) {
      for (var j in room.memory.walls.layer[i]) {
        var position = room.memory.walls.layer[i][j];
        if (pos.x === position.x && pos.y === position.y) {
          return true;
        }
      }
    }
    return false;
  };
  var costMatrixBase = this.getMemoryCostMatrix();

  var exits = this.find(FIND_EXIT);
  var room = this;
  var callbackNew = function callbackNew(roomName) {
    var costMatrix = room.getMemoryCostMatrix();
    return costMatrix;
  };
  for (var _iterator2 = exits, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

    var exit = _ref2;

    //     console.log(exit);
    var _room = this;

    var targets = [{
      pos: this.controller.pos,
      range: 1
    }];

    var search = PathFinder.search(exit, targets, {
      roomCallback: callbackNew,
      maxRooms: 1
    });

    if (search.incomplete) {
      search = PathFinder.search(exit, targets, {
        maxRooms: 1
      });
      for (var _iterator3 = search.path, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

        var pathPos = _ref3;

        if (inLayer(this, pathPos)) {
          this.memory.walls.ramparts.push(pathPos);
          costMatrixBase.set(pathPos.x, pathPos.y, 0);
          this.setMemoryCostMatrix(costMatrixBase);
        }
      }
    }
  }
};

Room.prototype.closeExitsByPath = function () {
  var inLayer = function inLayer(room, pos) {
    for (var i = 0; i < room.memory.walls.layer_i; i++) {
      for (var j in room.memory.walls.layer[i]) {
        var position = room.memory.walls.layer[i][j];
        if (pos.isEqualTo(position.x, position.y)) {
          return true;
        }
      }
    }
    return false;
  };

  if (this.memory.walls && this.memory.walls.finished) {
    return false;
  }

  if (!this.memory.walls || !this.memory.walls.layer) {
    this.log('closeExitsByPath: Reset walls');
    this.memory.walls = {
      exit_i: 0,
      ramparts: [],
      layer_i: 0,
      // TODO as array?
      layer: {
        0: []
      }
    };
  }
  if (!this.memory.walls.layer[this.memory.walls.layer_i]) {
    this.memory.walls.layer[this.memory.walls.layer_i] = [];
  }
  this.log('closeExitsByPath layer: ' + this.memory.walls.layer_i + ' exit: ' + this.memory.walls.exit_i + ' walls: ' + this.memory.walls.layer[this.memory.walls.layer_i].length);

  var ignores = [];
  for (var i = 0; i < this.memory.walls.layer_i; i++) {
    ignores = ignores.concat(this.memory.walls.layer[i]);
  }

  var exits = this.find(FIND_EXIT);
  if (this.memory.walls.exit_i >= exits.length) {
    this.memory.walls.exit_i = 0;
    this.memory.walls.layer_i++;
    this.log('Increase layer');
    if (this.memory.walls.layer_i >= config.layout.wallThickness) {
      this.log('Wall setup finished');
      this.memory.walls.finished = true;

      // TODO disabled, too many ramparts
      //       this.checkExitsAreReachable();

      return false;
    }
    return true;
  }

  var room = this;
  var callbackNew = function callbackNew(roomName, costMatrix) {
    if (!costMatrix) {
      costMatrix = new PathFinder.CostMatrix();
    }
    for (var avoidIndex in room.memory.walls.ramparts) {
      var avoidPos = room.memory.walls.ramparts[avoidIndex];
      costMatrix.set(avoidPos.x, avoidPos.y, 0xFF);
    }
    for (var _avoidIndex in room.memory.walls.layer[room.memory.walls.layer_i]) {
      var _avoidPos = room.memory.walls.layer[room.memory.walls.layer_i][_avoidIndex];
      costMatrix.set(_avoidPos.x, _avoidPos.y, 0xFF);
    }

    return costMatrix;
  };

  var exit = exits[this.memory.walls.exit_i];

  var targets = [{
    pos: this.controller.pos,
    range: 1
  }];
  var sources = this.find(FIND_SOURCES);
  for (var sourceId in sources) {
    targets.push({
      pos: sources[sourceId].pos,
      range: 1
    });
  }

  var search = PathFinder.search(exit, targets, {
    roomCallback: callbackNew,
    maxRooms: 1
  });

  if (search.incomplete) {
    this.memory.walls.exit_i++;
    return true;
  }

  var path = search.path;
  var pos_last = path[path.length - 1];
  var posLastObject = new RoomPosition(pos_last.x, pos_last.y, this.name);

  // TODO check if incomplete just solves the issue
  var wayFound = false;
  for (var targetId in targets) {
    if (posLastObject.getRangeTo(targets[targetId]) === 1) {
      wayFound = true;
      //      this.log('Way found true: ' + !search.incomplete);
      break;
    }
    //    this.log('Way found false: ' + search.incomplete);
  }
  if (!wayFound) {
    this.memory.walls.exit_i++;
    return true;
  }

  var wallPlaceable = function wallPlaceable(pos) {
    var exit = pos.findClosestByRange(FIND_EXIT);
    var range = pos.getRangeTo(exit);
    return range > 1;
  };

  for (var _iterator4 = path, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
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

    var pathPosPlain = _ref4;

    var pathPos = new RoomPosition(pathPosPlain.x, pathPosPlain.y, this.name);
    if (wallPlaceable(pathPos)) {
      if (inLayer(this, pathPos)) {
        continue;
      }

      this.log('pathPos: ' + pathPos);

      var structure = STRUCTURE_WALL;
      var costMatrixBase = this.getMemoryCostMatrix();
      if (pathPos.inPath() || pathPos.inPositions()) {
        structure = STRUCTURE_RAMPART;
        costMatrixBase.set(pathPos.x, pathPos.y, 0);
        this.memory.walls.ramparts.push(pathPos);
      } else {
        costMatrixBase.set(pathPos.x, pathPos.y, 0xff);
      }
      this.setMemoryCostMatrix(costMatrixBase);
      this.memory.walls.layer[this.memory.walls.layer_i].push(pathPos);
      var returnCode = pathPos.createConstructionSite(structure);
      if (returnCode === ERR_FULL) {
        return false;
      }
      if (returnCode === ERR_INVALID_TARGET) {
        return false;
      }
      this.log('Placing ' + structure + ' with ' + returnCode + ' at ' + (0, _stringify2.default)(pathPos));
      return true;
    }
  }
  // I guess when the position is near to the exit (e.g. source on x: 47
  // TODO I think this can break the setup, It will find the way to this source which is in the walls / ramparts and skip the others
  this.memory.walls.exit_i++;
  return true;
};