'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Creep.prototype.findClosestSourceKeeper = function () {
  return this.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: function filter(object) {
      if (object.owner.username === 'Source Keeper') {
        return true;
      }
      return false;
    }
  });
};

Creep.prototype.findClosestEnemy = function () {
  return this.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    filter: function filter(object) {
      return !brain.isFriend(object.owner.username);
    }
  });
};

Creep.prototype.fleeFromHostile = function (hostile) {
  var direction = this.pos.getDirectionTo(hostile);
  direction = (direction + 3) % 8 + 1;
  if (!direction || direction === null || this.pos.x === 0 || this.pos.x === 49 || this.pos.y === 0 || this.pos.y === 49) {
    this.moveTo(25, 25);
    return true;
  }
  for (var offset = 0, dir, pos; offset < 8; offset++) {
    var dir = (direction + offset) % 8 + 1;
    var pos = this.pos.getAdjacentPosition(dir);
    if (pos.lookFor(LOOK_TERRAIN)[0] !== STRUCTURE_WALL && pos.lookFor(LOOK_CREEPS).length === 0) {
      direction = direction + offset;
      break;
    }
  }
  this.rangedAttack(hostile);
  this.move(direction);
};

Creep.prototype.attackHostile = function (hostile) {
  var range = void 0;
  if (this.hits < 0.5 * this.hitsMax || this.pos.getRangeTo(hostile) < 3) {
    return this.fleeFromHostile(hostile);
  }

  var search = PathFinder.search(this.pos, {
    pos: hostile.pos,
    range: 0
  }, {
    roomCallback: this.room.getAvoids(this.room, {}, true),
    maxRooms: 0
  });

  if (search.incomplete) {
    this.moveRandom();
  }
  var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
  this.rangedAttack(hostile);
  return true;
};

Creep.prototype.healMyCreeps = function () {
  var myCreeps = this.room.find(FIND_MY_CREEPS, {
    filter: function filter(object) {
      if (object.hits < object.hitsMax) {
        return true;
      }
      return false;
    }
  });
  if (myCreeps.length > 0) {
    this.say('heal', true);
    this.moveTo(myCreeps[0]);
    if (this.pos.getRangeTo(myCreeps[0]) <= 1) {
      this.heal(myCreeps[0]);
    } else {
      this.rangedHeal(myCreeps[0]);
    }
    return true;
  }
  return false;
};

Creep.prototype.healAllyCreeps = function () {
  var allyCreeps = this.room.find(FIND_HOSTILE_CREEPS, {
    filter: function filter(object) {
      if (object.hits === object.hitsMax) {
        return false;
      }
      if (brain.isFriend(object.owner.username)) {
        return true;
      }
      return false;
    }
  });
  if (allyCreeps.length > 0) {
    this.say('heal ally', true);
    this.moveTo(allyCreeps[0]);
    var range = this.pos.getRangeTo(allyCreeps[0]);
    if (range <= 1) {
      this.heal(allyCreeps[0]);
    } else {
      this.rangedHeal(allyCreeps[0]);
    }
    return true;
  }
};

Creep.prototype.moveToHostileConstructionSites = function () {
  var constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
    filter: function filter(object) {
      if (!object.owner) {
        return false;
      }
      if (object.owner.username === Memory.username) {
        return false;
      }
      return true;
    }
  });
  if (constructionSite !== null) {
    this.say('kcs');
    this.log('Kill constructionSite: ' + (0, _stringify2.default)(constructionSite));
    var search = PathFinder.search(this.pos, {
      pos: constructionSite.pos,
      range: 0
    }, {
      roomCallback: this.room.getAvoids(this.room, {}, true),
      maxRooms: 0
    });

    if (search.incomplete) {
      this.moveRandom();
      return true;
    }
    var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
    return true;
  }
  return false;
};

