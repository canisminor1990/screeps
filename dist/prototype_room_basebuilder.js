'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function posIsIn(pos, array) {
  if (!array) {
    return false;
  }

  for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var posCheck = _ref;

    // TODO when does this happen?
    if (posCheck === null) {
      console.log('Pos is not in array', pos, posCheck, (0, _stringify2.default)(array));
      throw new Error();
      //      continue;
    }
    if (pos.x === posCheck.x && pos.y === posCheck.y) {
      return true;
    }
  }
  return false;
}

Room.prototype.destroyStructure = function (structure) {
  if (structure.structureType === STRUCTURE_WALL) {
    if (!this.memory.walls) {
      return false;
    }
    if (!this.memory.walls.finished) {
      this.log('Wall setup not yet finished:' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos));
      return false;
    }
    if (!structure.pos.inRamparts()) {
      for (var layerId in this.memory.walls.layer) {
        var layer = this.memory.walls.layer[layerId];
        for (var _iterator2 = layer, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

          if (structure.pos.isEqualTo(pos.x, pos.y)) {
            return false;
          }
        }
      }
    }
    this.log('destroyStructure: wall not found in memory, destroying: ' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos));
    structure.destroy();
    return true;
  }
  if (structure.structureType === STRUCTURE_ROAD) {
    for (var pathName in this.getMemoryPaths()) {
      for (var _iterator3 = this.getMemoryPath(pathName), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

        var _pos = _ref3;

        if (structure.pos.isEqualTo(_pos.x, _pos.y)) {
          return false;
        }
      }
    }
    this.log('destroyStructure: road not found in paths, destroying: ' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos));
    structure.destroy();
    return true;
  }
  if (structure.structureType === STRUCTURE_RAMPART) {
    return false;
  }

  if (posIsIn(structure.pos, this.memory.position.structure[structure.structureType])) {
    return false;
  }
  var structures = this.findPropertyFilter(FIND_STRUCTURES, 'structureType', [structure.structureType]);
  var structuresMin = 0;
  if (structure.structureType === STRUCTURE_SPAWN) {
    structuresMin = 1;
  }

  if (structures.length > structuresMin) {
    this.log('Destroying: ' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos));
    structure.destroy();
    return true;
  }
  this.log('Not destroying: ' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos) + ' ' + structures.length + ' ' + structuresMin);
  if (structure.structureType === STRUCTURE_SPAWN) {
    if (this.memory.misplacedSpawn) {
      if (this.storage && this.storage.store.energy > 20000) {
        var planers = this.find(FIND_MY_CREEPS, {
          filter: function filter(object) {
            var creep = Game.getObjectById(object.id);
            return creep.memory.role === 'planer';
          }
        });
        if (planers.length > 3) {
          this.log('Destroying to rebuild spawn: ' + structure.structureType + ' ' + (0, _stringify2.default)(structure.pos));
          structure.destroy();
          delete this.memory.misplacedSpawn;
          this.memory.controllerLevel.checkWrongStructureInterval = 1;
          delete this.memory.walls;
          return true;
        }
      }
      return true;
    }
    this.log('Set misplaced spawn');
    this.memory.misplacedSpawn = true;

    // Build ramparts around the spawn if wallThickness > 1
    if (config.layout.wallThickness > 1) {
      var costMatrixBase = this.getMemoryCostMatrix();
      var spawns = this.findPropertyFilter(FIND_MY_STRUCTURES, 'structureType', [STRUCTURE_SPAWN]);
      var getWalls = function getWalls(object) {
        return object.structureType === STRUCTURE_WALL;
      };

      for (var _iterator4 = spawns, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
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

        var spawn = _ref4;

        for (var x = -1; x < 2; x++) {
          for (var y = -1; y < 2; y++) {
            var _pos2 = new RoomPosition(spawn.pos.x + x, spawn.pos.y + y, spawn.pos.roomName);
            this.memory.walls.ramparts.push(_pos2);
            costMatrixBase.set(_pos2.x, _pos2.y, 0);
            var walls = _pos2.findInRange(FIND_STRUCTURES, 0, {
              filter: getWalls
            });
            for (var _iterator5 = walls, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
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

              var wall = _ref5;

              wall.destroy();
            }
          }
        }
      }
      this.setMemoryCostMatrix(costMatrixBase);
    }
  }
  return false;
};

