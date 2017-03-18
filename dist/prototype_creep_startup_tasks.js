'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Creep.execute = function (creep, methods) {
  for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var method = _ref;

    if (method(creep)) {
      return true;
    }
  }
};

Creep.upgradeControllerTask = function (creep) {
  if (creep.carry.energy === 0) {
    return false;
  }

  var range = creep.pos.getRangeTo(creep.room.controller);
  if (range <= 3) {
    var returnCode = creep.upgradeController(creep.room.controller);
    if (returnCode != OK) {
      creep.log('upgradeController: ' + returnCode);
    }
    creep.moveRandomWithin(creep.room.controller.pos);
    return true;
  } else {
    var search = PathFinder.search(creep.pos, {
      pos: creep.room.controller.pos,
      range: 3
    }, {
      roomCallback: creep.room.getAvoids(creep.room, {}, true),
      maxRooms: 0
    });

    if (search.incomplete) {
      creep.say('incomplete');
      creep.moveTo(creep.room.controller.pos);
      return true;
    }
    creep.move(creep.pos.getDirectionTo(search.path[0]));
  }
  return true;
};

Creep.constructTask = function (creep) {
  //  creep.say('construct', true);
  return creep.construct();
};

Creep.transferEnergy = function (creep) {
  //  creep.say('transferEnergy', true);
  return creep.transferEnergyMy();
};

Creep.buildRoads = function (creep) {
  var room = Game.rooms[creep.room.name];

  // TODO extract to roomposition
  function checkForRoad(pos) {
    var structures = pos.lookFor('structure');
    for (var structuresIndex in structures) {
      if (structures[structuresIndex].structureType === STRUCTURE_ROAD) {
        return true;
      }
    }
    return false;
  }

  // TODO Redo for all path in room
  var path = room.memory.position.path;
  for (var pathIndex in path) {
    var pos = new RoomPosition(path[pathIndex].x, path[pathIndex].y, creep.room.name);
    if (checkForRoad(pos)) {
      continue;
    }

    var returnCode = pos.createConstructionSite(STRUCTURE_ROAD);
    if (returnCode === OK) {
      return true;
    }
    if (returnCode === ERR_FULL) {
      return true;
    }
    if (returnCode === ERR_INVALID_TARGET) {
      // FIXME Creep is standing on constructionSite, need to check why it is not building
      creep.moveRandom();
      continue;
    }
    creep.log('buildRoads: ' + returnCode + ' pos: ' + (0, _stringify2.default)(pos));
    return true;
  }
  return false;
};

Creep.recycleCreep = function (creep) {
  if (creep.memory.role === 'planer') {
    creep.room.buildStructures();
  }

  var spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_SPAWN
    }
  });
  if (spawn !== null) {
    creep.moveTo(spawn, {
      ignoreCreeps: true
    });
    spawn.recycleCreep(creep);
  }
  // TODO move back
  return true;
};

Creep.getEnergy = function (creep) {
  return creep.getEnergy();
};

Creep.repairStructure = function (creep) {
  return creep.repairStructure();
};

Creep.prototype.getEnergyFromHostileStructures = function () {
  if (this.carry.energy) {
    return false;
  }
  var hostileStructures = this.room.findPropertyFilter(FIND_HOSTILE_STRUCTURES, 'structureType', [STRUCTURE_CONTROLLER, STRUCTURE_RAMPART, STRUCTURE_EXTRACTOR]);
  if (!hostileStructures.length) {
    return false;
  }

  this.say('hostile');
  hostileStructures = _.sortBy(hostileStructures, function (object) {
    if (object.structureType === STRUCTURE_STORAGE) {
      return 1;
    }
    return 2;
  });

  var structure = _.max(hostileStructures, function (s) {
    return s.structureType === STRUCTURE_STORAGE;
  });
  this.log((0, _stringify2.default)(structure));
  if (structure.structureType === STRUCTURE_STORAGE) {
    if (structure.store.energy === 0) {
      structure.destroy();
      return true;
    }
  } else if (!structure.energy) {
    structure.destroy();
    return true;
  }

  var range = this.pos.getRangeTo(structure);
  this.moveTo(structure);
  this.withdraw(structure, RESOURCE_ENERGY);
  return true;
};

