'use strict';

/*
 * Memory abstraction layer
 *
 * The methods build the interface to the memory.
 * Currently only for path
 * The idea is to cache paths as roomPosition in a global object.
 * Store paths from my rooms in a compressed form in memory.
 */

/**
 * Stores the costMatrix in cache or in case of a controller room
 * in memory, too.
 *
 * @param {Object} costMatrix - the costMatrix to save
 */

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.setMemoryCostMatrix = function (costMatrix) {
  if (!cache.rooms[this.name]) {
    this.log('Set No cache');
    cache.rooms[this.name] = {};
  }
  if (!cache.rooms[this.name].costMatrix) {
    this.log('Set No costMatrix');
    cache.rooms[this.name].costMatrix = {};
  }
  if (this.controller && this.controller.my) {
    if (!this.memory.costMatrix) {
      this.memory.costMatrix = {};
    }
    this.memory.costMatrix.base = costMatrix.serialize();
  }
  cache.rooms[this.name].costMatrix.base = costMatrix;
};

/**
 * Returns the costMatrix for the room. The cache will be populated
 * from memory.
 */
Room.prototype.getMemoryCostMatrix = function () {
  if (!cache.rooms[this.name]) {
    cache.rooms[this.name] = {};
  }
  if (!cache.rooms[this.name].costMatrix) {
    cache.rooms[this.name].costMatrix = {};
  }
  if (!cache.rooms[this.name].costMatrix.base) {
    if (!this.memory.costMatrix || !this.memory.costMatrix.base) {
      return;
    }
    cache.rooms[this.name].costMatrix.base = PathFinder.CostMatrix.deserialize(this.memory.costMatrix.base);
  }
  // if (!cache.rooms[this.name].costMatrix.base) {
  //   this.log('getMemoryCostMatrix' + cache.rooms[this.name].costMatrix.base + ' ' + cache.rooms[this.name].costMatrix);
  // }
  return cache.rooms[this.name].costMatrix.base;
};

/**
 * Returns all paths for this room from cache. Checks if cache and memory
 * paths fit, otherwise populate cache.
 */
Room.prototype.getMemoryPaths = function () {
  this.memory.routing = this.memory.routing || {};
  cache.rooms[this.name] = cache.rooms[this.name] || {};
  cache.rooms[this.name].routing = cache.rooms[this.name].routing || {};
  var memoryKeys = (0, _keys2.default)(this.memory.routing).sort();
  var cacheKeys = (0, _keys2.default)(cache.rooms[this.name].routing).sort();
  var diff = _.difference(memoryKeys, cacheKeys);
  for (var _iterator = diff, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    //    this.log(`getPaths ${item} missing in cache`);
    var path = void 0;
    try {
      path = Room.stringToPath(this.memory.routing[item].path);
    } catch (e) {
      path = this.memory.routing[item].path;
      this.memory.routing[item].path = Room.pathToString(path);
    }

    cache.rooms[this.name].routing[item] = {
      path: path,
      created: this.memory.routing[item].created,
      fixed: this.memory.routing[item].fixed,
      name: this.memory.routing[item].name
    };
  }
  return cache.rooms[this.name].routing;
};

/**
 * Returns the path for the given name. Checks for validity and populated
 * cache if missing.
^
 * @param {String} name - the name of the path
 */
Room.prototype.getMemoryPath = function (name) {
  this.memory.routing = this.memory.routing || {};
  cache.rooms[this.name] = cache.rooms[this.name] || {};
  cache.rooms[this.name].routing = cache.rooms[this.name].routing || {};

  var isValid = function isValid(path) {
    return path.fixed || path.created > Game.time - config.path.refresh;
  };

  if (cache.rooms[this.name].routing[name] && isValid(cache.rooms[this.name].routing[name])) {
    return cache.rooms[this.name].routing[name].path;
  }

  if (this.memory.routing[name] && isValid(this.memory.routing[name])) {
    //    this.log(`getPath ${name} missing in cache`);
    var path = void 0;
    try {
      path = Room.stringToPath(this.memory.routing[name].path);
    } catch (e) {
      path = this.memory.routing[name].path;
      this.memory.routing[name].path = Room.pathToString(path);
    }
    cache.rooms[this.name].routing[name] = {
      path: path,
      created: this.memory.routing[name].created,
      fixed: this.memory.routing[name].fixed,
      name: this.memory.routing[name].name
    };
    return cache.rooms[this.name].routing[name].path;
  }
  return false;
};

/**
 * Cleans the cache and memory from all paths
 */
Room.prototype.deleteMemoryPaths = function () {
  this.memory.routing = this.memory.routing || {};
  cache.rooms[this.name] = cache.rooms[this.name] || {};
  cache.rooms[this.name].routing = cache.rooms[this.name].routing || {};
  delete cache.rooms[this.name].routing;
  delete this.memory.routing;
};

/**
 * Removes the named path from cache and memory
 *
 * @param {String} name - the name of the path
 */
Room.prototype.deleteMemoryPath = function (name) {
  this.memory.routing = this.memory.routing || {};
  cache.rooms[this.name] = cache.rooms[this.name] || {};
  delete cache.rooms[this.name].routing[name];
  delete this.memory.routing[name];
};

/**
 * Stores the given path under the name in cache. If `fixed` is true
 * the path is stored in memory serialized.
 *
 * @param {String} name - the name of the path
 * @param {Array} path - the path itself
 * @param {boolean} fixed - Flag to define if the path should be stored in memory
 */
Room.prototype.setMemoryPath = function (name, path, fixed) {
  this.memory.routing = this.memory.routing || {};
  cache.rooms[this.name] = cache.rooms[this.name] || {};
  cache.rooms[this.name].routing = cache.rooms[this.name].routing || {};
  var data = {
    path: path,
    created: Game.time,
    fixed: fixed,
    name: name
  };
  cache.rooms[this.name].routing[name] = data;
  if (fixed) {
    var memoryData = {
      path: Room.pathToString(path),
      created: Game.time,
      fixed: fixed,
      name: name
    };
    this.memory.routing[name] = memoryData;
  }
};