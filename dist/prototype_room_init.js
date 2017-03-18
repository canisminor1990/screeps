'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.setTowerFiller = function () {
  var _a = _;

  var _f = Game.map.describeExits(this.name);

  var _r = [];

  for (var _i = 0; _i < _a.length; _i++) {
    _r.push(_f(_a[_i], _i, _a));
  }

  var exits = _r;

  this.memory.position.creep.towerfiller = [];

  for (var index = 0; index < CONTROLLER_STRUCTURES.tower[8] - 1; index++) {
    var roomName = exits[index % exits.length];
    if (!roomName) {
      break;
    }
    for (var offsetDirection = 2; offsetDirection < 7; offsetDirection += 4) {
      var linkSet = false;
      var towerFillerSet = false;
      var positionsFound = false;
      var path = this.getMemoryPath('pathStart' + '-' + roomName);
      for (var pathIndex = path.length - 1; pathIndex >= 1; pathIndex--) {
        var posPath = path[pathIndex];
        var posPathObject = new RoomPosition(posPath.x, posPath.y, posPath.roomName);
        var posPathNext = path[pathIndex - 1];

        var directionNext = posPathObject.getDirectionTo(posPathNext.x, posPathNext.y, posPathNext.roomName);

        var offset = (directionNext + offsetDirection - 1) % 8 + 1;
        var pos = posPathObject.buildRoomPosition(offset);
        if (pos.x <= 4 || pos.x >= 45 || pos.y <= 4 || pos.y >= 45) {
          continue;
        }

        if (pos.inPositions()) {
          continue;
        }

        if (pos.inPath()) {
          continue;
        }

        var terrain = pos.lookFor(LOOK_TERRAIN)[0];
        if (terrain === 'wall') {
          break;
        }

        if (!linkSet) {
          this.memory.position.structure.link.push(pos);
          linkSet = true;
          continue;
        }
        if (!towerFillerSet) {
          this.memory.position.creep.towerfiller.push(pos);
          towerFillerSet = true;
          continue;
        }
        this.memory.position.structure.tower.push(pos);
        positionsFound = true;
        break;
      }

      if (positionsFound) {
        break;
      }
    }
  }
};

function setLabsTerminal(room, path, costMatrixBase) {
  for (var pathI = path.length - 1; pathI > 0; pathI--) {
    var pathPos = new RoomPosition(path[pathI].x, path[pathI].y, room.name);
    var structurePosIterator = pathPos.findNearPosition();
    for (var _iterator = structurePosIterator, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i2 >= _iterator.length) {
          break;
        }

        _ref = _iterator[_i2++];
      } else {
        _i2 = _iterator.next();

        if (_i2.done) {
          break;
        }

        _ref = _i2.value;
      }

      var structurePos = _ref;

      if (room.memory.position.structure.lab.length < CONTROLLER_STRUCTURES.lab[8]) {
        room.memory.position.structure.lab.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }
      if (room.memory.position.structure.terminal.length < CONTROLLER_STRUCTURES.terminal[8]) {
        room.memory.position.structure.terminal.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        room.memory.position.pathEnd = [pathPos];
        continue;
      }
      if (room.memory.position.structure.lab.length < CONTROLLER_STRUCTURES.lab[8] || room.memory.position.structure.terminal.length < CONTROLLER_STRUCTURES.terminal[8]) {
        room.log('Structures not found: ' + 'lab: ' + room.memory.position.structure.lab.length + ' ' + 'terminal: ' + room.memory.position.structure.terminal.length);
        continue;
      }
      if (!room.memory.position.pathEnd) {
        room.log('Room not completly build');
      }
      console.log('All labs/terminal set: ' + pathI);
      return pathI;
    }
  }
  room.setMemoryCostMatrix(costMatrixBase);

  return -1;
}

