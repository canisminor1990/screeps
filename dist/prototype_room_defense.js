'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.findAttackCreeps = function (object) {
  if (object.owner.username === 'Source Keeper') {
    return false;
  }

  for (var item in object.body) {
    var part = object.body[item];
    if (part.energy === 0) {
      continue;
    }
    if (part.type === 'attack') {
      return true;
    }
    if (part.type === 'ranged_attack') {
      return true;
    }
    if (part.type === 'heal') {
      return true;
    }
    if (part.type === 'work') {
      return true;
    }
    if (part.type === 'claim') {
      return true;
    }
  }
  return true;
  // TODO defender stop in rooms with (non attacking) enemies
  //    return false;
};

Room.prototype.handleNukeAttack = function () {
  if (Game.time % config.room.handleNukeAttackInterval !== 0) {
    return false;
  }

  var nukes = this.find(FIND_NUKES);
  if (nukes.length === 0) {
    return false;
  }

  var sorted = _.sortBy(nukes, function (object) {
    return object.timeToLand;
  });
  if (sorted[0].timeToLand < 100) {
    this.controller.activateSafeMode();
  }

  var findSaveableStructures = function findSaveableStructures(object) {
    if (object.structureType === STRUCTURE_ROAD) {
      return false;
    }
    if (object.structureType === STRUCTURE_RAMPART) {
      return false;
    }
    if (object.structureType === STRUCTURE_WALL) {
      return false;
    }
    return true;
  };

  var isRampart = function isRampart(object) {
    return object.structureType === STRUCTURE_RAMPART;
  };

  for (var _iterator = nukes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var nuke = _ref;

    var structures = nuke.pos.findInRange(FIND_MY_STRUCTURES, 4, {
      filter: findSaveableStructures
    });
    this.log('Nuke attack !!!!!');
    for (var _iterator2 = structures, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      var structure = _ref2;

      var lookConstructionSites = structure.pos.lookFor(LOOK_CONSTRUCTION_SITES);
      if (lookConstructionSites.length > 0) {
        continue;
      }
      var lookStructures = structure.pos.lookFor(LOOK_STRUCTURES);
      var lookRampart = _.findIndex(lookStructures, isRampart);
      if (lookRampart > -1) {
        continue;
      }
      this.log('Build rampart: ' + (0, _stringify2.default)(structure.pos));
      structure.pos.createConstructionSite(STRUCTURE_RAMPART);
    }
  }

  return true;
};

Room.prototype.handleTower = function () {
  var tower_id;
  var towers = this.findPropertyFilter(FIND_MY_STRUCTURES, 'structureType', [STRUCTURE_TOWER]);
  if (towers.length === 0) {
    return false;
  }
  var hostileCreeps = this.find(FIND_HOSTILE_CREEPS);
  if (hostileCreeps.length > 0) {
    var _tower = void 0;
    var hostileOffset = {};
    var sortHostiles = function sortHostiles(object) {
      return _tower.pos.getRangeTo(object) + (hostileOffset[object.id] || 0);
    };

    var towersAttacking = _.sortBy(towers, function (object) {
      var hostile = object.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      return object.pos.getRangeTo(hostile);
    });

    for (var _iterator3 = towersAttacking, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      if (_isArray3) {
        if (_i3 >= _iterator3.length) {
          break;
        }

        _tower = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();

        if (_i3.done) {
          break;
        }

        _tower = _i3.value;
      }

      var hostilesSorted = _.sortBy(hostileCreeps, sortHostiles);
      _tower.attack(hostilesSorted[0]);
      hostileOffset[hostilesSorted[0].id] = 100;
    }
    return true;
  }

  var my_creeps = this.find(FIND_MY_CREEPS, {
    filter: function filter(object) {
      return object.hits < object.hitsMax;
    }
  });
  if (my_creeps.length > 0) {
    for (tower_id in towers) {
      towers[tower_id].heal(my_creeps[0]);
    }
    return true;
  }

  if (this.controller.level < 4) {
    return false;
  }

  if (!this.memory.repair_min) {
    this.memory.repair_min = 0;
  }

  var repairable_structures = function repairable_structures(object) {
    if (object.hits === object.hitsMax) {
      return false;
    }
    if (object.structureType === STRUCTURE_WALL) {
      return false;
    }
    if (object.structureType === STRUCTURE_RAMPART) {
      return false;
    }
    // TODO Let see if the creeps can keep the roads alive
    if (object.structureType === STRUCTURE_ROAD) {
      return false;
    }
    return true;
  };

  var repair_min = this.memory.repair_min;
  var repairable_blockers = function repairable_blockers(object) {
    if (object.hits >= Math.min(repair_min, object.hitsMax)) {
      return false;
    }
    if (object.structureType === STRUCTURE_WALL) {
      return true;
    }
    if (object.structureType === STRUCTURE_RAMPART) {
      return true;
    }
    return false;
  };
  var tower = void 0;
  for (var tower_index in towers) {
    tower = towers[tower_index];
    if (tower.energy === 0) {
      continue;
    }
    if ((Game.time + this.controller.pos.x + this.controller.pos.y + tower.pos.x + tower.pos.y + tower.energy) % 10 !== 0) {
      if (tower.energy < tower.energyCapacity / 2 || this.memory.repair_min > 1000000) {
        continue;
      }
    }

    var low_rampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function filter(object) {
        if (object.structureType === 'rampart' && object.hits < 10000) {
          return true;
        }
        return false;
      }
    });

    var repair = low_rampart;
    if (low_rampart === null) {
      var to_repair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: repairable_structures
      });
      //      if (to_repair === null) {
      //        to_repair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      //          filter: repairable_blockers
      //        });
      //      }
      //      if (to_repair === null) {
      //        this.memory.repair_min += 10000;
      //        this.log('Defense level: ' + this.memory.repair_min);
      //        continue;
      //      }
      repair = to_repair;
      tower.repair(repair);
    }
  }
  return true;
};