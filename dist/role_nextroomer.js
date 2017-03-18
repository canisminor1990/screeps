'use strict';

/*
 * nextroomer is used to build up rooms
 *
 * Bring the controller to level 3 after that build constructionSites
 * and continue upgrading.
 *
 * If the room is 'underSiege', build a tower next to a source, build ramparts
 * and fill the tower.
 */

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

roles.nextroomer = {};

roles.nextroomer.died = function (name, creepMemory) {
  var roomName = creepMemory.routing.route[creepMemory.routing.routePos].room;
  var message = name + ' ' + roomName + ' ' + (0, _stringify2.default)(creepMemory);
  if (roomName === creepMemory.routing.targetRoom) {
    // TODO make underSiege to a counter
  }
  console.log('DIED:', message);
};

roles.nextroomer.settings = {
  layoutString: 'MWC',
  amount: [6, 3, 3]
};

roles.nextroomer.checkForRampart = function (coords) {
  var pos = new RoomPosition(coords.x, coords.y, coords.roomName);
  var structures = pos.lookFor('structure');
  return _.find(structures, function (s) {
    return s.structureType === STRUCTURE_RAMPART;
  });
};

roles.nextroomer.buildRamparts = function (creep) {
  var ramparts = creep.pos.findInRange(FIND_STRUCTURES, 1, {
    filter: {
      structureType: STRUCTURE_RAMPART
    }
  });

  // TODO Guess roles.nextroomer should be higher
  var rampartMinHits = 10000;

  creep.say('checkRamparts');
  var posRampart = roles.nextroomer.checkForRampart(creep.pos);
  if (posRampart) {
    if (posRampart.hits < rampartMinHits) {
      creep.repair(posRampart);
      return true;
    }
  } else {
    creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_RAMPART);
    return true;
  }

  var room = Game.rooms[creep.room.name];
  var linkPosMem = room.memory.position.structure.link[1];
  if (creep.pos.getRangeTo(linkPosMem.x, linkPosMem.y) > 1) {
    linkPosMem = room.memory.position.structure.link[2];
  }

  var links = creep.pos.findInRange(FIND_STRUCTURES, 1, {
    filter: function filter(object) {
      return object.structureType === STRUCTURE_LINK;
    }
  });
  if (links.length) {
    creep.say('dismantle');
    creep.log((0, _stringify2.default)(links));
    creep.dismantle(links[0]);
    return true;
  }

  creep.say('cr');
  var towerRampart = roles.nextroomer.checkForRampart(linkPosMem);
  if (towerRampart) {
    creep.say('tr');
    if (towerRampart.hits < rampartMinHits) {
      creep.repair(towerRampart);
      return true;
    }
  } else {
    var returnCode = creep.room.createConstructionSite(linkPosMem.x, linkPosMem.y, STRUCTURE_RAMPART);
    creep.log('Build tower rampart: ' + returnCode);
    return true;
  }
  return false;
};

roles.nextroomer.defendTower = function (creep, source) {
  var room = Game.rooms[creep.room.name];
  var constructionSites = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1);
  if (constructionSites.length > 0) {
    for (var constructionSiteId in constructionSites) {
      creep.build(constructionSites[constructionSiteId]);
    }
    return true;
  }

  var towers = creep.pos.findInRange(FIND_STRUCTURES, 1, {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  });

  if (towers.length > 0) {
    if (roles.nextroomer.buildRamparts(creep)) {
      return true;
    }

    for (var towerId in towers) {
      var tower = towers[towerId];
      if (tower.energy === tower.energyCapacity) {
        room.memory.underSiege = false;
        return false;
      } else {
        var _returnCode = creep.transfer(tower, RESOURCE_ENERGY);
        if (_returnCode === OK) {
          return true;
        }

        //if (returnCode === ERR_FULL) {}
        // Don't know what to do
        creep.say(_returnCode);
        return true;
      }
    }
    return roles.nextroomer.buildRamparts(creep);
  } else if (roles.nextroomer.buildRamparts(creep)) {
    return true;
  }

  var linkPosMem = room.memory.position.structure.link[1];

  if (creep.pos.getRangeTo(linkPosMem.x, linkPosMem.y) > 2) {
    linkPosMem = room.memory.position.structure.link[2];
  }
  var linkPos = new RoomPosition(linkPosMem.x, linkPosMem.y, linkPosMem.roomName);
  var returnCode = linkPos.createConstructionSite(STRUCTURE_TOWER);
  if (returnCode === ERR_RCL_NOT_ENOUGH) {
    delete room.memory.underSiege;
  }
  creep.log('Build tower: ' + returnCode);
};

roles.nextroomer.stayAtSource = function (creep, source) {
  if (creep.carry.energy < creep.carryCapacity - 30) {
    var returnCode = creep.harvest(source);
    if (returnCode === OK) {
      if (creep.carry.energy >= 0) {
        var creepWithoutEnergy = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
          filter: function filter(object) {
            return object.carry.energy === 0 && object.id !== creep.id;
          }
        });
        var range = creep.pos.getRangeTo(creepWithoutEnergy);

        if (range === 1) {
          creep.transfer(creepWithoutEnergy, RESOURCE_ENERGY);
        }
      }
      return true;
    }
  }
  return roles.nextroomer.defendTower(creep, source);
};