function setStructures(room, path, costMatrixBase) {
  room.setTowerFiller();

  var pathI = void 0;
  for (pathI in path) {
    var pathPos = new RoomPosition(path[pathI].x, path[pathI].y, room.name);
    var structurePosIterator = pathPos.findNearPosition();
    for (var _iterator2 = structurePosIterator, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      var structurePos = _ref2;

      if (structurePos.setSpawn(pathPos, path[+pathI + 1])) {
        room.memory.position.structure.spawn.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }
      if (structurePos.setExtension()) {
        room.memory.position.structure.extension.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        if (!room.memory.position.pathEndLevel) {
          room.memory.position.pathEndLevel = [0];
        }
        if (CONTROLLER_STRUCTURES.extension[room.memory.position.pathEndLevel.length] <= room.memory.position.structure.extension.length) {
          room.memory.position.pathEndLevel.push(pathI);
        }
        continue;
      }
      if (room.memory.position.structure.spawn.length < CONTROLLER_STRUCTURES.spawn[8] && room.memory.position.structure.extension.length < CONTROLLER_STRUCTURES.extension[8]) {
        continue;
      }

      // TODO Build labs, terminal, nuker ... at the path to extractor / mineral or the next path which diverge from the harvester path
      if (room.memory.position.structure.tower.length < CONTROLLER_STRUCTURES.tower[8]) {
        room.memory.position.structure.tower.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }
      if (room.memory.position.structure.nuker.length < CONTROLLER_STRUCTURES.nuker[8]) {
        room.memory.position.structure.nuker.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }
      if (room.memory.position.structure.observer.length < CONTROLLER_STRUCTURES.observer[8]) {
        room.memory.position.structure.observer.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }

      if (room.memory.position.structure.link.length < CONTROLLER_STRUCTURES.link[8]) {
        room.memory.position.structure.link.push(structurePos);
        costMatrixBase.set(structurePos.x, structurePos.y, config.layout.structureAvoid);
        continue;
      }

      if (room.memory.position.structure.spawn.length < CONTROLLER_STRUCTURES.spawn[8] || room.memory.position.structure.extension.length < CONTROLLER_STRUCTURES.extension[8] || room.memory.position.structure.tower.length < CONTROLLER_STRUCTURES.tower[8] || room.memory.position.structure.link.length < CONTROLLER_STRUCTURES.link[8] || room.memory.position.structure.observer.length < CONTROLLER_STRUCTURES.observer[8] || room.memory.position.structure.nuker.length < CONTROLLER_STRUCTURES.nuker[8]) {
        room.log('Structures not found: ' + 'spawns: ' + room.memory.position.structure.spawn.length + ' ' + 'extensions: ' + room.memory.position.structure.extension.length + ' ' + 'towers: ' + room.memory.position.structure.tower.length + ' ' + 'links: ' + room.memory.position.structure.link.length + ' ' + 'observer: ' + room.memory.position.structure.observer.length + ' ' + 'lab: ' + room.memory.position.structure.lab.length + ' ' + 'terminal: ' + room.memory.position.structure.terminal.length + ' ' + 'nuker: ' + room.memory.position.structure.nuker.length);
        continue;
      }
      if (!room.memory.position.pathEnd) {
        room.log('Room not completly build');
      }
      //      let pathIndex = _.findIndex(path, i => i.x === room.memory.position.pathEnd[0].x && i.y === room.memory.position.pathEnd[0].y);
      //      room.memory.position.path = path.slice(0, pathIndex);
      //      return positions;
      console.log('All structures set: ' + pathI);
      return pathI;
    }
  }
  room.setMemoryCostMatrix(costMatrixBase);

  return -1;
}

var buildCostMatrix = function buildCostMatrix(room) {
  room.deleteMemoryPaths();

  room.memory.costMatrix = {};

  // TODO adapt updatePosition => init Position and set the costmatrix
  room.log('buildCostMatrix');
  var costMatrixBase = room.updatePosition();

  for (var id in room.memory.position.creep) {
    var pos = room.memory.position.creep[id];
    costMatrixBase.set(pos.x, pos.y, config.layout.creepAvoid);
  }
  for (var _id in room.memory.position.structure) {
    var poss = room.memory.position.structure[_id];
    for (var _iterator3 = poss, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

      var _pos = _ref3;

      if (!_pos) {
        room.log('costmatrix.buildCostMatrix not pos: ' + _id + ' ' + (0, _stringify2.default)(poss));
        continue;
      }
      costMatrixBase.set(_pos.x, _pos.y, 0xFF);
    }
  }
  room.setMemoryCostMatrix(costMatrixBase);

  var exits = Game.map.describeExits(room.name);
  if (room.controller) {
    // TODO which first minerals or sources? Maybe order by length of path
    var minerals = room.find(FIND_MINERALS);
    for (var _iterator4 = minerals, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
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

      var mineral = _ref4;

      var _route = [{
        room: room.name
      }];
      var _path = room.getPath(_route, 0, 'pathStart', mineral.id, true);
      for (var _iterator6 = _path, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
        var _ref6;

        if (_isArray6) {
          if (_i7 >= _iterator6.length) {
            break;
          }

          _ref6 = _iterator6[_i7++];
        } else {
          _i7 = _iterator6.next();

          if (_i7.done) {
            break;
          }

          _ref6 = _i7.value;
        }

        var _pos3 = _ref6;

        costMatrixBase.set(_pos3.x, _pos3.y, config.layout.pathAvoid);
      }
      room.setMemoryCostMatrix(costMatrixBase);
    }

    for (var endDir in exits) {
      var end = exits[endDir];
      var route = [{
        room: room.name
      }, {
        room: end
      }];
      var path = room.getPath(route, 0, 'pathStart', undefined, true);
      for (var _iterator5 = path, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
        var _ref5;

        if (_isArray5) {
          if (_i6 >= _iterator5.length) {
            break;
          }

          _ref5 = _iterator5[_i6++];
        } else {
          _i6 = _iterator5.next();

          if (_i6.done) {
            break;
          }

          _ref5 = _i6.value;
        }

        var _pos2 = _ref5;

        costMatrixBase.set(_pos2.x, _pos2.y, config.layout.pathAvoid);
      }
      room.setMemoryCostMatrix(costMatrixBase);
    }
    return costMatrixBase;
  }

  for (var startDir in exits) {
    var start = exits[startDir];
    for (var _endDir in exits) {
      var _end = exits[_endDir];
      if (start === _end) {
        continue;
      }
      var _route2 = [{
        room: start
      }, {
        room: room.name
      }, {
        room: _end
      }];
      var _path2 = room.getPath(_route2, 1, undefined, undefined, true);
      for (var _iterator7 = _path2, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
        var _ref7;

        if (_isArray7) {
          if (_i8 >= _iterator7.length) {
            break;
          }

          _ref7 = _iterator7[_i8++];
        } else {
          _i8 = _iterator7.next();

          if (_i8.done) {
            break;
          }

          _ref7 = _i8.value;
        }

        var _pos4 = _ref7;

        costMatrixBase.set(_pos4.x, _pos4.y, config.layout.pathAvoid);
      }
      room.setMemoryCostMatrix(costMatrixBase);
    }
  }
  return costMatrixBase;
};

