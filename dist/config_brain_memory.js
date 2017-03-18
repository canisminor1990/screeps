'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

brain.setMarketOrdersBuy = function () {
  Memory.mineralSystemPrice = {};
  Memory.ordersBuy = _.filter(Game.market.getAllOrders(), function (object) {
    if (object.type != ORDER_BUY) {
      return false;
    }
    if (object.resourceType === 'token') {
      return false;
    }
    var patt = /([A-Z]+)(\d+)([A-Z]+)(\d+)/;
    var result = patt.exec(object.roomName);
    if (result[2] % 10 !== 0 && result[4] % 10 !== 0) {
      return false;
    }
    return true;
  });
};

brain.setConstructionSites = function () {
  if (!Memory.constructionSites) {
    Memory.constructionSites = {};
  }

  if (Game.time % config.constructionSite.maxIdleTime === 0) {
    var constructionSites = {};
    for (var csId in Game.constructionSites) {
      var cs = Game.constructionSites[csId];
      var csMem = Memory.constructionSites[csId];
      if (csMem) {
        if (csMem === cs.progress) {
          console.log(csId + ' constructionSite too old');
          var csObject = Game.getObjectById(csId);
          var returnCode = csObject.remove();
          console.log('Delete constructionSite: ' + returnCode);
          continue;
        }
      }
      constructionSites[csId] = cs.progress;
    }
    Memory.constructionSites = constructionSites;
    console.log('Known constructionSites: ' + (0, _keys2.default)(constructionSites).length);
  }
};

brain.addToStats = function (name) {
  var role = Memory.creeps[name].role;
  brain.stats.modifyRoleAmount(role, -1);
};

brain.handleUnexpectedDeadCreeps = function (name, creepMemory) {
  console.log(name, 'Not in Game.creeps', Game.time - creepMemory.born, Memory.creeps[name].base);
  if (Game.time - creepMemory.born < 20) {
    return;
  }

  if (!creepMemory.role) {
    delete Memory.creeps[name];
    return;
  }

  var unit = roles[creepMemory.role];
  if (!unit) {
    delete Memory.creeps[name];
    return;
  }
  if (unit.died) {
    unit.died(name, creepMemory);
    //            delete Memory.creeps[name];
  } else {
    delete Memory.creeps[name];
  }
};

brain.cleanCreeps = function () {
  // Cleanup memory
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      brain.addToStats(name);
      if (name.startsWith('reserver') && Memory.creeps[name].born < Game.time - CREEP_CLAIM_LIFE_TIME || Memory.creeps[name].born < Game.time - CREEP_LIFE_TIME) {
        delete Memory.creeps[name];
        continue;
      }

      var creepMemory = Memory.creeps[name];
      if (creepMemory.killed) {
        delete Memory.creeps[name];
        continue;
      }

      brain.handleUnexpectedDeadCreeps(name, creepMemory);
    }
  }
};

brain.cleanSquads = function () {
  if (Game.time % 1500 === 0) {
    for (var squadId in Memory.squads) {
      var squad = Memory.squads[squadId];
      if (Game.time - squad.born > 3000) {
        console.log('Delete squad ' + squadId);
        delete Memory.squads[squadId];
      }
    }
  }
};

brain.cleanRooms = function () {
  if (Game.time % 300 === 0) {
    for (var name in Memory.rooms) {
      // Check for reserved rooms
      var memory = Memory.rooms[name];
      if (!Memory.rooms[name].lastSeen) {
        console.log('Deleting ' + name + ' from memory no `last_seen` value');
        delete Memory.rooms[name];
        continue;
      }
      if (Memory.rooms[name].lastSeen < Game.time - config.room.lastSeenThreshold) {
        console.log('Deleting ' + name + ' from memory older than ' + config.room.lastSeenThreshold);
        delete Memory.rooms[name];
        continue;
      }
    }
  }
};

brain.getStorageStringForRoom = function (strings, room, interval) {
  var addToString = function addToString(variable, name, value) {
    strings[variable] += name + ':' + value + ' ';
  };

  if (room.storage.store.energy < 200000) {
    addToString('storageLowString', room.name, room.storage.store.energy);
  } else if (room.storage.store.energy > 800000) {
    addToString('storageHighString', room.name, room.storage.store.energy);
  } else {
    addToString('storageMiddleString', room.name, room.storage.store.energy);
  }
  if (room.storage.store.power && room.storage.store.power > 0) {
    addToString('storagePower', room.name, room.storage.store.power);
  }
  // TODO 15 it should be
  if (Math.ceil(room.memory.upgraderUpgrade / interval) < 15) {
    addToString('upgradeLess', room.name, room.memory.upgraderUpgrade / interval);
  }
  room.memory.upgraderUpgrade = 0;
};

brain.printSummary = function () {
  var interval = 100;
  if (Game.time % interval !== 0) {
    return;
  }
  var diff = Game.gcl.progress - Memory.progress;
  Memory.progress = Game.gcl.progress;

  var strings = {
    storageNoString: '',
    storageLowString: '',
    storageMiddleString: '',
    storageHighString: '',
    storagePower: '',
    upgradeLess: ''
  };
  for (var _iterator = Memory.myRooms, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var name = _ref;

    var room = Game.rooms[name];
    if (!room || !room.storage) {
      strings.storageNoString += name + ' ';
      continue;
    }
    brain.getStorageStringForRoom(strings, room, interval);
  }

  console.log('=========================\nProgress: ' + diff / interval + '/' + Memory.myRooms.length * 15 + '\nConstructionSites: ' + (0, _keys2.default)(Memory.constructionSites).length + '\n-------------------------\nNo storage: ' + strings.storageNoString + '\nLow storage: ' + strings.storageLowString + '\nMiddle storage: ' + strings.storageMiddleString + '\nHigh storage: ' + strings.storageHighString + '\n-------------------------\nPower storage: ' + strings.storagePower + '\n-------------------------\nUpgrade less: ' + strings.upgradeLess + '\n=========================');
};

brain.prepareMemory = function () {
  var _a2 = _.chain(Game.rooms);

  var _f2 = 'controller';
  var _r2 = [];

  for (var _i3 = 0; _i3 < _a2.length; _i3++) {
    _r2.push(_f2(_a2[_i3], _i3, _a2));
  }

  var _a = _r2.flatten().filter('my');

  var _f = 'owner.username';
  var _r = [];

  for (var _i2 = 0; _i2 < _a.length; _i2++) {
    _r.push(_f(_a[_i2], _i2, _a));
  }

  Memory.username = Memory.username || _r.first().value();
  brain.setMarketOrdersBuy();
  brain.setConstructionSites();
  brain.cleanCreeps();
  brain.cleanSquads();
  brain.cleanRooms();
  if (config.stats.summary) {
    brain.printSummary();
  }
};