roles.nextroomer.underSiege = function (creep) {
  var room = Game.rooms[creep.room.name];
  if (creep.memory.targetId) {
    var sourcerPosMem = room.memory.position.creep[creep.memory.targetId];
    var source = Game.getObjectById(creep.memory.targetId);
    if (creep.pos.isEqualTo(sourcerPosMem.x, sourcerPosMem.y)) {
      return roles.nextroomer.stayAtSource(creep, source);
    } else {
      delete creep.memory.targetId;
    }
  }
  var sources = room.find(FIND_SOURCES);
  for (var sourceId in sources) {
    var _source = sources[sourceId];
    var _sourcerPosMem = room.memory.position.creep[_source.id];
    var sourcerPos = new RoomPosition(_sourcerPosMem.x, _sourcerPosMem.y, _sourcerPosMem.roomName);

    if (creep.pos.isEqualTo(sourcerPos)) {
      creep.memory.targetId = _source.id;
      return roles.nextroomer.stayAtSource(creep, _source);
    }

    var creeps = sourcerPos.lookFor('creep');
    if (creeps.length === 0) {
      creep.moveTo(sourcerPos.x, sourcerPos.y);
      return true;
    }
  }
  return false;
};

roles.nextroomer.settle = function (creep) {
  var room = Game.rooms[creep.room.name];
  var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
  if (hostileCreeps.length) {
    room.memory.underSiege = true;
    if (creep.room.controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[creep.room.controller.level] / 10 || creep.room.controller.level === 1) {
      var _methods = [Creep.getEnergy, Creep.upgradeControllerTask];
      return Creep.execute(creep, _methods);
    }
  }
  room.memory.wayBlocked = false;
  if (room.memory.underSiege && room.controller && room.controller.level >= 3) {
    creep.log('underSiege: ' + room.memory.attackTimer);
    return roles.nextroomer.underSiege(creep);
  }

  if (creep.carry.energy > 0) {
    var towers = creep.room.find(FIND_STRUCTURES, {
      filter: function filter(object) {
        return object.structureType === STRUCTURE_TOWER && object.energy < 10;
      }
    });
    if (towers.length) {
      creep.moveTo(towers[0]);
      creep.transfer(towers[0], RESOURCE_ENERGY);
      return true;
    }
  }

  if (_.sum(creep.carry) === 0) {
    var hostileStructures = creep.room.findPropertyFilter(FIND_HOSTILE_STRUCTURES, 'structureType', [STRUCTURE_RAMPART, STRUCTURE_EXTRACTOR, STRUCTURE_WALL, STRUCTURE_CONTROLLER]);
    if (hostileStructures.length) {
      var structure = _.max(hostileStructures, function (s) {
        return s.structureType === STRUCTURE_STORAGE;
      });

      if (structure.structureType === STRUCTURE_STORAGE) {
        if (structure.store.energy === 0) {
          structure.destroy();
          return true;
        }
      } else if (!structure.energy) {
        structure.destroy();
        return true;
      }
      creep.say('ho: ' + structure.pos, true);
      creep.log(structure.structureType);
      creep.moveTo(structure);
      creep.withdraw(structure, RESOURCE_ENERGY);
      return true;
    }
  }

  if (creep.room.energyCapacityAvailable < 300) {
    var constructionSites = creep.room.findPropertyFilter(FIND_CONSTRUCTION_SITES, 'structureType', [STRUCTURE_LAB, STRUCTURE_NUKER, STRUCTURE_TERMINAL]);
    for (var _iterator = constructionSites, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

      var cs = _ref;

      cs.remove();
    }
  }

  var methods = [Creep.getEnergy];
  if (creep.room.controller.ticksToDowngrade < 1500) {
    methods.push(Creep.upgradeControllerTask);
  }
  var structures = creep.room.findPropertyFilter(FIND_MY_CONSTRUCTION_SITES, 'structureType', [STRUCTURE_RAMPART, STRUCTURE_CONTROLLER], true);
  if (creep.room.controller.level >= 3 && structures.length > 0) {
    methods.push(Creep.constructTask);
  }

  if (creep.room.controller.level < 8) {
    methods.push(Creep.upgradeControllerTask);
  }

  methods.push(Creep.transferEnergy);
  return Creep.execute(creep, methods);
};

roles.nextroomer.preMove = function (creep, directions) {
  if (!directions) {
    return false;
  }
  var posForward = creep.pos.getAdjacentPosition(directions.forwardDirection);
  var structures = posForward.lookFor(LOOK_STRUCTURES);
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

    if (structure.structureType === STRUCTURE_ROAD) {
      continue;
    }
    if (structure.structureType === STRUCTURE_RAMPART && structure.my) {
      continue;
    }

    creep.dismantle(structure);
    creep.say('dismantle');
    break;
  }
};

roles.nextroomer.action = function (creep) {
  // TODO when does this happen?
  if (creep.room.name != creep.memory.routing.targetRoom) {
    delete creep.memory.routing.reached;
    return false;
  }

  // TODO ugly fix cause, target gets deleted
  creep.memory.targetBackup = creep.memory.targetBackup || creep.memory.target;
  if (creep.room.name === creep.memory.targetBackup) {
    return roles.nextroomer.settle(creep);
  }
  return roles.nextroomer.settle(creep);
};

roles.nextroomer.execute = function (creep) {
  creep.log('Execute!!!');
  //creep.moveTo(25, 25);
};