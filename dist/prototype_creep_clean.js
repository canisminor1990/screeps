'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Creep.prototype.handleStructurer = function () {
  var structure;

  if (!this.memory.routing.targetId) {
    return this.cleanSetTargetId();
  }

  structure = Game.getObjectById(this.memory.routing.targetId);
  if (structure === null) {
    delete this.memory.routing.targetId;
    return;
  }

  var search = PathFinder.search(this.pos, {
    pos: structure.pos,
    range: 1
  }, {
    maxRooms: 1
  });

  var pos = search.path[0];
  var returnCode = this.move(this.pos.getDirectionTo(pos));

  if (returnCode === ERR_NO_PATH) {
    this.moveRandom();
    //    delete this.memory.routing.targetId;
    return true;
  }
  if (returnCode != OK && returnCode != ERR_TIRED) {
    //this.log('move returnCode: ' + returnCode);
  }

  returnCode = this.dismantle(structure);
  if (returnCode === OK) {
    this.setNextSpawn();
    this.spawnCarry();
  }
};

Creep.prototype.cleanController = function () {
  var search = PathFinder.search(this.pos, {
    pos: this.room.controller.pos,
    range: 1
  }, {
    maxRooms: 1
  });
  var findStructuresToDismantle = function findStructuresToDismantle(object) {
    if (object.ticksToDecay === null) {
      return false;
    }
    if (object.structureType === STRUCTURE_CONTROLLER) {
      return false;
    }
    if (object.structureType === STRUCTURE_ROAD) {
      return false;
    }
    if (object.structureType === STRUCTURE_CONTAINER) {
      return false;
    }
    return true;
  };
  for (var _iterator = search.path, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var pos = _ref;

    var posObject = new RoomPosition(pos.x, pos.y, this.room.name);
    var structures = posObject.findInRange(FIND_STRUCTURES, 1, {
      filter: findStructuresToDismantle
    });

    if (structures.length > 0) {
      this.memory.routing.targetId = structures[0].id;
      this.memory.routing.reached = false;
      //      this.log('found on way to controller to dismantle: ' + structures[0].pos);
      this.moveTo(structures[0].pos);
      return true;
    }
  }
  return false;
};

Creep.prototype.cleanExits = function () {
  var findStructuresToDismantle = function findStructuresToDismantle(object) {
    if (object.ticksToDecay === null) {
      return false;
    }
    if (object.structureType === STRUCTURE_CONTROLLER) {
      return false;
    }
    if (object.structureType === STRUCTURE_ROAD) {
      return false;
    }
    if (object.structureType === STRUCTURE_CONTAINER) {
      return false;
    }
    return true;
  };
  var exitDirs = [FIND_EXIT_TOP, FIND_EXIT_RIGHT, FIND_EXIT_BOTTOM, FIND_EXIT_LEFT];
  for (var _iterator2 = exitDirs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

    var exitDir = _ref2;

    var exits = this.room.find(exitDir);
    if (exits.length === 0) {
      continue;
    }
    var exit = exits[Math.floor(exits.length / 2)];
    var path = this.pos.findPathTo(exit);
    var posLast = path[path.length - 1];
    if (path.length === 0) {
      continue;
    }
    if (!exit.isEqualTo(posLast.x, posLast.y)) {
      var pos = new RoomPosition(posLast.x, posLast.y, this.room.name);
      var structure = pos.findClosestByRange(FIND_STRUCTURES, {
        filter: findStructuresToDismantle
      });

      if (structure !== null) {
        this.memory.routing.targetId = structure.id;
        this.log('new memory: ' + structure.id);
        return true;
      }
    }
  }
  return false;
};

Creep.prototype.cleanSetTargetId = function () {
  if (this.room.controller && !this.room.controller.my) {
    //    this.log('no targetId');
    if (this.cleanController()) {
      //      this.log('clean controller');
      return true;
    }
    if (this.cleanExits()) {
      //      this.log('clean exits');
      return true;
    }
    var structure = this.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function filter(object) {
        if (object.ticksToDecay === null) {
          return false;
        }
        if (object.structureType === STRUCTURE_CONTROLLER) {
          return false;
        }
        if (object.structureType === STRUCTURE_ROAD) {
          return false;
        }
        if (object.structureType === STRUCTURE_CONTAINER) {
          return false;
        }
        return true;
      }
    });
    if (structure !== null) {
      var structures = structure.pos.lookFor('structure');

      if (structures.length > 0) {
        for (var _iterator3 = structures, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

          var structureLook = _ref3;

          if (structure.structureType === STRUCTURE_RAMPART) {
            structure = structureLook;
            break;
          }
        }
      }

      this.log('structure: ' + structure.id);
      this.memory.routing.targetId = structure.id;
      return true;
    }
  }
  this.memory.targetReached = true;
  this.log('Nothing found, suicide');
  this.suicide();
  //  return Creep.recycleCreep(this);
};