Creep.prototype.handleDefender = function () {
  var hostile = this.findClosestEnemy();

  if (this.fightRampart(hostile)) {
    return true;
  }

  if (hostile !== null) {
    return this.attackHostile(hostile);
  }

  if (this.healMyCreeps()) {
    return true;
  }

  if (this.healAllyCreeps()) {
    return true;
  }

  if (this.moveToHostileConstructionSites()) {
    return true;
  }

  this.moveRandom();
  return true;
};

Creep.prototype.waitRampart = function () {
  this.say('waitRampart');
  var creep = this;
  var structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: function filter(object) {
      if (object.structureType != STRUCTURE_RAMPART) {
        return false;
      }
      return creep.pos.getRangeTo(object) > 0;
    }
  });

  if (!structure) {
    this.moveRandom();
    return true;
  }
  var search = PathFinder.search(this.pos, {
    pos: structure.pos,
    range: 0
  }, {
    roomCallback: this.room.getAvoids(this.room, {}, true),
    maxRooms: 0
  });

  if (search.incomplete) {
    this.moveRandom();
    return true;
  }
  var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
  return true;
};

Creep.prototype.fightRampart = function (target) {
  if (!target) {
    return false;
  }

  var position = target.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    filter: function filter(object) {
      return object.structureType === STRUCTURE_RAMPART;
    }
  });

  if (position === null) {
    return false;
  }

  var range = target.pos.getRangeTo(position);
  if (range > 3) {
    return false;
  }

  var callback = this.room.getMatrixCallback;

  // TODO Extract the callback method to ... e.g. room and replace this.room.getAvoids
  if (this.room.memory.costMatrix && this.room.memory.costMatrix.base) {
    var room = this.room;
    callback = function callback(end) {
      var callbackInner = function callbackInner(roomName) {
        var costMatrix = PathFinder.CostMatrix.deserialize(room.memory.costMatrix.base);
        // TODO the ramparts could be within existing walls (at least when converging to the newmovesim
        costMatrix.set(position.pos.x, position.pos.y, 0);
        return costMatrix;
      };
      return callbackInner;
    };
  }

  var search = PathFinder.search(this.pos, {
    pos: position.pos,
    range: 0
  }, {
    roomCallback: callback(position.pos),
    maxRooms: 1
  });

  var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
  if (returnCode === OK) {
    return true;
  }
  if (returnCode === ERR_TIRED) {
    return true;
  }

  this.log('creep_fight.fightRampart returnCode: ' + returnCode + ' path: ' + (0, _stringify2.default)(search.path[0]));

  var targets = this.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
    filter: this.room.findAttackCreeps
  });
  if (targets.length > 1) {
    this.rangedMassAttack();
  } else {
    this.rangedAttack(target);
  }
  return true;
};

Creep.prototype.flee = function (target) {
  var direction = this.pos.getDirectionTo(target);
  this.rangedAttack(target);
  direction = (direction + 3) % 8 + 1;
  var pos = this.pos.getAdjacentPosition(direction);
  var terrain = pos.lookFor(LOOK_TERRAIN)[0];
  if (terrain === 'wall') {
    direction = Math.random() * 8 + 1;
  }
  this.move(direction);
  return true;
};

Creep.prototype.fightRanged = function (target) {
  if (this.hits < 0.5 * this.hitsMax) {
    return this.flee(target);
  }

  var range = this.pos.getRangeTo(target);
  var direction = null;

  if (range <= 2) {
    return this.flee(target);
  }
  if (range <= 3) {
    var _returnCode = this.rangedAttack(target);
    return true;
  }

  var creep = this;
  var callbackFunction = function callbackFunction(roomName) {
    var callback = creep.room.getAvoids(creep.room);
    var costMatrix = callback(roomName);
    for (var i = 0; i < 50; i++) {
      costMatrix.set(i, 0, 0xFF);
      costMatrix.set(i, 49, 0xFF);
      costMatrix.set(0, i, 0xFF);
      costMatrix.set(49, i, 0xFF);
    }
    var room = Game.rooms[roomName];
    var structures = room.findPropertyFilter(FIND_STRUCTURES, 'structureType', [STRUCTURE_ROAD], true);
    for (var _i in structures) {
      var structure = structures[_i];
      costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
    }
    return costMatrix;
  };

  var search = PathFinder.search(this.pos, {
    pos: target.pos,
    range: 3
  }, {
    roomCallback: callbackFunction,
    maxRooms: 1
  });

  var returnCode = this.move(this.pos.getDirectionTo(search.path[0]));
  if (returnCode === OK) {
    return true;
  }
  if (returnCode === ERR_TIRED) {
    return true;
  }

  this.log('creep_ranged.attack_without_rampart returnCode: ' + returnCode);
};