Room.prototype.setup = function () {
  delete this.memory.constants;
  this.log('costmatrix.setup called');
  this.memory.controllerLevel = {};

  var costMatrixBase = buildCostMatrix(this);
  //  this.memory.position = {
  //    creep: {}
  //  };

  // TODO find longest path, calculate vert-/horizontal as 2 (new structures) and diagonal as 4

  var sorter = function sorter(object) {
    var last_pos = void 0;
    var value = 0;
    for (var _iterator8 = object.path, _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
      var _ref8;

      if (_isArray8) {
        if (_i9 >= _iterator8.length) {
          break;
        }

        _ref8 = _iterator8[_i9++];
      } else {
        _i9 = _iterator8.next();

        if (_i9.done) {
          break;
        }

        _ref8 = _i9.value;
      }

      var pos = _ref8;

      var valueAdd = 0;
      if (!last_pos) {
        last_pos = new RoomPosition(pos.x, pos.y, pos.roomName);
        continue;
      }
      var direction = last_pos.getDirectionTo(pos.x, pos.y, pos.roomName);
      if (direction % 2 === 0) {
        valueAdd += 2;
      } else {
        valueAdd += 4;
      }

      for (var x = -1; x < 2; x++) {
        for (var y = -1; y < 2; y++) {
          var wall = new RoomPosition(pos.x + x, pos.y + y, pos.roomName);
          var terrains = wall.lookFor(LOOK_TERRAIN);
          if (terrains === 'wall') {
            valueAdd *= 0.5; // TODO some factor
          }
        }
      }
      value += valueAdd;
      last_pos = new RoomPosition(pos.x, pos.y, pos.roomName);
    }
    return value;
  };

  var paths_controller = _.filter(this.getMemoryPaths(), function (object, key) {
    return key.startsWith('pathStart-');
  });
  var paths_sorted = _.sortBy(paths_controller, sorter);
  var path = this.getMemoryPath(paths_sorted[paths_sorted.length - 1].name);
  var pathLB = this.getMemoryPath(paths_controller[4].name);
  var pathL = setLabsTerminal(this, pathLB, costMatrixBase);
  var pathI = setStructures(this, path, costMatrixBase);
  console.log('path: ' + path.name + ' pathI: ' + pathI + ' length: ' + path.length);
  if (pathI === -1) {
    pathI = path.length - 1;
  }

  this.setMemoryPath('pathStart-harvester', path.slice(0, pathI + 1), true);
  this.memory.position.version = config.layout.version;

  for (var structureId in this.memory.position.structure) {
    var structures = this.memory.position.structure[structureId];
    for (var _iterator9 = structures, _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
      var _ref9;

      if (_isArray9) {
        if (_i10 >= _iterator9.length) {
          break;
        }

        _ref9 = _iterator9[_i10++];
      } else {
        _i10 = _iterator9.next();

        if (_i10.done) {
          break;
        }

        _ref9 = _i10.value;
      }

      var pos = _ref9;

      costMatrixBase.set(pos.x, pos.y, config.layout.structureAvoid);
    }
  }
  this.setMemoryCostMatrix(costMatrixBase);
};