Room.prototype.checkPath = function () {
  //  this.log('checkPath: ' + this.memory.controllerLevel.checkPathInterval);

  var path = this.getMemoryPath('pathStart-harvester');
  if (!path) {
    this.log('Skipping checkPath, routing not initialized');
    return false;
  }
  var filterSpawns = function filterSpawns(object) {
    return object.structureType === STRUCTURE_SPAWN;
  };
  for (var _iterator6 = path, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
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

    var pos = _ref6;

    var roomPos = new RoomPosition(pos.x, pos.y, this.name);
    var structures = roomPos.lookFor('structure');

    for (var _iterator7 = structures, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
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

      var structure = _ref7;

      if (structure.structureType === STRUCTURE_ROAD) {
        continue;
      }
      if (structure.structureType === STRUCTURE_RAMPART) {
        continue;
      }
      console.log('checkPath: ' + pos);
      if (this.destroyStructure(structure)) {
        return true;
      }
    }
  }
  return false;
};

Room.prototype.checkWrongStructure = function () {
  //  this.log('checkWrongStructure: ' + this.memory.controllerLevel.checkWrongStructureInterval);
  if (this.memory.underSiege && this.controller.level >= 3) {
    this.log('checkWrongStructure: underSiege');
    return false;
  }

  // destroyStructure resets misplacedSpawn, so make sure we reach that point with the storage check
  if (this.memory.misplacedSpawn && (!this.storage || this.storage.store.energy < 20000)) {
    this.log('checkWrongStructures skipped - misplacedSpawn');
    return false;
  }

  // TODO Building up underSiege, maybe check for underSiege
  //if (this.controller.level < 6) {
  //  this.log('checkWrongStructure: controller.level < 6');
  //  return false;
  //}
  var structures = this.findPropertyFilter(FIND_STRUCTURES, 'structureType', [STRUCTURE_RAMPART, STRUCTURE_CONTROLLER], true);
  for (var _iterator8 = structures, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
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

    var structure = _ref8;

    if (this.destroyStructure(structure)) {
      return true;
    }
  }
  return false;
};

Room.prototype.clearPosition = function (pos, structure) {
  var posStructures = pos.lookFor('structure');
  var returnValue = false;
  for (var posStructureIndex in posStructures) {
    var posStructure = posStructures[posStructureIndex];
    if (posStructure.structureType === STRUCTURE_ROAD) {
      continue;
    }
    if (posStructure.structureType === STRUCTURE_RAMPART) {
      continue;
    }
    if (posStructure.structureType === structure) {
      returnValue = {
        destoyed: false
      };
      continue;
    }
    return this.destroyStructure(posStructure);
  }
  return returnValue;
};

Room.prototype.setupStructure = function (structure) {
  var structures = this.findPropertyFilter(FIND_MY_STRUCTURES, 'structureType', [structure]);
  var constructionsites = this.findPropertyFilter(FIND_CONSTRUCTION_SITES, 'structureType', [structure]);
  // Only build one spawn at a time, especially for reviving
  if (structure === STRUCTURE_SPAWN) {
    if (constructionsites.length > 0) {
      return true;
    }
  }

  // Complete storage before building something else - 2016-10-16
  if (structure === STRUCTURE_STORAGE) {
    if (constructionsites.length > 0) {
      return true;
    }
  }

  var diff = CONTROLLER_STRUCTURES[structure][this.controller.level] - (structures.length + constructionsites.length);
  if (diff <= 0) {
    return false;
  }

  var max = CONTROLLER_STRUCTURES[structure][this.controller.level];
  for (var _iterator9 = this.memory.position.structure[structure] || [], _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
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

    // TODO special case e.g. when powerSpawn can't be set on costmatrix.setup - need to be fixed there
    if (!pos) {
      continue;
    }
    var posObject = new RoomPosition(pos.x, pos.y, this.name);

    var clear = this.clearPosition(posObject, structure);
    if (clear) {
      if (clear.destoyed) {
        return true;
      } else {
        continue;
      }
    }

    var returnCode = posObject.createConstructionSite(structure);
    if (returnCode === OK) {
      this.log('Build: ' + structure + ' ' + (0, _stringify2.default)(posObject));
      return true;
    }
    if (returnCode === ERR_FULL) {
      this.log('setup createConstrustionSite too many constructionSites');
      return true;
    }
    if (returnCode === ERR_INVALID_TARGET) {
      this.log('setup createConstrustionSite invalid target: ' + structure + ' ' + (0, _stringify2.default)(posObject));
      continue;
    }
    if (returnCode === ERR_RCL_NOT_ENOUGH) {
      this.log(structure + ' ' + this.controller.level + ' ' + CONTROLLER_STRUCTURES[structure][this.controller.level]);
      this.log('setup createConstrustionSite ERR_RCL_NOT_ENOUGH structure: ' + structure + ' ' + CONTROLLER_STRUCTURES[structure][this.controller.level] + ' ' + structures.length + ' ' + constructionsites.length);
    }

    this.log('setup createConstrustionSite returnCode: ' + returnCode + ' structure: ' + structure);
  }
  return false;
};