Creep.prototype.getEnergyFromStorage = function () {
  if (!this.room.storage || this.room.storage.store.energy < config.creep.energyFromStorageThreshold) {
    return false;
  }

  if (this.carry.energy) {
    return false;
  }

  var range = this.pos.getRangeTo(this.room.storage);
  if (range === 1) {
    this.withdraw(this.room.storage, RESOURCE_ENERGY);
  } else {
    var search = PathFinder.search(this.pos, {
      pos: this.room.storage.pos,
      range: 1
    }, {
      roomCallback: this.room.getAvoids(this.room, {}, true)
    });
    if (search.incomplete) {
      this.say('incomplete', true);
      this.moveTo(this.room.storage.pos, {
        ignoreCreeps: true
      });
      return true;
    }
    var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
    if (returnCode != OK && returnCode != ERR_TIRED) {
      // this.log(`getEnergyFromStorage: ${returnCode}`);
    }
  }
  return true;
};

Creep.prototype.repairStructure = function () {
  var structure = null;
  var i = null;
  var structures = null;

  if (this.memory.target) {
    var to_repair = Game.getObjectById(this.memory.target);
    if (!to_repair || to_repair === null) {
      delete this.memory.target;
      return false;
    }

    if (to_repair instanceof ConstructionSite) {
      this.build(to_repair);

      var search = PathFinder.search(this.pos, {
        pos: to_repair.pos,
        range: 3
      }, {
        roomCallback: this.room.getAvoids(this.room, {}, true),
        maxRooms: 0
      });

      if (search.incomplete) {
        this.moveTo(to_repair);
        return true;
      }

      if (!this.pos.getDirectionTo(search.path[0])) {
        this.moveRandom();
        return true;
      }

      var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
      return true;
    } else if (to_repair.hits < 10000 || to_repair.hits < this.memory.step + 10000) {
      this.repair(to_repair);
      if (this.fatigue === 0) {
        var range = this.pos.getRangeTo(to_repair);
        if (range <= 3) {
          this.moveRandomWithin(to_repair);
        } else {
          var _search = PathFinder.search(this.pos, {
            pos: to_repair.pos,
            range: 3
          }, {
            roomCallback: this.room.getAvoids(this.room, {}, true),
            maxRooms: 0
          });

          if (!this.pos.getDirectionTo(_search.path[0])) {
            this.moveRandom();
            return true;
          }

          if (_search.incomplete) {
            this.moveTo(to_repair.pos);
            return true;
          }

          var _returnCode = this.move(this.pos.getDirectionTo(_search.path[0]));
          this.memory.lastPosition = this.pos;
          if (_returnCode === OK) {
            return true;
          }
          if (_returnCode === ERR_NO_PATH) {
            this.memory.move_wait = 0;
            this.log('No path : ' + (0, _stringify2.default)(_search));
            _returnCode = this.moveTo(to_repair, {
              ignoreCreeps: true,
              costCallback: this.room.getAvoids(this.room, {
                power: true
              })
            });
          }
          this.log('config_creep_resources.repairStructure moveByPath.returnCode: ' + _returnCode + ' search: ' + (0, _stringify2.default)(_search) + ' start: ' + (0, _stringify2.default)(this.pos) + ' end: ' + (0, _stringify2.default)(to_repair.pos));
          return true;
        }
      }
    } else {
      delete this.memory.target;
    }
  }

  var nukes = this.room.find(FIND_NUKES);
  if (nukes.length > 0) {
    var spawns = this.room.findPropertyFilter(FIND_MY_STRUCTURES, 'structureType', [STRUCTURE_SPAWN]);
    if (spawns.length > 0) {
      for (var _iterator2 = spawns, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

        var spawn = _ref2;

        var found = false;
        var rampart = void 0;
        structures = spawn.pos.lookFor(LOOK_STRUCTURES);
        for (var _iterator3 = structures, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
          if (_isArray3) {
            if (_i3 >= _iterator3.length) {
              break;
            }

            structure = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();

            if (_i3.done) {
              break;
            }

            structure = _i3.value;
          }

          if (structure.structureType === STRUCTURE_RAMPART) {
            if (structure.hits < 1100000) {
              found = true;
              rampart = structure;
              break;
            }
          }
        }
        if (found) {
          this.memory.target = rampart.id;
          this.memory.step = 1200000;
          return true;
        }
      }
    }
  }

  // Repair low ramparts
  var lowRamparts = this.pos.findInRange(FIND_STRUCTURES, 4, {
    filter: function filter(object) {
      if (object.structureType === STRUCTURE_RAMPART && object.hits < 10000) {
        return true;
      }
      return false;
    }
  });

  if (lowRamparts.length > 0) {
    var lowRampart = lowRamparts[0];
    var _range = this.pos.getRangeTo(lowRampart);
    if (_range <= 3) {
      this.repair(lowRampart);
      this.moveRandomWithin(lowRampart);
    } else {
      var _search2 = PathFinder.search(this.pos, {
        pos: lowRampart.pos,
        range: 3
      }, {
        roomCallback: this.room.getAvoids(this.room, {}, true),
        maxRooms: 0
      });
      //     this.log('LowRampart: ' + lowRamparts[0].pos + ' search: ' + JSON.stringify(search));
      var _returnCode2 = this.move(this.pos.getDirectionTo(_search2.path[0]));
    }
    return true;
  }

  // Build construction sites
  var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
    filter: function filter(object) {
      if (object.structureType === 'constructedWall') {
        return true;
      }
      if (object.structureType === 'rampart') {
        return true;
      }
      return false;
    }
  });

  if (target !== null) {
    var _range2 = this.pos.getRangeTo(target);

    if (_range2 <= 3) {
      this.build(target);
      this.memory.step = 0;
      var targetNew = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
        filter: function filter(object) {
          if (object.id === target.id) {
            return false;
          }
          if (object.structureType === 'constructedWall') {
            return true;
          }
          if (object.structureType === 'rampart') {
            return true;
          }
          return false;
        }
      });
      if (targetNew !== null) {
        target = targetNew;
      }
    }
    var ignoreCreepsSwitch = true;
    var last_pos = this.memory.lastPosition;
    if (this.memory.lastPosition && this.pos.isEqualTo(new RoomPosition(last_pos.x, last_pos.y, this.room.name))) {
      this.memory.move_wait++;
      if (this.memory.move_wait > 5) {
        ignoreCreepsSwitch = false;
      }
    } else {
      this.memory.move_wait = 0;
    }

    var _search3 = PathFinder.search(this.pos, {
      pos: target.pos,
      range: 3
    }, {
      roomCallback: this.room.getAvoids(this.room, {}, true),
      maxRooms: 0
    });
    //    this.log('ConstructionSite: ' + target.pos + ' search: ' + JSON.stringify(search));
    // for (let x = 19; x < 31; x++) {
    // for (let y = 2; y < 7; y++) {
    // let costmatrix = this.room.getAvoids(this.room, {}, true)(this.room.name);
    // this.log(x + ',' + y + ' ' + costmatrix.get(x, y));
    // }
    // }
    var _returnCode3 = this.move(this.pos.getDirectionTo(_search3.path[0]));
    this.memory.lastPosition = this.pos;
    this.memory.target = target.id;
    return true;
  }

  var creep = this;
  structure = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function filter(object) {
      // Newbie zone walls have no hits
      if (!object.hits) {
        return false;
      }

      if (object.hits >= Math.min(creep.memory.step, object.hitsMax)) {
        return false;
      }

      if (object.structureType === 'constructedWall') {
        return true;
      }

      if (object.structureType === 'rampart') {
        return true;
      }
      return false;
    }
  });
  if (structure && structure !== null) {
    this.memory.target = structure.id;
    return true;
  }

  if (this.memory.step === 0) {
    this.memory.step = this.room.controller.level * 10000;
  }
  this.memory.step = this.memory.step * 1.1 + 1;

  //   this.log('Nothing found: ' + this.memory.step);
  return false;
};

Creep.prototype.getDroppedEnergy = function () {
  var target = this.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
    filter: function filter(object) {
      return 0 < object.energy;
    }
  });
  if (target !== null) {
    var energyRange = this.pos.getRangeTo(target.pos);
    if (energyRange <= 1) {
      this.pickup(target);
      return true;
    }
    if (target.energy > energyRange * 10 * (this.carry.energy + 1)) {
      var search = PathFinder.search(this.pos, {
        pos: target.pos,
        range: 1
      }, {
        roomCallback: this.room.getAvoids(this.room, {}, true),
        maxRooms: 0
      });
      if (search.path.length === 0 || search.incomplete && !search[1]) {
        this.say('deir');
        this.moveRandom();
        return true;
      }
      var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
      return true;
    }
  }
  return false;
};