Creep.prototype.siege = function () {
  this.memory.hitsLost = this.memory.hitsLast - this.hits;
  this.memory.hitsLast = this.hits;

  if (this.hits - this.memory.hitsLost < this.hits / 2) {
    var exitNext = this.pos.findClosestByRange(FIND_EXIT);
    this.moveTo(exitNext);
    return true;
  }

  if (!this.memory.notified) {
    this.log('Attacking');
    Game.notify(Game.time + ' ' + this.room.name + ' Attacking');
    this.memory.notified = true;
  }
  var tower = this.pos.findClosestStructure(FIND_HOSTILE_STRUCTURES, STRUCTURE_TOWER);
  var target = tower;
  if (tower === null) {
    var spawn = this.pos.findClosestStructure(FIND_HOSTILE_STRUCTURES, STRUCTURE_SPAWN);
    target = spawn;
  }
  if (target === null) {
    var cs = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    this.moveTo(cs);
    return false;
  }
  var path = this.pos.findPathTo(target, {
    ignoreDestructibleStructures: false,
    ignoreCreeps: true
  });
  var returnCode = void 0;

  var posLast = path[path.length - 1];
  if (path.length === 0 || !target.pos.isEqualTo(posLast.x, posLast.y)) {
    var structure = this.pos.findClosestStructure(FIND_STRUCTURES, STRUCTURE_RAMPART);
    returnCode = this.moveTo(structure);
    target = structure;
  } else {
    if (this.hits > this.hitsMax - 2000) {
      returnCode = this.moveByPath(path);
    }
  }

  var structures = target.pos.lookFor('structure');
  for (var i = 0; i < structures.length; i++) {
    if (structures[i].structureType === STRUCTURE_RAMPART) {
      target = structures[i];
      break;
    }
  }

  this.dismantle(target);
  return true;
};

Creep.prototype.squadHeal = function () {
  var range;
  var creepToHeal = this.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function filter(object) {
      return object.hits < object.hitsMax / 1.5;
    }
  });

  if (creepToHeal !== null) {
    range = this.pos.getRangeTo(creepToHeal);
    if (range <= 1) {
      this.heal(creepToHeal);
    } else {
      this.rangedHeal(creepToHeal);
      this.moveTo(creepToHeal);
    }
    return true;
  }

  creepToHeal = this.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function filter(object) {
      return object.hits < object.hitsMax;
    }
  });

  if (creepToHeal !== null) {
    range = this.pos.getRangeTo(creepToHeal);
    if (range > 1) {
      this.rangedHeal(creepToHeal);
    } else {
      this.heal(creepToHeal);
    }
    if (creepToHeal.id === this.id) {
      this.say('exit');
      var exit = this.pos.findClosestByRange(FIND_EXIT);
      this.moveTo(exit);
    } else {
      this.say((0, _stringify2.default)(creepToHeal));
      this.moveTo(creepToHeal);
    }
    return true;
  }

  var attacker = this.pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: function filter(object) {
      return object.memory.role === 'squadsiege';
    }
  });

  if (this.pos.x === 0 || this.pos.x === 49 || this.pos.y === 0 || this.pos.y === 49) {
    this.moveTo(25, 25);
    return true;
  }
  if (attacker === null) {
    var cs = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    this.moveTo(cs);
    return false;
  }
  this.moveTo(attacker);
  return false;
};