Room.prototype.buildStructures = function () {
  // TODO reduce noise
  //  this.log('buildStructures: ' + this.memory.controllerLevel.buildStructuresInterval);
  if (!this.memory.position) {
    this.log('No position buildStructures');
    this.setup();
    return false;
  }

  if (!this.memory.position.structure) {
    this.log('No structure positions: ' + (0, _stringify2.default)(this.memory.position));
    return false;
  }

  if (this.controller === null || !this.controller.my) {
    this.log('No controller');
    return false;
  }

  if ((0, _keys2.default)(Game.constructionSites).length >= 100) {
    return false;
  }

  var constructionSites = this.findPropertyFilter(FIND_CONSTRUCTION_SITES, 'structureType', [STRUCTURE_RAMPART, STRUCTURE_WALL], true);
  if (constructionSites.length > 3) {
    //    this.log('basebuilder.setup: Too many construction sites');
    return true;
  }

  if (this.setupStructure('spawn')) {
    return true;
  }
  if (this.setupStructure(STRUCTURE_TOWER)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_STORAGE)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_LINK)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_EXTENSION)) {
    return true;
  }

  if (!this.storage || this.findPropertyFilter(FIND_MY_CONSTRUCTION_SITES, 'structureType', [STRUCTURE_LINK]).length > 0) {
    return false;
  }
  if (this.setupStructure(STRUCTURE_POWER_SPAWN)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_EXTRACTOR)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_OBSERVER)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_LAB)) {
    return true;
  }

  if (this.setupStructure(STRUCTURE_TERMINAL)) {
    return true;
  }
  if (this.setupStructure(STRUCTURE_NUKER)) {
    return true;
  }

  return false;
};

var structureExist = function structureExist(pos, structureType) {
  var structures = pos.lookFor(LOOK_STRUCTURES);
  for (var _iterator10 = structures, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : (0, _getIterator3.default)(_iterator10);;) {
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

    var structure = _ref10;

    if (structure.structureType === structureType) {
      return true;
    }
  }
  return false;
};

Room.prototype.checkBlockers = function () {
  if (this.controller.level === 1) {
    return false;
  }
  //  this.log('checkBlockers: ' + this.memory.controllerLevel.checkBlockersInterval + ' ' + this.controller.level + ' ' + this.memory.walls);
  if (this.controller.level >= 2 && (!this.memory.walls || !this.memory.walls.layer)) {
    this.log('checkBlockers: reset walls');
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

  for (var layer in this.memory.walls.layer) {
    for (var _iterator11 = this.memory.walls.layer[layer], _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : (0, _getIterator3.default)(_iterator11);;) {
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

      var blocker = _ref11;

      var pos = new RoomPosition(blocker.x, blocker.y, this.name);

      var structureType = STRUCTURE_WALL;
      if (pos.inRamparts()) {
        structureType = STRUCTURE_RAMPART;
      }

      if (structureExist(pos, structureType)) {
        continue;
      }
      var returnCode = pos.createConstructionSite(structureType);
      if (returnCode != OK && returnCode != ERR_FULL) {
        // this.log('Build ' + structureType + ' at ' + pos + ' with ' + returnCode);
        return true;
      }
    }
  }
  return false;
};