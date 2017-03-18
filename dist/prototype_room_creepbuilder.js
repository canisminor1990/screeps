'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.creepMem = function (role, targetId, targetRoom, level, base) {
  return {
    role: role,
    routing: {
      targetRoom: targetRoom || this.name,
      targetId: targetId
    },
    level: level,
    base: base
  };
};

/**
 * get priority from config for a creep.
 *
 * @param  {Object} object the creep queue object
 * @return {Number}        the priority for creep
 */
Room.prototype.getPriority = function (object) {
  var priority = config.priorityQueue;
  var target = object.routing && object.routing.targetRoom;
  if (target === this.name) {
    return priority.sameRoom[object.role] || 4;
  } else if (target) {
    return priority.otherRoom[object.role] || 20 + Game.map.getRoomLinearDistance(this.name, target);
  } else {
    return 12;
  }
};

Room.prototype.spawnCheckForCreate = function () {
  var _this = this;

  var spawnsNotSpawning = _.filter(this.find(FIND_MY_SPAWNS), function (object) {
    return !object.spawning;
  });
  if (this.memory.queue.length === 0) {
    return false;
  }
  this.memory.queue = _.sortBy(this.memory.queue, function (c) {
    return _this.getPriority(c);
  });

  var creep = this.memory.queue[0];
  if (this.spawnCreateCreep(creep)) {
    this.memory.queue.shift();
    return true;
  }
  if (creep.ttl === 0) {
    this.log('TTL reached, skipping: ' + (0, _stringify2.default)(creep));
    this.memory.queue.shift();
    return false;
  }
  creep.ttl = creep.ttl || config.creep.queueTtl;
  if (spawnsNotSpawning.length === 0) {
    creep.ttl--;
  }
  return false;
};

Room.prototype.inQueue = function (creepMemory) {
  this.memory.queue = this.memory.queue || [];
  for (var _iterator = this.memory.queue, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var item = _ref;

    if (!item.routing) {
      continue;
    }
    var creepTarget = {
      targetId: item.routing.targetId,
      targetRoom: item.routing.targetRoom
    };
    var found = _.eq(creepMemory.routing, creepTarget) && creepMemory.role === item.role;
    if (found) {
      return true;
    }
  }
  return false;
};

Room.prototype.inRoom = function (creepMemory) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var _a = _(this.find(FIND_MY_SPAWNS));

  var _f = function _f(s) {
    return s.spawning && Game.creeps[s.spawning.name];
  };

  var _r = [];

  for (var _i2 = 0; _i2 < _a.length; _i2++) {
    _r.push(_f(_a[_i2], _i2, _a));
  }

  var creepsSpawning = _r.compact();
  var creeps = this.find(FIND_MY_CREEPS).concat(creepsSpawning);
  var iMax = creeps.length;
  if (!iMax) {
    return false;
  }
  var j = 0;
  this.memory.roles = this.memory.roles || {};
  for (var i = 0; i < iMax; i++) {
    var iMem = creeps[i].memory;
    if (!iMem) {
      continue;
    }
    if (creepMemory.role === iMem.role && (!iMem.routing || creepMemory.routing.targetRoom === iMem.routing.targetRoom && creepMemory.routing.targetId === iMem.routing.targetId)) {
      j++;
    }
    if (j >= amount) {
      this.memory.roles[creepMemory.role] = true;
      /**
      if (config.debug.queue) {
        this.log('Already enough ' + creepMemory.role);
      }
      **/
      return true;
    }
    this.memory.roles[creepMemory.role] = false;
  }
  return false;
};

/**
 * First function call for ask a creep spawn. Add it in queue after check if spawn is allow.
 *
 * @param  {string} role       the role of the creeps to spawn.
 * @param  {number} amount     the amount of creeps asked for (1).
 * @param  {string} targetId   the id of targeted object by creeps (null).
 * @param  {string} targetRoom the targeted room name (base)
 * @param  {number} level      the level of creeps. required by some functions.
 * @param  {string} base       the room which will spawn creep
 * @return {boolean}           if the spawn is not allow, it will return false.
 */
Room.prototype.checkRoleToSpawn = function (role, amount, targetId, targetRoom, level, base) {
  var creepMemory = this.creepMem(role, targetId, targetRoom, level, base);
  if (this.memory.roles && this.memory.roles[creepMemory.role] && Game.time % 10) {
    return false;
  }
  if (this.inQueue(creepMemory) || this.inRoom(creepMemory, amount)) {
    return false;
  }

  if (config.debug.queue) {
    this.log('Add ' + creepMemory.role + ' to queue.');
  }
  return this.memory.queue.push(creepMemory);
};

