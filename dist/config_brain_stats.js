'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

brain.stats.init = function () {
  var _Memory$stats;

  var userName = Memory.username;
  if (!config.stats.enabled || !userName) {
    return false;
  }
  Memory.stats = (_Memory$stats = {}, _Memory$stats[userName] = {
    roles: {},
    room: {}
  }, _Memory$stats);

  var _a = _(Game.creeps);

  var _f = function _f(c) {
    return c.memory.role;
  };

  var _r = [];

  for (var _i = 0; _i < _a.length; _i++) {
    _r.push(_f(_a[_i], _i, _a));
  }

  var rolesNames = _r.countBy(function (r) {
    return r;
  }).value();
  _.each(rolesNames, function (element, index) {
    Memory.stats[userName].roles[index] = element;
  });
};

brain.stats.modifyRoleAmount = function (role, diff) {
  var userName = Memory.username;
  if (!config.stats.enabled || !userName) {
    return false;
  }
  if (Memory.stats && Memory.stats[userName] && Memory.stats[userName].roles) {
    var roleStat = Memory.stats[userName].roles[role];
    var previousAmount = roleStat ? roleStat : 0;
    var amount = diff < 0 && previousAmount < -diff ? 0 : previousAmount + diff;
    brain.stats.add(['roles', role], amount);
  } else {
    brain.stats.init();
  }
};

/**
 * stats.add use for push anything into Memory.stats at a given place.
 *
 * @param {Array} path Sub stats path.
 * @param {Any} newContent The value to push into stats.
 *
 */
brain.stats.add = function (path, newContent) {
  if (!config.stats.enabled || Game.time % 3) {
    return false;
  }

  var userName = Memory.username;
  Memory.stats = Memory.stats || {};
  Memory.stats[userName] = Memory.stats[userName] || {};

  var current = Memory.stats[userName];
  for (var _iterator = path, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var item = _ref;

    if (!current[item]) {
      current[item] = {};
    }
    current = current[item];
  }

  current = _.merge(current, newContent);
  return true;
};

/**
 * stats.addRoot sets the root values, cpu, exec, gcl
 *
 */
brain.stats.addRoot = function () {
  if (!config.stats.enabled || Game.time % 3) {
    return false;
  }
  brain.stats.add([], {
    cpu: {
      limit: Game.cpu.limit,
      tickLimit: Game.cpu.tickLimit,
      bucket: Game.cpu.bucket
    },
    exec: {
      halt: Game.cpu.bucket < Game.cpu.tickLimit * 2
    },
    gcl: {
      level: Game.gcl.level,
      progress: Game.gcl.progress,
      progressTotal: Game.gcl.progressTotal
    }
  });
  return true;
};

/**
 * stats.addRoom call stats.add with given values and given sub room path.
 *
 * @param {String} roomName The room which from we will save stats.
 *
 */
brain.stats.addRoom = function (roomName, previousCpu) {
  if (!config.stats.enabled || Game.time % 3) {
    return false;
  }

  var room = Game.rooms[roomName];
  if (!room) {
    return false;
  }
  room.memory.upgraderUpgrade = room.memory.upgraderUpgrade || 0;
  var _a2 = _;

  var _f2 = room.find(FIND_SOURCES);

  var _r2 = [];

  for (var _i3 = 0; _i3 < _a2.length; _i3++) {
    _r2.push(_f2(_a2[_i3], _i3, _a2));
  }

  brain.stats.add(['room', roomName], {
    energy: {
      available: room.energyAvailable,
      capacity: room.energyCapacityAvailable,
      sources: _.sum(_r2)
    },
    controller: {
      progress: room.controller.progress,
      preCalcSpeed: room.memory.upgraderUpgrade / (Game.time % 100),
      progressTotal: room.controller.progressTotal
    },
    creeps: {
      into: room.find(FIND_CREEPS).length,
      queue: room.memory.queue.length
    },
    cpu: Game.cpu.getUsed() - previousCpu
  });

  if (room.storage) {
    var storage = room.storage;
    brain.stats.add(['room', roomName, 'storage'], {
      energy: storage.store.energy,
      power: storage.store.power
    });
  }
  if (room.terminal) {
    var terminal = room.terminal;
    brain.stats.add(['room', roomName, 'terminal'], {
      energy: terminal.store.energy,
      minerals: _.sum(terminal.store) - terminal.store.energy
    });
  }
  return true;
};