/**
 * Room.prototype.getPartsStringDatas used for parse parts as string and return
 * parts as array, cost, if spawn is allow and length.
 *
 * @param {String} parts String of body parts. e.g. 'MMWC'
 * @param {Number} energyAvailable energy allow for spawn.
 * @return {Object}       The parts datas :
 *                            .fail = true if not enouth energy
 *                            .cost = cost of parts
 *                            .parts = parts as array
 *                            .len = the amount of parts.
 */

Room.prototype.getPartsStringDatas = function (parts, energyAvailable) {
  if (!_.isString(parts) || parts === '') {
    return {
      null: true
    };
  }
  var ret = {};
  Memory.layoutsCost = Memory.layoutsCost || {};
  ret.cost = Memory.layoutsCost[parts] || 0;
  ret.parts = global.utils.stringToParts(parts);
  ret.len = ret.parts.length;
  if (ret.cost) {
    ret.fail = ret.cost > energyAvailable;
    return ret;
  }
  _.each(ret.parts, function (p) {
    ret.cost += BODYPART_COST[p];
    ret.fail = ret.cost > energyAvailable;
  });
  Memory.layoutsCost[parts] = ret.cost;
  return ret;
};

/**
 * Room.prototype.getSettings use for return creep spawn settings
 * adapted to room configuration
 *
 * @param {Collection} creep queue's creep spawn basic datas
 */
Room.prototype.getSettings = function (creep) {
  var _this2 = this;

  var role = creep.role;
  var updateSettings = roles[role].updateSettings && roles[role].updateSettings(this, creep);
  var settings = _.merge(roles[role].settings, updateSettings);
  if (!settings) {
    this.log('try to spawn ', role, ' but settings are not done. Abort spawn');
    return;
  }
  var param = settings.param;
  return _.mapValues(settings, function (setting, settingName) {
    if (!param) {
      return setting;
    }
    for (var _iterator2 = param, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

      var parameter = _ref2;

      if (_.isString(setting) || _.isNumber(setting) || _.isArray(setting)) {
        break;
      }
      var valueForI = _.get(_this2, parameter, 1);
      var foundKey = 0;
      for (var _iterator3 = (0, _keys2.default)(setting), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

        var key = _ref3;

        if (valueForI < key && foundKey !== 0) {
          break;
        }
        foundKey = key;
      }
      setting = setting[foundKey];
    }
    return setting;
  });
};

/**
 * Transform a string using an array char ammount. e.g. ('WMC', [1,2,3]) ==> 'WMMCCC'
 *
 * @param  {String} input  the input parts as string.
 * @param  {Array} amount the amount of each char needed.
 * @return {String}        the new parts string
 */
Room.prototype.applyAmount = function (input, amount) {
  if (!input) {
    return '';
  }
  if (!amount) {
    return input;
  }
  var cost = 0;
  var parts = [];
  var output = '';
  var _a2 = _;
  var _f2 = amount;

  for (var _i5 = 0; _i5 < _a2.length; _i5++) {
    _f2(_a2[_i5], _i5, _a2);
  }

  undefined;
  return output;
};

/**
 * Sort body parts with the same order used in layout. Parts not in layout are last ones.
 *
 * @param  {array} parts  the parts array to sort.
 * @param  {array} layout the base layout.
 * @return {array}        sorted array.
 */
Room.prototype.sortParts = function (parts, layout) {
  return _.sortBy(parts, function (p) {
    var order = _.indexOf(layout.parts, p) + 1;
    if (order) {
      return order;
    } else {
      return layout.len;
    }
  });
};

/**
 * Room.prototype.getPartsConfig use for generate adapted body
 *
 * @param {Collection} creep queue's creep spawn basic datas
 */

Room.prototype.getPartConfig = function (creep) {
  var energyAvailable = this.energyAvailable;

  var _getSettings = this.getSettings(creep),
      prefixString = _getSettings.prefixString,
      layoutString = _getSettings.layoutString,
      amount = _getSettings.amount,
      maxLayoutAmount = _getSettings.maxLayoutAmount,
      sufixString = _getSettings.sufixString;

  var maxBodyLength = MAX_CREEP_SIZE;
  if (prefixString) {
    maxBodyLength -= prefixString.length;
  }
  if (sufixString) {
    maxBodyLength -= sufixString.length;
  }

  var prefix = this.getPartsStringDatas(prefixString, energyAvailable);
  if (prefix.fail) {
    return false;
  }
  energyAvailable -= prefix.cost || 0;
  layoutString = this.applyAmount(layoutString, amount);
  var layout = this.getPartsStringDatas(layoutString, energyAvailable);
  if (layout.fail || layout.null) {
    return false;
  }
  var parts = prefix.parts || [];
  var maxRepeat = Math.floor(Math.min(energyAvailable / layout.cost, maxBodyLength / layout.len));
  if (maxLayoutAmount) {
    maxRepeat = Math.min(maxLayoutAmount, maxRepeat);
  }
  parts = parts.concat(_.flatten(Array(maxRepeat).fill(layout.parts)));
  energyAvailable -= layout.cost * maxRepeat;

  var sufix = this.getPartsStringDatas(sufixString, energyAvailable);
  if (!sufix.fail && !sufix.null) {
    parts = parts.concat(sufix.parts);
  }
  if (config.debug.spawn) {
    this.log('Spawning ' + creep.role + ' - - - Body: ' + (0, _stringify2.default)(prefix.parts) + ' - ' + maxRepeat + ' * ' + (0, _stringify2.default)(layout.parts) + ' - ' + (0, _stringify2.default)(sufix.parts));
  }
  return config.creep.sortParts ? this.sortParts(parts, layout) : parts;
};

Room.prototype.getSpawnableSpawns = function () {
  var spawns = this.find(FIND_MY_SPAWNS);
  _.each(spawns, function (s) {
    if (s && s.spawning) {
      spawns.shift();
    }
  });
  return spawns;
};

Room.prototype.getCreepConfig = function (creep) {
  var role = creep.role;
  var unit = roles[role];
  if (!unit) {
    this.log('Can not find role: ' + role + ' creep_' + role);
    return false;
  }
  var id = Math.floor(Math.random() * 1000 + 1);
  var name = role + '-' + id;
  var partConfig = this.getPartConfig(creep);
  if (!partConfig) {
    return;
  }
  var memory = {
    role: role,
    number: id,
    step: 0,
    base: creep.base || this.name,
    born: Game.time,
    heal: creep.heal,
    level: creep.level,
    squad: creep.squad,
    killPrevious: unit.killPrevious,
    flee: unit.flee,
    buildRoad: unit.buildRoad,
    routing: creep.routing
  };
  return {
    name: name,
    memory: memory,
    partConfig: partConfig
  };
};

/**
 * Room.prototype.spawnCreateCreep use for launch spawn of first creep in queue.
 *
 * @param {Collection} creep Object with queue's creep datas.
 */
Room.prototype.spawnCreateCreep = function (creep) {
  var spawns = this.getSpawnableSpawns();

  if (spawns.length === 0) {
    return;
  }

  var creepConfig = this.getCreepConfig(creep);
  if (!creepConfig) {
    return false;
  }

  for (var _iterator4 = spawns, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
    var _ref4;

    if (_isArray4) {
      if (_i6 >= _iterator4.length) {
        break;
      }

      _ref4 = _iterator4[_i6++];
    } else {
      _i6 = _iterator4.next();

      if (_i6.done) {
        break;
      }

      _ref4 = _i6.value;
    }

    var spawn = _ref4;

    if (spawn.createCreep(creepConfig.partConfig, creepConfig.name, creepConfig.memory) != creepConfig.name) {
      continue;
    }
    brain.stats.modifyRoleAmount(creep.role, 1);
    return true;
  }
  return false;
};

Room.prototype.checkAndSpawnSourcer = function () {
  var sources = this.find(FIND_SOURCES);

  var source = void 0;

  var isSourcer = function isSourcer(object) {
    if (object.memory.role !== 'sourcer') {
      return false;
    }
    if (object.memory.routing && object.memory.routing.targetId !== source.id) {
      return false;
    }
    if (object.memory.routing && object.memory.routing.targetRoom !== source.pos.roomName) {
      return false;
    }
    return true;
  };

  for (var _iterator5 = sources, _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
    if (_isArray5) {
      if (_i7 >= _iterator5.length) {
        break;
      }

      source = _iterator5[_i7++];
    } else {
      _i7 = _iterator5.next();

      if (_i7.done) {
        break;
      }

      source = _i7.value;
    }

    var sourcers = this.find(FIND_MY_CREEPS, {
      filter: isSourcer
    });
    if (sourcers.length === 0) {
      //      this.log(source.id);
      this.checkRoleToSpawn('sourcer', 1, source.id, this.name);
    }
  }
};