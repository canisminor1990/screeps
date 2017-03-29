module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 128);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timer = __webpack_require__(73);

Object.defineProperty(exports, 'timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timer).default;
  }
});

var _color = __webpack_require__(60);

Object.defineProperty(exports, 'color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_color).default;
  }
});

var _colorType = __webpack_require__(61);

Object.defineProperty(exports, 'colorType', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_colorType).default;
  }
});

var _table = __webpack_require__(68);

Object.defineProperty(exports, 'table', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_table).default;
  }
});

var _emoji = __webpack_require__(64);

Object.defineProperty(exports, 'emoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emoji).default;
  }
});

var _debug = __webpack_require__(63);

Object.defineProperty(exports, 'debug', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_debug).default;
  }
});

var _createConstructionSite = __webpack_require__(62);

Object.defineProperty(exports, 'createConstructionSite', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createConstructionSite).default;
  }
});

var _action = __webpack_require__(59);

Object.defineProperty(exports, 'action', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_action).default;
  }
});

var _isFriend = __webpack_require__(66);

Object.defineProperty(exports, 'isFriend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFriend).default;
  }
});

var _isFull = __webpack_require__(67);

Object.defineProperty(exports, 'fullCheck', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFull).default;
  }
});

var _flagCommand = __webpack_require__(65);

Object.defineProperty(exports, 'flagCommand', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_flagCommand).default;
  }
});

var _targetMaker = __webpack_require__(71);

Object.defineProperty(exports, 'targetMaker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetMaker).default;
  }
});

var _targetChanger = __webpack_require__(69);

Object.defineProperty(exports, 'targetChanger', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetChanger).default;
  }
});

var _targetFormat = __webpack_require__(70);

Object.defineProperty(exports, 'targetFormat', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetFormat).default;
  }
});

var _targetPos = __webpack_require__(72);

Object.defineProperty(exports, 'targetPos', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetPos).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveTo = __webpack_require__(80);

Object.defineProperty(exports, "moveTo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveTo).default;
  }
});

var _attack = __webpack_require__(74);

Object.defineProperty(exports, "attack", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _heal = __webpack_require__(79);

Object.defineProperty(exports, "heal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_heal).default;
  }
});

var _build = __webpack_require__(75);

Object.defineProperty(exports, "build", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _repair = __webpack_require__(82);

Object.defineProperty(exports, "repair", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_repair).default;
  }
});

var _dismantle = __webpack_require__(77);

Object.defineProperty(exports, "dismantle", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

var _harvest = __webpack_require__(78);

Object.defineProperty(exports, "harvest", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvest).default;
  }
});

var _pickup = __webpack_require__(81);

Object.defineProperty(exports, "pickup", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pickup).default;
  }
});

var _transfer = __webpack_require__(83);

Object.defineProperty(exports, "transfer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transfer).default;
  }
});

var _withdraw = __webpack_require__(85);

Object.defineProperty(exports, "withdraw", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withdraw).default;
  }
});

var _upgradeController = __webpack_require__(84);

Object.defineProperty(exports, "upgradeController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgradeController).default;
  }
});

var _claimController = __webpack_require__(76);

Object.defineProperty(exports, "claimController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claimController).default;
  }
});

var _findInRange = __webpack_require__(88);

Object.defineProperty(exports, "findInRange", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findInRange).default;
  }
});

var _findClosestInRange = __webpack_require__(87);

Object.defineProperty(exports, "findClosestInRange", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findClosestInRange).default;
  }
});

var _findClosestByRange = __webpack_require__(86);

Object.defineProperty(exports, "findClosestByRange", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findClosestByRange).default;
  }
});

var _lookFor = __webpack_require__(89);

Object.defineProperty(exports, "lookFor", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_lookFor).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayPush = __webpack_require__(19),
    isFlattenable = __webpack_require__(34);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var identity = __webpack_require__(4),
    overRest = __webpack_require__(35),
    setToString = __webpack_require__(37);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(90);

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var room = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.rooms['W81S67'];

	return {
		role: (0, _role2.default)(room).sort(function (a, b) {
			return a.priority - b.priority;
		}),
		repair: {
			percent: 0.5,
			maxHits: 30000
		},
		linkMain: '58d505eb204ecd9e507951f0'
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attack = __webpack_require__(91);

Object.defineProperty(exports, 'attack', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _moveTo = __webpack_require__(93);

Object.defineProperty(exports, 'moveTo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveTo).default;
  }
});

var _dismantle = __webpack_require__(92);

Object.defineProperty(exports, 'dismantle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var originalFindPath = Room.prototype.findPath;
var setup = false;

function creepMemoryCleanUp() {
  if (Game.time - Memory.screepsPerf.lastMemoryCleanUp > 100) {
    Object.keys(Memory.creeps).forEach(function (creepName) {
      if (!Game.creeps[creepName]) {
        Memory.creeps[creepName] = undefined;
      }
    });
    Memory.screepsPerf.lastMemoryCleanUp = Game.time;
  }
};

module.exports = function (options) {
  if (!setup) {
    options = options || {};
    Memory.screepsPerf = Memory.screepsPerf || {
      lastMemoryCleanUp: Game.time
    };

    if (options.speedUpArrayFunctions || options.speedUpArrayFunctions === undefined) {
      Array.prototype.filter = function (callback, thisArg) {
        var results = [];
        var arr = this;
        for (var iterator = 0; iterator < arr.length; iterator++) {
          if (callback.call(thisArg, arr[iterator], iterator, arr)) {
            results.push(arr[iterator]);
          }
        }
        return results;
      };

      Array.prototype.forEach = function (callback, thisArg) {
        var arr = this;
        for (var iterator = 0; iterator < arr.length; iterator++) {
          callback.call(thisArg, arr[iterator], iterator, arr);
        }
      };

      Array.prototype.map = function (callback, thisArg) {
        var arr = this;
        var returnVal = [];
        for (var iterator = 0; iterator < arr.length; iterator++) {
          returnVal.push(callback.call(thisArg, arr[iterator], iterator, arr));
        }
        return returnVal;
      };
    }

    /**
     * Creep memory clean up... this speeds up the initial memory parse each tick.
     */
    if (options.cleanUpCreepMemory || options.cleanUpCreepMemory === undefined) {
      // Monkey patch creating creeps so that we can clean up their memory without forcing the user to make a call.
      var originalCreateCreep = Spawn.prototype.createCreep;
      Spawn.prototype.createCreep = function () {
        creepMemoryCleanUp();
        return originalCreateCreep.apply(this, arguments);
      };
    }

    /**
     * FIND PATH OPTIMIZATION
     * This cache's the built in findPath results in memory and reuses them as long as that same path is used at least 1/300 ticks.
     * The cached path is also refreshed every 2000 ticks.  This helps to ensure that creeps respond to changing room terrain.
     */
    if (options.optimizePathFinding || options.optimizePathFinding === undefined) {
      var roomPositionIdentifier = function roomPositionIdentifier(roomPosition) {
        return roomPosition.roomName + 'x' + roomPosition.x + 'y' + roomPosition.y;
      };

      ;

      Room.prototype.findPath = function (fromPos, toPos, options) {
        creepMemoryCleanUp();
        if (!Memory.pathOptimizer) {
          Memory.pathOptimizer = { lastCleaned: Game.time };
        }

        if (Game.time - Memory.pathOptimizer.lastCleaned > 40 && !this._cleanedUp) {
          var keys = Object.keys(Memory.pathOptimizer);
          keys.forEach(function (key) {
            var val = Memory.pathOptimizer[key];
            if (val && (val.used / (Game.time - val.tick) < 1 / 300 || Game.time - val.tick > 2000)) {
              Memory.pathOptimizer[key] = undefined;
            }
          });
          this._cleanedUp = true;
          Memory.pathOptimizer.lastCleaned = Game.time;
        }

        var pathIdentifier = roomPositionIdentifier(fromPos) + roomPositionIdentifier(toPos);
        if (!Memory.pathOptimizer[pathIdentifier]) {
          var path = originalFindPath.apply(this, arguments);
          Memory.pathOptimizer[pathIdentifier] = {
            tick: Game.time,
            path: Room.serializePath(path),
            used: 1
          };
        } else {
          Memory.pathOptimizer[pathIdentifier].used++;
        }

        return Room.deserializePath(Memory.pathOptimizer[pathIdentifier].path);
      };
    }
    setup = true;
  }

  return {
    originalFindPath: originalFindPath
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var usedOnStart = 0;
var enabled = false;
var depth = 0;

function setupProfiler() {
  depth = 0; // reset depth, this needs to be done each tick.
  Game.profiler = {
    stream: function stream(duration, filter) {
      setupMemory('stream', duration || 10, filter);
    },
    email: function email(duration, filter) {
      setupMemory('email', duration || 100, filter);
    },
    profile: function profile(duration, filter) {
      setupMemory('profile', duration || 100, filter);
    },
    background: function background(filter) {
      setupMemory('background', false, filter);
    },
    restart: function restart() {
      if (Profiler.isProfiling()) {
        var filter = Memory.profiler.filter;
        var duration = false;
        if (!!Memory.profiler.disableTick) {
          // Calculate the original duration, profile is enabled on the tick after the first call,
          // so add 1.
          duration = Memory.profiler.disableTick - Memory.profiler.enabledTick + 1;
        }
        var type = Memory.profiler.type;
        setupMemory(type, duration, filter);
      }
    },

    reset: resetMemory,
    output: Profiler.output
  };

  overloadCPUCalc();
}

function setupMemory(profileType, duration, filter) {
  resetMemory();
  var disableTick = Number.isInteger(duration) ? Game.time + duration : false;
  if (!Memory.profiler) {
    Memory.profiler = {
      map: {},
      totalTime: 0,
      enabledTick: Game.time + 1,
      disableTick: disableTick,
      type: profileType,
      filter: filter
    };
  }
}

function resetMemory() {
  Memory.profiler = null;
}

function overloadCPUCalc() {
  if (Game.rooms.sim) {
    usedOnStart = 0; // This needs to be reset, but only in the sim.
    Game.cpu.getUsed = function getUsed() {
      return performance.now() - usedOnStart;
    };
  }
}

function getFilter() {
  return Memory.profiler.filter;
}

var functionBlackList = ['getUsed', // Let's avoid wrapping this... may lead to recursion issues and should be inexpensive.
'constructor'];

function wrapFunction(name, originalFunction) {
  return function wrappedFunction() {
    if (Profiler.isProfiling()) {
      var nameMatchesFilter = name === getFilter();
      var start = Game.cpu.getUsed();
      if (nameMatchesFilter) {
        depth++;
      }
      var result = originalFunction.apply(this, arguments);
      if (depth > 0 || !getFilter()) {
        var end = Game.cpu.getUsed();
        Profiler.record(name, end - start);
      }
      if (nameMatchesFilter) {
        depth--;
      }
      return result;
    }

    return originalFunction.apply(this, arguments);
  };
}

function hookUpPrototypes() {
  Profiler.prototypes.forEach(function (proto) {
    profileObjectFunctions(proto.val, proto.name);
  });
}

function profileObjectFunctions(object, label) {
  var objectToWrap = object.prototype ? object.prototype : object;

  Object.getOwnPropertyNames(objectToWrap).forEach(function (functionName) {
    var extendedLabel = label + '.' + functionName;
    try {
      var isFunction = typeof objectToWrap[functionName] === 'function';
      var notBlackListed = functionBlackList.indexOf(functionName) === -1;
      if (isFunction && notBlackListed) {
        var originalFunction = objectToWrap[functionName];
        objectToWrap[functionName] = profileFunction(originalFunction, extendedLabel);
      }
    } catch (e) {} /* eslint no-empty:0 */
  });

  return objectToWrap;
}

function profileFunction(fn, functionName) {
  var fnName = functionName || fn.name;
  if (!fnName) {
    console.log('Couldn\'t find a function name for - ', fn);
    console.log('Will not profile this function.');
    return fn;
  }

  return wrapFunction(fnName, fn);
}

var Profiler = {
  printProfile: function printProfile() {
    console.log(Profiler.output());
  },
  emailProfile: function emailProfile() {
    Game.notify(Profiler.output());
  },
  output: function output(numresults) {
    var displayresults = !!numresults ? numresults : 20;
    if (!Memory.profiler || !Memory.profiler.enabledTick) {
      return 'Profiler not active.';
    }

    var elapsedTicks = Game.time - Memory.profiler.enabledTick + 1;
    var header = 'calls\t\ttime\t\tavg\t\tfunction';
    var footer = ['Avg: ' + (Memory.profiler.totalTime / elapsedTicks).toFixed(2), 'Total: ' + Memory.profiler.totalTime.toFixed(2), 'Ticks: ' + elapsedTicks].join('\t');
    return [].concat(header, Profiler.lines().slice(0, displayresults), footer).join('\n');
  },
  lines: function lines() {
    var stats = Object.keys(Memory.profiler.map).map(function (functionName) {
      var functionCalls = Memory.profiler.map[functionName];
      return {
        name: functionName,
        calls: functionCalls.calls,
        totalTime: functionCalls.time,
        averageTime: functionCalls.time / functionCalls.calls
      };
    }).sort(function (val1, val2) {
      return val2.totalTime - val1.totalTime;
    });

    var lines = stats.map(function (data) {
      return [data.calls, data.totalTime.toFixed(1), data.averageTime.toFixed(3), data.name].join('\t\t');
    });

    return lines;
  },


  prototypes: [{ name: 'Game', val: Game }, { name: 'Room', val: Room }, { name: 'Structure', val: Structure }, { name: 'Spawn', val: Spawn }, { name: 'Creep', val: Creep }, { name: 'RoomPosition', val: RoomPosition }, { name: 'Source', val: Source }, { name: 'Flag', val: Flag }],

  record: function record(functionName, time) {
    if (!Memory.profiler.map[functionName]) {
      Memory.profiler.map[functionName] = {
        time: 0,
        calls: 0
      };
    }
    Memory.profiler.map[functionName].calls++;
    Memory.profiler.map[functionName].time += time;
  },
  endTick: function endTick() {
    if (Game.time >= Memory.profiler.enabledTick) {
      var cpuUsed = Game.cpu.getUsed();
      Memory.profiler.totalTime += cpuUsed;
      Profiler.report();
    }
  },
  report: function report() {
    if (Profiler.shouldPrint()) {
      Profiler.printProfile();
    } else if (Profiler.shouldEmail()) {
      Profiler.emailProfile();
    }
  },
  isProfiling: function isProfiling() {
    if (!enabled || !Memory.profiler) {
      return false;
    }
    return !Memory.profiler.disableTick || Game.time <= Memory.profiler.disableTick;
  },
  type: function type() {
    return Memory.profiler.type;
  },
  shouldPrint: function shouldPrint() {
    var streaming = Profiler.type() === 'stream';
    var profiling = Profiler.type() === 'profile';
    var onEndingTick = Memory.profiler.disableTick === Game.time;
    return streaming || profiling && onEndingTick;
  },
  shouldEmail: function shouldEmail() {
    return Profiler.type() === 'email' && Memory.profiler.disableTick === Game.time;
  }
};

module.exports = {
  wrap: function wrap(callback) {
    if (enabled) {
      setupProfiler();
    }

    if (Profiler.isProfiling()) {
      usedOnStart = Game.cpu.getUsed();

      // Commented lines are part of an on going experiment to keep the profiler
      // performant, and measure certain types of overhead.

      // var callbackStart = Game.cpu.getUsed();
      var returnVal = callback();
      // var callbackEnd = Game.cpu.getUsed();
      Profiler.endTick();
      // var end = Game.cpu.getUsed();

      // var profilerTime = (end - start) - (callbackEnd - callbackStart);
      // var callbackTime = callbackEnd - callbackStart;
      // var unaccounted = end - profilerTime - callbackTime;
      // console.log('total-', end, 'profiler-', profilerTime, 'callbacktime-',
      // callbackTime, 'start-', start, 'unaccounted', unaccounted);
      return returnVal;
    }

    return callback();
  },
  enable: function enable() {
    enabled = true;
    hookUpPrototypes();
  },


  output: Profiler.output,

  registerObject: profileObjectFunctions,
  registerFN: profileFunction,
  registerClass: profileObjectFunctions
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _creepBar = __webpack_require__(94);

Object.defineProperty(exports, 'creepBar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_creepBar).default;
  }
});

var _room = __webpack_require__(96);

Object.defineProperty(exports, 'room', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_room).default;
  }
});

var _role = __webpack_require__(95);

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(105);

Object.defineProperty(exports, 'root', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_root).default;
  }
});

var _memory = __webpack_require__(103);

Object.defineProperty(exports, 'memory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_memory).default;
  }
});

var _global = __webpack_require__(97);

Object.defineProperty(exports, 'global', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_global).default;
  }
});

var _structure = __webpack_require__(106);

Object.defineProperty(exports, 'structure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_structure).default;
  }
});

var _role = __webpack_require__(104);

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(120);

var _role2 = _interopRequireDefault(_role);

var _room = __webpack_require__(121);

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var setting = {};
	_.forEach(_room2.default, function (room) {
		setting[room[0]] = {
			role: (0, _role2.default)(room)
		};
	});
	Memory.setting = setting;
	return setting;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flags = __webpack_require__(9);

Object.defineProperty(exports, 'flags', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_flags).default;
  }
});

var _log = __webpack_require__(126);

Object.defineProperty(exports, 'log', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_log).default;
  }
});

var _trigger = __webpack_require__(127);

Object.defineProperty(exports, 'trigger', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_trigger).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(36);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(7),
    toLength = __webpack_require__(55);

/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */
function baseFill(array, value, start, end) {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end === undefined || end > length ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}

module.exports = baseFill;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayMap = __webpack_require__(5),
    baseIteratee = __webpack_require__(22),
    baseMap = __webpack_require__(23),
    baseSortBy = __webpack_require__(27),
    baseUnary = __webpack_require__(30),
    compareMultiple = __webpack_require__(32),
    identity = __webpack_require__(4);

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
}

module.exports = baseSum;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(52);

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compareAscending = __webpack_require__(31);

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(16),
    isArguments = __webpack_require__(44),
    isArray = __webpack_require__(45);

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(17);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(33);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSlice = __webpack_require__(26),
    isIterateeCall = __webpack_require__(3),
    toInteger = __webpack_require__(7);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, index += size);
  }
  return result;
}

module.exports = chunk;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = compact;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFill = __webpack_require__(20),
    isIterateeCall = __webpack_require__(3);

/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill(array, value, start, end);
}

module.exports = fill;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFlatten = __webpack_require__(2);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFlatten = __webpack_require__(2);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}

module.exports = flattenDeep;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(48),
    isLength = __webpack_require__(49);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayLike = __webpack_require__(46),
    isObjectLike = __webpack_require__(51);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(21),
    isObject = __webpack_require__(50);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFlatten = __webpack_require__(2),
    baseOrderBy = __webpack_require__(24),
    baseRest = __webpack_require__(6),
    isIterateeCall = __webpack_require__(3);

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSum = __webpack_require__(28),
    identity = __webpack_require__(4);

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
    return array && array.length ? baseSum(array, identity) : 0;
}

module.exports = sum;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayFilter = __webpack_require__(18),
    arrayMap = __webpack_require__(5),
    baseProperty = __webpack_require__(25),
    baseTimes = __webpack_require__(29),
    isArrayLikeObject = __webpack_require__(47);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter(array, function (group) {
    if (isArrayLikeObject(group)) {
      length = nativeMax(group.length, length);
      return true;
    }
  });
  return baseTimes(length, function (index) {
    return arrayMap(array, baseProperty(index));
  });
}

module.exports = unzip;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseRest = __webpack_require__(6),
    unzip = __webpack_require__(56);

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 */
var zip = baseRest(unzip);

module.exports = zip;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, target, fc) {
	var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "#fff";

	switch (fc) {
		case OK:
			if (text) creep.say(text);
			return true;
			break;
		case ERR_NOT_OWNER:
			creep.say(text + "OWNER");
			break;
		case ERR_NO_PATH:
			creep.say(text + "PATH");
			if (creep.memory.role.match('iner')) {
				(0, _util.targetChanger)(creep, creep.room.memory.sources[0], 'harvest');
			} else {
				(0, _util.targetChanger)(creep, creep.room.memory.structures.container[0], 'withdraw');
			}
			break;
		case ERR_NAME_EXISTS:
			creep.say(text + "NAME");
			break;
		case ERR_BUSY:
			creep.say(text + "BUSY");
			break;
		case ERR_NOT_FOUND:
			creep.say(_util.emoji.move);
			(0, _action.moveTo)(creep, target, color, false);
			return true;
			break;
		case ERR_NOT_ENOUGH_ENERGY:
			creep.say(text + "ENERGY");
			if (creep.memory.role.match('iner')) {
				(0, _action.moveTo)(creep, target, color);
			} else {
				(0, _util.targetChanger)(creep, creep.room.memory.structures.container[0], 'withdraw');
			}
			return true;
			break;
		case ERR_NOT_ENOUGH_RESOURCES:
			creep.say(text + "RESOURCES");
			break;
		case ERR_INVALID_TARGET:
			if (creep.memory.role.match('iner')) (0, _action.moveTo)(creep, target, color);
			creep.say(text + _util.emoji.move);
			break;
		case ERR_FULL:
			creep.say(text + "FULL");
			break;
		case ERR_NOT_IN_RANGE:
			(0, _action.moveTo)(creep, target, color);
			return true;
			break;
		case ERR_INVALID_ARGS:
			creep.say(text + "ARGS");
			break;
		case ERR_TIRED:
			creep.say(text + "TIRED");
			break;
		case ERR_NO_BODYPART:
			creep.say(text + "BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS:
			creep.say(text + "EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH:
			creep.say(text + "RCL");
			break;
		case ERR_GCL_NOT_ENOUGH:
			creep.say(text + "GCL");
			break;
	}
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = __webpack_require__(0);

var color = function color(_color, content) {
	return "<font color=" + _color + ">" + content + "</font>";
};
color.yellow = function (content) {
	"use strict";

	return "<font color=" + _.colorType.yellow + ">" + content + "</font>";
};
color.blue = function (content) {
	"use strict";

	return "<font color=" + _.colorType.blue + ">" + content + "</font>";
};
color.red = function (content) {
	"use strict";

	return "<font color=" + _.colorType.red + ">" + content + "</font>";
};
color.purple = function (content) {
	"use strict";

	return "<font color=" + _.colorType.purple + ">" + content + "</font>";
};
color.grey = function (content) {
	"use strict";

	return "<font color=" + _.colorType.grey + ">" + content + "</font>";
};
color.orange = function (content) {
	"use strict";

	return "<font color=" + _.colorType.orange + ">" + content + "</font>";
};
color.green = function (content) {
	"use strict";

	return "<font color=" + _.colorType.green + ">" + content + "</font>";
};
exports.default = color;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	yellow: '#E6DB74',
	blue: '#66D9EF',
	red: '#F92672',
	purple: '#AE81FF',
	grey: '#75715E',
	orange: '#FD971F',
	green: '#A6E22E'
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (x, y, type) {
	if (x && y && type) {
		console.log('[Build] ' + type + ' in x:' + x + ' y:' + y, Game.spawns['Spawn1'].room.createConstructionSite(x, y, type));
	} else {
		console.log('You can build: ' + ['spawn', 'extension', 'road', 'constructedWall', 'rampart', 'keeperLair', 'portal', 'controller', 'link', 'storage', 'tower', 'observer', 'powerBank', 'powerSpawn', 'extractor', 'lab', 'terminal', 'container', 'nuker'].join('|'));
	}
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = __webpack_require__(0);

exports.default = function (e, name, creep, target) {
	for (var _len = arguments.length, other = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
		other[_key - 4] = arguments[_key];
	}

	var error = {
		header: ['Error ' + name + ' #' + Game.time],
		body: [[e], ['Creep: ' + creep + '<br />Pos:' + JSON.stringify(creep.pos, null, 2)], ['Target: ' + target + '<br />Json:' + JSON.stringify(target, null, 2)]]
	};
	error.body.push([].concat(other));
	console.log((0, _.table)(error));
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	attack: unescape("%uD83D%uDD2B"),
	harvest: unescape("%u26CF"),
	error: unescape("%u274C"),
	move: unescape("%uD83D%uDEB6"),
	transfer: unescape("%uD83D%uDD01"),
	build: unescape("%uD83D%uDEA7"),
	repair: unescape("%uD83D%uDD27"),
	claim: unescape("%uD83D%uDEA9"),
	heal: unescape("%uD83D%uDC9A"),
	pickup: unescape("%uD83D%uDC4B"),
	withdraw: unescape("%uD83D%uDCB0"),
	upgrade: unescape("%uD83D%uDE80"),
	recycle: unescape("%uD83D%uDD04"),
	dismantle: unescape("%u26A0%uFE0F"),
	target: unescape("%uD83D%uDC41%uFE0F"),
	targetChange: unescape("%u267B%uFE0F%uD83D%uDC41%uFE0F")
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (flag) {
	var name = flag.name.split(' ');
	return {
		command: name[0].replace('/', ''),
		commandContent: name[1],
		pos: flag.pos
	};
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var friends = ["Ruo", "FanHua"];

exports.default = function (owner) {
	if (!owner || owner == 'Invader') return false;
	return friends.toString().match(owner) ? true : false;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep) {
	if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
	if (creep.memory.full && creep.carry.energy == 0) creep.memory.full = false;
	return creep.memory.full;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (content) {
	var tableHeader = "",
	    tableBody = "",
	    contentHeadr = "",
	    contentBody = "";
	if (_.isArray(content)) {
		contentBody = content;
	} else {
		contentHeadr = content.header;
		contentBody = content.body;
		contentHeadr.forEach(function (col) {
			return tableHeader += "<th style=\"width:88px;border:1px solid #444;padding:4px 8px;word-break:break-all; word-wrap:break-word;\">" + col + "</th>";
		});
		tableHeader = "<tr style=\"border:1px solid #444;background: #333;color:#888\" >" + tableHeader + "</tr>";
	}
	contentBody.forEach(function (row) {
		var tableCol = "";
		row.forEach(function (col) {
			return tableCol += "<td style=\"width:72px;border:1px solid #444;padding:4px 8px;word-break:break-all; word-wrap:break-word;\">" + col + "</td>";
		});
		tableBody += "<tr style=\"border:1px solid #444\" >" + tableCol + "</tr>";
	});
	return "<table style=\"border:1px solid #444;max-width: 100%;word-break:break-all; word-wrap:break-word;\">" + tableHeader + tableBody + "</table>";
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

	try {
		target = (0, _util.targetFormat)(target);
		if (!target.pos) return false;
		if (creep.memory.target[type].id == target.id) return true;
		creep.memory.target[type] = {
			id: target.id,
			pos: target.pos,
			time: Game.time
		};
		creep.say(_util.emoji.targetChange);
	} catch (e) {
		(0, _util.targetMaker)(creep, target, type);
	}
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (targetRaw) {
	if (_.isArray(targetRaw)) targetRaw = _.first(targetRaw);
	try {
		var target = Game.getObjectById(targetRaw.id);
		return target ? target : false;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

	try {
		target = (0, _util.targetFormat)(target);
		if (!target.pos) return false;
		if (!creep.memory.target) creep.memory.target = {};
		if (!creep.memory.target[type] || !creep.memory.target[type].id) {
			creep.memory.target[type] = {
				id: target.id,
				pos: target.pos,
				time: Game.time
			};
			creep.say(_util.emoji.target);
		}
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (targetRaw) {
	try {
		return new RoomPosition(targetRaw.pos.x, targetRaw.pos.y, targetRaw.pos.roomName);
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tick) {
    if (!Memory.timer) Memory.timer = {};
    if (Memory.timer[tick] && Game.time - Memory.timer[tick] < tick) return false;
    Memory.timer[tick] = Game.time;
    return true;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'attack';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.attack, _util.colorType.red)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'build';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.build, _util.colorType.blue)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'reserveController';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, target, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.claim, _util.colorType.orange)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'dismantle';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.dismantle, _util.colorType.red)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'harvest';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.harvest, _util.colorType.yellow)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'heal';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.heal, _util.colorType.green)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';
	var noPathFinding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	var actionName = 'moveTo';
	if (creep.fatigue > 0) return false;
	try {
		if (_.isArray(target)) target = _.first(target);
		try {
			if (target.pos.roomName != creep.pos.roomName) {
				target = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName);
				noPathFinding = false;
			} else {
				target = (0, _util.targetFormat)(target);
			}
		} catch (e) {
			return false;
		}
		(0, _util.targetChanger)(creep, target, actionName);
		var opt = {
			reusePath: 15,
			serializeMemory: true,
			noPathFinding: noPathFinding,
			visualizePathStyle: {
				stroke: color,
				lineStyle: 'dotted',
				opacity: 0.5,
				strokeWidth: 0.1
			}
		};
		if ((0, _util.action)(creep, target, creep[actionName](target, opt))) {
			visual(target, creep);
			return true;
		}
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

function visual(target, creep, color) {
	try {
		target.room.visual.circle(target.pos, { fill: 'transparent', radius: 0.55, stroke: color });
		if (target.pos.roomName == creep.pos.roomName) {
			target.room.visual.line(creep.pos, target.pos, {
				color: color,
				width: 0.1,
				opacity: 0.05
			});
		}
	} catch (e) {}
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'pickup';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.pickup, _util.colorType.yellow)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'repair';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.repair, _util.colorType.blue)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RESOURCE_ENERGY;

	if (!check) return;
	var actionName = 'transfer';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target, type), _util.emoji.transfer, _util.colorType.purple)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check) return;
	var actionName = 'upgradeController';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target), _util.emoji.upgrade, _util.colorType.orange)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _ = __webpack_require__(1);

exports.default = function (creep, targetRaw) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RESOURCE_ENERGY;

	if (!check) return;
	var actionName = 'withdraw';
	try {
		var target = (0, _util.targetFormat)(targetRaw);
		if (!target && (0, _.moveTo)(creep, targetRaw)) return true;
		(0, _util.targetChanger)(creep, targetRaw, actionName);
		if ((0, _util.action)(creep, target, creep[actionName](target, type), _util.emoji.withdraw, _util.colorType.purple)) return true;
	} catch (e) {
		(0, _util.debug)(e, actionName, creep, targetRaw);
		return false;
	}
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, array, opt) {
	try {
		if (!array.length || array[0] == null) return false;
		var found = creep.pos.findClosestByRange(array);
		if (opt) found = _.filter(found, opt);
		return found;
	} catch (e) {
		(0, _util.debug)(e, 'findClosestByRange', creep, array, opt);
		return false;
	}
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _2 = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, array) {
	var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var opt = arguments[3];

	try {
		if (!array.length || array[0] == null) return false;
		var found = (0, _2.findInRange)(creep, array, range);
		if (opt) found = _.filter(found, opt);
		found = (0, _2.findClosestByRange)(creep, found);
		return found;
	} catch (e) {
		(0, _util.debug)(e, 'findClosestInRange', creep, array, opt);
		return false;
	}
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, array) {
	var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var opt = arguments[3];

	try {
		var found = creep.pos.findInRange(array, range);
		if (opt) found = _.filter(found, opt);
		return found;
	} catch (e) {
		(0, _util.debug)(e, 'findInRange', creep, array, opt);
		return false;
	}
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LOOK_STRUCTURES;
	var opt = arguments[2];

	try {
		var found = creep.pos.lookFor(type);
		if (opt) {
			found.filter(function (opt) {
				opt.structureType == opt;
			});
		}
		return found && found.length > 0 ? found[0] : false;
	} catch (e) {
		(0, _util.debug)(e, 'lookFor', creep, type, opt);
		return false;
	}
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {

	var needBuild = room.memory.structures ? room.memory.structures.needBuild : [];
	var builderNumber = needBuild.length > 0 ? needBuild.length : 1;
	var noEnemy = Memory.trigger.noEnemy;

	return [{
		role: "claim",
		body: { claim: 2, move: 1 },
		timeout: 100,
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 7
	}, {
		role: "farMiner",
		body: { work: 8, carry: 1, move: 4 },
		timeout: 100,
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 1
	}, {
		role: "farMinerSec",
		body: { work: 8, carry: 1, move: 4 },
		timeout: 100,
		number: noEnemy['W82S67'].safe ? 2 : 0,
		priority: 1
	}, {
		role: 'farHarvester',
		body: { carry: 8, move: 4 },
		number: noEnemy['W81S66'].safe ? 3 : 0,
		priority: 5
	}, {
		role: 'farHarvesterSec',
		body: { carry: 8, move: 4 },
		number: noEnemy['W82S67'].safe ? 5 : 0,
		priority: 5
	}, {
		role: 'farBuilder',
		body: { carry: 6, work: 2, move: 4 },
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 5
	}, {
		role: 'farBuilderSec',
		body: { carry: 6, work: 2, move: 4 },
		number: noEnemy['W82S67'].safe ? 2 : 0,
		priority: 5
	}, {
		role: 'harvester',
		body: { carry: 2, move: 1 },
		number: 0,
		priority: 2
	}, {
		role: 'linker',
		body: { carry: 1, move: 1 },
		number: 1,
		priority: 2
	}, {
		role: 'upgrader',
		body: { carry: 2, work: 4, move: 2 },
		number: builderNumber > 1 ? 1 : 3,
		priority: 3
	}, {
		role: 'farUpgrader',
		body: { carry: 6, work: 2, move: 4 },
		number: noEnemy['W82S67'].safe ? 3 : 0,
		priority: 3
	}, {
		role: 'builder',
		body: { work: 2, carry: 6, move: 4 },
		number: builderNumber > 2 ? 2 : builderNumber,
		priority: 6
	}, {
		role: "miner",
		body: { work: 8, move: 4, carry: 1 },
		number: 2,
		priority: 1
	}, {
		role: 'cleaner',
		body: { carry: 6, move: 3 },
		number: 2,
		priority: 0
	}, {
		role: 'attacker',
		body: { tough: 2, attack: 2, move: 2 },
		number: 0,
		priority: 0
	}, {
		role: 'traveller',
		body: { move: 1 },
		number: 0,
		priority: 0
	}];
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (command, flag) {
	var target = void 0;
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target;
	}
	// creep
	var enemyCreep = flag.pos.findInRange(flag.room.memory.creeps.enemy, 6);
	if (enemyCreep.length > 0) {
		target = enemyCreep[0];
	}
	// structures
	var enemyStructures = flag.pos.findInRange(flag.room.memory.structures.enemy, 6);
	if (enemyStructures.length > 0) {
		target = enemyStructures[0];
	}
	return target;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (command, flag) {
	var target = void 0;
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target;
	}
	// creep
	var structures = flag.pos.findInRange(FIND_STRUCTURES, 0);
	if (structures.length > 0) {
		target = structures[0];
	}
	return target;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (command, flag) {
	var target = void 0;
	// nocommand id
	if (command) {
		target = Game.getObjectById(command);
		target = target;
	}
	// pos
	target = flag;

	return target;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (roomName) {
	var room = Game.rooms[roomName];
	room.find(FIND_MY_CREEPS).forEach(function (creep) {
		"use strict";

		room.visual.rect(creep.pos.x - 1, creep.pos.y - 1, 1, 0.2, { fill: '#000' });

		room.visual.rect(creep.pos.x - 1, creep.pos.y - 1, 1 / 1500 * creep.ticksToLive, 0.2, {
			fill: '#66D9EF',
			opacity: 1
		});
	});
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowMargin = 0.3,
    guiCreepWidth = 3.5,
    guiCreepHeight = 0.2,
    guiCreepRowMargin = guiCreepHeight + rowMargin + 1;

exports.default = function (roomName) {
	var room = Game.rooms[roomName];
	var flag = room.memory.flags.gui.role;
	if (!flag) return;
	var bgPadding = 0.5,
	    guiCreepX = flag.x,
	    guiCreepY = flag.y;

	room.visual.rect(guiCreepX - bgPadding, guiCreepY - 2 * bgPadding, guiCreepWidth + 2 * bgPadding, (0, _config2.default)().role.length * guiCreepRowMargin + bgPadding, {
		fill: 'rgba(0,0,0,.5)',
		opacity: 0.5,
		stroke: '#000',
		strokeWidth: 0.05
	});

	(0, _config2.default)().role.forEach(function (eachRole) {
		guiCreep(room, guiCreepX, guiCreepY, eachRole.role, eachRole.number);
		guiCreepY += guiCreepRowMargin;
	});
};

function guiCreep(room, x, y, name, number) {
	var creeps = Memory.global.creeps,
	    nowNumber = creeps[name] ? creeps[name].length : 0;
	var color = void 0,
	    colorSwitch = nowNumber - number;
	if (colorSwitch > 0) color = _util.colorType.green;
	if (colorSwitch == 0) color = '#fff';
	if (colorSwitch < 0) color = _util.colorType.red;
	var LineWidth = colorSwitch > 0 ? number : nowNumber;
	room.visual.rect(x, y + rowMargin, guiCreepWidth, guiCreepHeight, { fill: color, opacity: 0.2 }).rect(x, y + rowMargin, guiCreepWidth * LineWidth / number, guiCreepHeight, { fill: color, opacity: 0.7 }).text(name, x, y, { font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1 }).text(nowNumber + '/' + number, x + guiCreepWidth, y, {
		font: 0.4,
		align: 'right',
		stroke: 'rgba(0,0,0,.7)',
		strokeWidth: 0.1
	});
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var rowMargin = 0.3,
    guiWidth = 4.8,
    guiHeight = 0.7,
    guiRowMargin = guiHeight + rowMargin + 1;

exports.default = function (roomName) {
	var room = Game.rooms[roomName];

	var flag = room.memory.flags.gui.room;
	if (!flag) return;

	var gcl = Game.gcl,
	    rcl = room.controller,
	    storage = room.memory.structures.storage,
	    extension = room.memory.structures.extension,
	    spawn = room.memory.structures.spawn.energy;

	var bgPadding = 0.5,
	    guiX = flag.x,
	    guiY = flag.y;

	var extensionFull = 0;
	extension.forEach(function (ex) {
		if (ex.energy == ex.energyCapacity) extensionFull++;
	});

	room.visual.rect(guiX - bgPadding, guiY - 2 * bgPadding, guiWidth + 2 * bgPadding, 6 * guiRowMargin + bgPadding, {
		fill: 'rgba(0,0,0,.5)',
		opacity: 0.5,
		stroke: '#000',
		strokeWidth: 0.05
	});

	var guiContent = [[_util.colorType.blue, ['GCL', 'Lvl ' + gcl.level, gcl.progress, Math.floor(gcl.progressTotal)]], [_util.colorType.orange, ['RCL', 'Lvl ' + rcl.level, rcl.progress, Math.floor(rcl.progressTotal)]], [_util.colorType.purple, ['CPU', '', Math.round(Game.cpu.getUsed()), Game.cpu.limit]], [_util.colorType.yellow, ['Storage', '', storage.store.energy, storage.storeCapacity]], [_util.colorType.yellow, ['Extension', '', extensionFull, extension.length]], [_util.colorType.yellow, ['Spawn', '', spawn + extensionFull * 50, 300 + extension.length * 50]]];

	_.forEach(guiContent, function (content, index) {
		gui(room, guiX, guiY + guiRowMargin * index, content[0], content[1]);
	});
};

function gui(room, x, y, color, content) {
	var colorSwitch = content[2] - content[3];
	if (colorSwitch > 0) color = _util.colorType.red;
	var LineWidth = colorSwitch > 0 ? content[3] : content[2];
	room.visual.rect(x, y + rowMargin, guiWidth, guiHeight, { fill: '#fff', opacity: 0.2 }).rect(x, y + rowMargin, guiWidth * LineWidth / content[3], guiHeight, { fill: color, opacity: 0.7 }).text(content[0], x, y, { font: 0.5, align: 'left', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1 }).text(content[1], x + guiWidth, y, { font: 0.4, align: 'right', stroke: 'rgba(0,0,0,.7)', strokeWidth: 0.1 }).text(content[2] + ' / ' + content[3], x + .2, y + 0.8, {
		font: 0.4,
		align: 'left',
		stroke: 'rgba(0,0,0,.7)',
		strokeWidth: 0.1
	});
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (roomArray) {
	var creepArray = {};
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (!creepArray[creep.memory.role]) creepArray[creep.memory.role] = [];
		creepArray[creep.memory.role].push(Game.creeps[name]);
	}

	var sources = [];
	roomArray.forEach(function (room) {
		room = Game.rooms[room];
		if (room) sources = sources.concat(room.memory.sources);
	});

	Memory.global = {
		creeps: creepArray,
		sources: sources
	};
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (room, config) {
	var creeps = room.find(FIND_CREEPS),
	    creepsMyRaw = _.filter(creeps, function (creep) {
		return creep.my;
	}),
	    creepsOther = _.filter(creeps, function (creep) {
		return !creep.my;
	}),
	    creepsMy = creepRole(creepsMyRaw, config.role);

	return {
		my: creepsMy,
		friend: _.filter(creepsOther, function (creep) {
			return (0, _util.isFriend)(creep.owner.username);
		}),
		enemy: _.filter(creepsOther, function (creep) {
			return !(0, _util.isFriend)(creep.owner.username);
		})
	};
};

function creepRole(creepsMyRaw, configRole) {
	var creepsMy = {
		all: creepsMyRaw
	};
	configRole.forEach(function (role) {
		creepsMy[role.role] = _.filter(creepsMyRaw, function (creep) {
			return creep.name.split('#')[0] == role.role;
		});
	});
	return creepsMy;
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {
	var resources = room.find(FIND_DROPPED_RESOURCES);
	return {
		resources: resources,
		energy: _.filter(resources, function (resource) {
			return resource.resourceType == RESOURCE_ENERGY;
		})
	};
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _flags = __webpack_require__(9);

var flags = _interopRequireWildcard(_flags);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (room) {
	var flagsRaw = room.find(FIND_FLAGS).sort(function (a, b) {
		return a.secondaryColor - b.secondaryColor;
	}).sort(function (a, b) {
		return a.color - b.color;
	});

	var flagsMemory = {
		attack: [],
		moveTo: [],
		dismantle: [],
		gui: {}
	};
	flagsRaw.forEach(function (flagRaw) {

		var flag = (0, _util.flagCommand)(flagRaw),
		    command = flag.command,
		    commandContent = flag.commandContent;
		switch (command) {
			case "store":
				flagsMemory.store = flagRaw.pos.lookFor(LOOK_STRUCTURES);
				break;
			case "gui":
				flagsMemory.gui[commandContent] = flagRaw.pos;
				break;
			case 'attack' || 'a':
				flagsMemory.attack.push(flags.attack(commandContent, flagRaw));
				break;
			case 'move' || 'moveTo' || 'moveto' || 'm':
				flagsMemory.moveTo.push(flags.moveTo(commandContent, flagRaw));
				break;
			case 'dis' || 'dismantle':
				flagsMemory.dismantle.push(flags.dismantle(commandContent, flagRaw));
				break;
		}
	});
	return flagsMemory;
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (room) {
	var rawSources = room.find(FIND_SOURCES);
	var sources = [];
	rawSources.forEach(function (source) {
		return sources.push({
			source: source,
			miner: source.pos.findInRange(source.room.memory.creeps.my.all, 4).filter(function (creep) {
				return creep.name.match('iner');
			})
		});
	});
	if (sources.length > 0) {
		sources.sort(function (a, b) {
			return b.source.energy - a.source.energy;
		}).sort(function (a, b) {
			return a.miner.length - b.miner.length;
		});
	}
	if (sources.length > 1 && sources[0].miner.length == 0 && sources[sources.length - 1].miner.length > 1) {
		var targetSource = sources[sources.length - 1],
		    targetCreep = Game.getObjectById(targetSource.miner.sort(function (a, b) {
			return b.ticksToLive - a.ticksToLive;
		})[0].id);
		(0, _util.targetChanger)(targetCreep, sources[0].source, 'harvest');
	}
	return sources;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room, config) {

	var structures = room.find(FIND_STRUCTURES),
	    structuresStorage = room.storage,
	    structuresMy = _.filter(structures, function (structure) {
		return structure.my;
	}),
	    structuresOther = _.filter(structures, function (structure) {
		return !structure.my;
	}),
	    structuresContainer = _.filter(structuresOther, function (structure) {
		return structure.structureType == STRUCTURE_CONTAINER;
	});

	var structuresDocker = _.compact(structuresContainer.concat([structuresStorage]));

	var needFix = _.filter(structures, function (structure) {
		return (structure.my || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL) && structure.hits / structure.hitsMax < config.repair.percent && structure.hits < config.repair.maxHits;
	});

	if (room.memory.flags.dismantle && room.memory.flags.dismantle.length > 0 && room.memory.flags.dismantle[0] != null) {
		needFix = _.filter(needFix, function (structure) {
			return structure.id != room.memory.flags.dismantle[0].id;
		});
	}

	return {
		enemy: _.filter(structuresOther, function (structure) {
			return structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_WALL;
		}),
		terminal: room.terminal,
		controller: room.controller,
		storage: structuresStorage,
		link: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_LINK;
		}),
		tower: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_TOWER;
		}),
		spawn: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_SPAWN;
		})[0],
		extension: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_EXTENSION;
		}),
		container: structuresContainer ? structuresContainer.sort(function (a, b) {
			return b.store.energy - a.store.energy;
		}) : [],
		canWithdraw: structuresDocker.length > 0 ? _.filter(structuresDocker, function (structure) {
			return structure.store && structure.store.energy > 0;
		}) : [],
		canFill: structuresDocker.length > 0 ? _.filter(structuresDocker, function (structure) {
			return structure.store && structure.store.energy < structure.storeCapacity;
		}) : [],
		needFill: _.filter(structuresMy, function (structure) {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity && structure.energy < 300;
		}),
		needFix: needFix.sort(function (a, b) {
			return a.hits - b.hits;
		}),
		needBuild: room.find(FIND_MY_CONSTRUCTION_SITES)
	};
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _creeps = __webpack_require__(98);

var _creeps2 = _interopRequireDefault(_creeps);

var _structures = __webpack_require__(102);

var _structures2 = _interopRequireDefault(_structures);

var _sources = __webpack_require__(101);

var _sources2 = _interopRequireDefault(_sources);

var _dropped = __webpack_require__(99);

var _dropped2 = _interopRequireDefault(_dropped);

var _flags = __webpack_require__(100);

var _flags2 = _interopRequireDefault(_flags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (roomArrary) {
	_.each(roomArrary, function (room) {
		room = Game.rooms[room];
		if (!room) return;
		var config = (0, _config2.default)(room);
		var creeps = (0, _creeps2.default)(room, config);
		var memory = {
			energyAvailable: room.energyAvailable,
			config: config,
			creeps: creeps,
			structures: (0, _structures2.default)(room, config),
			sources: (0, _sources2.default)(room),
			dropped: (0, _dropped2.default)(room),
			flags: (0, _flags2.default)(room)
		};

		room.memory = memory;
		// Memory.game  = Game;
	});
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(119);

var role = _interopRequireWildcard(_role);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArrary) {
	var newRoom = {
		pos: new RoomPosition(25, 47, roomArrary[1]),
		memory: Game.rooms[roomArrary[1]] ? Game.rooms[roomArrary[1]].memory : {}
	};

	roomArrary.forEach(function (room) {
		room = Game.rooms[room];
		if (!room) return;
		for (var name in Game.creeps) {
			var creep = Game.creeps[name];
			switch (creep.memory.role) {
				case 'cleaner':
					role.cleaner(creep);
					break;
				case 'linker':
					role.linker(creep);
					break;
				case 'harvester':
					role.harvester(creep);
					break;
				case 'miner':
					role.miner(creep);
					break;
				case 'upgrader':
					role.upgrader(creep);
					break;
				case 'builder':
					role.builder(creep);
					break;
				case 'farBuilder':
					role.farBuilder(creep, roomArrary[1]);
					break;
				case 'farHarvester':
					role.farHarvester(creep, roomArrary[1]);
					break;
				case 'farMiner':
					role.farMiner(creep, roomArrary[1]);
					break;
				case 'claim':
					role.claim(creep, roomArrary[1]);
					break;
				case 'farMinerSec':
					role.farMiner(creep, roomArrary[2]);
					break;
				case 'farHarvesterSec':
					role.farHarvester(creep, roomArrary[2]);
					break;
				case 'farBuilderSec':
					role.farBuilder(creep, roomArrary[2]);
					break;
				case 'farUpgrader':
					role.farUpgrader(creep, roomArrary[2]);
					break;
				case 'attacker':
					role.attacker(creep, roomArrary[1]);
					break;
			}
		}
	});
};

function newRoomMaker(roomName) {
	return {
		pos: new RoomPosition(25, 47, roomName),
		memory: Memory.rooms[roomName] ? Memory.rooms[roomName] : {}
	};
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
		} else {
			if (!Game.creeps[name].memory) Game.creeps[name].memory = { role: name.split('#')[0] };
			if (!Game.creeps[name].memory.id) Game.creeps[name].memory.id = Game.creeps[name].id;
		}
	}
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _structure = __webpack_require__(125);

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArray) {
	roomArray.forEach(function (roomName) {
		var room = Game.rooms[roomName];
		if (room && room.memory) {
			var structures = room.memory.structures;
			var config = room.memory.config;
			if (roomName == "W81S67" && structures.spawn) structure.spawn(structures.spawn, config.role);
			if (structures.link) structures.link.forEach(function (link) {
				return structure.link(link);
			});
			if (structures.tower) structures.tower.forEach(function (tower) {
				return structure.tower(tower);
			});
		}
	});
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

exports.default = function (creep, roomName) {
	if (creep.room.name != roomName) {
		(0, _action.moveTo)(creep, Memory.rooms[roomName].creeps.enemy[0]);
	} else {
		(0, _action.attack)(creep, Memory.rooms[roomName].creeps.enemy[0]);
	}
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	// state
	var isFull = (0, _util.fullCheck)(creep);
	// task
	if (isFull) {
		if ((0, _action.build)(creep, (0, _action.findClosestByRange)(creep, creep.room.memory.structures.needBuild))) return;
		if ((0, _action.repair)(creep, (0, _action.findClosestByRange)(creep, creep.room.memory.structures.needFix))) return;
		if ((0, _action.upgradeController)(creep, creep.room.controller)) return;
	} else {
		if ((0, _action.dismantle)(creep, creep.room.memory.flags.dismantle[0])) return;
		if ((0, _action.pickup)(creep, (0, _action.findClosestInRange)(creep, creep.room.memory.dropped.energy, 2)[0])) return;
		if ((0, _action.withdraw)(creep, creep.room.storage)) return;
	}
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, roomName) {
	// target
	(0, _util.targetMaker)(creep, Memory.rooms[roomName].structures.controller, 'claim');
	// task
	if ((0, _action.claimController)(creep, creep.memory.target.claim)) return;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	// state
	var isFull = (0, _util.fullCheck)(creep);
	var needFill = creep.room.memory.structures.needFill;
	// task
	if (!isFull) {
		var linkMain = Game.getObjectById(creep.room.memory.config.linkMain);
		if ((0, _action.withdraw)(creep, linkMain, linkMain.energy > 0)) return;
		if ((0, _action.pickup)(creep, (0, _action.findClosestByRange)(creep, creep.room.memory.dropped.energy, !needFill || needFill.length == 0))) return;
		if ((0, _action.withdraw)(creep, creep.room.storage)) return;
	} else {
		if ((0, _action.transfer)(creep, creep.pos.findClosestByRange(needFill))) return;
		var tower = creep.room.memory.structures.tower.sort(function (a, b) {
			return a.energy - b.energy;
		})[0];
		if ((0, _action.transfer)(creep, tower, tower.energy < tower.energyCapacity)) return;
		if ((0, _action.transfer)(creep, creep.room.storage)) return;
	}
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, roomName) {
	// state
	var isFull = (0, _util.fullCheck)(creep);
	var storage = Game.getObjectById('58d07b35bfeec6256575be5d');
	// target
	(0, _util.targetMaker)(creep, Memory.rooms[roomName].structures.container[0], 'withdraw');
	// task
	if (!isFull) {
		if ((0, _action.pickup)(creep, (0, _action.findInRange)(creep, creep.room.memory.dropped.energy, 3)[0])) return;
		var store = (0, _util.targetFormat)(creep.room.memory.flags.store);
		if (store && (0, _action.withdraw)(creep, store, store.store.energy > 0)) return;
		if ((0, _action.withdraw)(creep, creep.memory.target.withdraw)) return;
	} else {
		if (creep.pos.roomName == creep.memory.target.withdraw.pos.roomName) {
			var needBuild = creep.room.memory.structures.needBuild,
			    needFix = creep.room.memory.structures.needFix;
			if ((0, _action.build)(creep, (0, _action.findClosestByRange)(creep, needBuild))) return;
			if ((0, _action.repair)(creep, (0, _action.findClosestByRange)(creep, needFix))) return;
		}
		(0, _util.targetChanger)(creep, Memory.rooms[roomName].structures.container[0], 'withdraw');
		if ((0, _action.transfer)(creep, storage)) return;
	}
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, roomName) {
	// state
	var isFull = (0, _util.fullCheck)(creep);
	// target
	var targetWithdraw = _.filter(Memory.rooms[roomName].structures.container, function (container) {
		return container.id != '58da68e6b6335f86219c4717';
	})[0];
	(0, _util.targetMaker)(creep, targetWithdraw, 'withdraw');
	// run
	if (!isFull) {
		if ((0, _action.pickup)(creep, (0, _action.findClosestInRange)(creep, creep.room.memory.dropped.energy, 4))) return;
		if ((0, _action.withdraw)(creep, targetWithdraw)) return;
	} else {
		if (creep.pos.roomName == creep.memory.target.withdraw.pos.roomName) {
			var needFill = creep.room.memory.structures.needFill;
			if ((0, _action.transfer)(creep, creep.pos.findClosestByRange(needFill))) return;
			var store = (0, _util.targetFormat)(creep.room.memory.flags.store);
			if (store && (0, _action.transfer)(creep, store, store.store.energy < store.storeCapacity)) return;
			var spawn = Memory.rooms[roomName].structures.spawn;
			if (spawn && (0, _action.transfer)(creep, spawn, spawn.energy < spawn.energyCapacity)) return;
		} else {
			(0, _util.targetChanger)(creep, targetWithdraw, 'withdraw');
		}
		if ((0, _action.transfer)(creep, Game.getObjectById('58d07b35bfeec6256575be5d'))) return;
	}
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, roomName) {
	// state
	var ifFull = (0, _util.fullCheck)(creep);
	// target
	(0, _util.targetMaker)(creep, Memory.rooms[roomName].sources[0].source, 'harvest');
	// task
	if (ifFull) {
		try {
			if ((0, _action.build)(creep, (0, _action.findInRange)(creep, creep.room.memory.structures.needBuild, 3)[0])) return;
			var container = (0, _action.findClosestInRange)(Game.getObjectById(creep.memory.target.harvest.id), creep.room.memory.structures.container, 2);
			if (container && !creep.pos.isEqualTo(container.pos) && (0, _action.moveTo)(creep, container)) return;
			// const pos = creep.memory.target.harvest.pos
			// if (!container && creep.isNearTo(pos.x, pos.y)) {
			// 	createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER)
			// }
			if ((0, _action.repair)(creep, container, container.hits < container.hitsMax)) return;
		} catch (e) {}
	} else {
		if ((0, _action.pickup)(creep, (0, _action.findInRange)(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	}
	if ((0, _action.harvest)(creep, creep.memory.target.harvest)) return;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, roomName) {
	// state
	var ifFull = (0, _util.fullCheck)(creep);
	// target
	(0, _util.targetMaker)(creep, Memory.rooms[roomName].structures.container[0], 'withdraw');
	// task
	if (!ifFull) {
		if ((0, _action.pickup)(creep, (0, _action.findInRange)(creep, creep.room.memory.dropped.energy, 2)[0])) return;
		var store = (0, _util.targetFormat)(creep.room.memory.flags.store);
		if (store && (0, _action.withdraw)(creep, store, store.store.energy > 0)) return;
		if ((0, _action.withdraw)(creep, Memory.rooms[roomName].structures.spawn)) return;
		if ((0, _action.withdraw)(creep, creep.memory.target.withdraw)) return;
	} else {
		(0, _util.targetChanger)(creep, Memory.rooms[roomName].structures.container[0], 'withdraw');
		if ((0, _action.upgradeController)(creep, creep.room.controller)) return;
	}
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	// memory
	var isFull = (0, _util.fullCheck)(creep);
	// task
	var link = creep.room.memory.structures.link.filter(function (link) {
		return link.id != creep.room.memory.config.linkMain;
	})[0];
	// run
	if (!isFull) {
		if ((0, _action.pickup)(creep, (0, _action.findInRange)(creep, creep.room.memory.dropped.energy, 4)[0])) return;
		var container = (0, _action.findInRange)(link, creep.room.memory.structures.container, 2)[0];
		if ((0, _action.withdraw)(creep, container, container && container.store.energy > 0)) return;
	} else {
		if (link && (0, _action.transfer)(creep, link, link.energy < link.energyCapacity)) return;
	}
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	// root
	var isFull = (0, _util.fullCheck)(creep);
	// target
	(0, _util.targetMaker)(creep, creep.room.memory.sources[0].source, 'harvest');
	var harvestTarget = Game.getObjectById(creep.memory.target.harvest.id);

	// task
	if (isFull) {
		try {
			var container = (0, _action.findInRange)(harvestTarget, creep.room.memory.structures.container, 2)[0];
			if (!creep.pos.isEqualTo(container.pos) && (0, _action.moveTo)(creep, container)) return;
			if ((0, _action.repair)(creep, container, container.hits < container.hitsMax)) return;
			if ((0, _action.build)(creep, (0, _action.findInRange)(creep, creep.room.memory.structures.needBuild, 3)[0])) return;
		} catch (e) {}
	} else {
		if ((0, _action.pickup)(creep, (0, _action.findInRange)(creep, creep.room.memory.dropped.energy, 1)[0])) return;
	}
	if ((0, _action.harvest)(creep, harvestTarget)) return;
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	// state
	var isfFull = (0, _util.fullCheck)(creep);
	// task
	if (!isfFull) {
		if ((0, _action.withdraw)(creep, (0, _action.findClosestByRange)(creep, creep.room.memory.structures.canWithdraw))) return;
	} else {
		if ((0, _action.upgradeController)(creep, creep.room.controller)) return;
	}
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(115);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _linker = __webpack_require__(116);

Object.defineProperty(exports, 'linker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_linker).default;
  }
});

var _upgrader = __webpack_require__(118);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(108);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(117);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(110);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farBuilder = __webpack_require__(111);

Object.defineProperty(exports, 'farBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farBuilder).default;
  }
});

var _farHarvester = __webpack_require__(112);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(113);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _farUpgrader = __webpack_require__(114);

Object.defineProperty(exports, 'farUpgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farUpgrader).default;
  }
});

var _claim = __webpack_require__(109);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

var _attacker = __webpack_require__(107);

Object.defineProperty(exports, 'attacker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attacker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _flatten2 = __webpack_require__(41);

var _flatten3 = _interopRequireDefault(_flatten2);

var _chunk2 = __webpack_require__(38);

var _chunk3 = _interopRequireDefault(_chunk2);

var _zip2 = __webpack_require__(57);

var _zip3 = _interopRequireDefault(_zip2);

var _flattenDeep2 = __webpack_require__(42);

var _flattenDeep3 = _interopRequireDefault(_flattenDeep2);

var _compact2 = __webpack_require__(39);

var _compact3 = _interopRequireDefault(_compact2);

var _fill2 = __webpack_require__(40);

var _fill3 = _interopRequireDefault(_fill2);

var _sum2 = __webpack_require__(54);

var _sum3 = _interopRequireDefault(_sum2);

var _sortBy2 = __webpack_require__(53);

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _forEach2 = __webpack_require__(43);

var _forEach3 = _interopRequireDefault(_forEach2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var roomArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var roleConfig = {
		// [name , body , num[main,extra], time]
		filler: [{ carry: 6 }, [2, 0], 10],
		cleaner: [{ carry: 4 }, [1, 0], 10],
		miner: [{ work: 8, carry: 1, move: 4 }, [1, 1], 10],
		transer: [{ carry: 8 }, [1, 1], 10],
		linker: [{ carry: 1 }, [1, 0], 10],
		builder: [{ work: 2, carry: 6 }, [1, 1], 10],
		repairer: [{ work: 2, carry: 6 }, [0, 1], 10],
		upgrader: [{ work: 4, carry: 2 }, [3, 0], 10],
		claimer: [{ claim: 2 }, [0, 1], 10],
		traveller: [{ move: 1 }, [0, 0], 10],
		attacker: [{ tough: 10, attack: 4 }, [0, 0], 100]
	};
	return buildRole(roleConfig, roomArray);
};

function buildRole() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var roomArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var i = 0,
	    proprity = 0;
	var newConfig = {};
	(0, _forEach3.default)(roomArray, function (roomName) {
		(0, _forEach3.default)(config, function (array, key) {
			var name = key,
			    body = buildBody(array[0]),
			    number = i == 0 ? array[1][0] : array[1][1];
			number = buildNumber(key, number, roomName);
			if (number == 0) return;
			if (i > 0) name = name + '#' + roomName;

			newConfig[name] = {
				role: key,
				roomName: roomName,
				roomType: i == 0 ? "main" : "extra",
				body: body[0],
				cost: body[1],
				number: number,
				timeout: array[2],
				proprity: proprity
			};
			proprity++;
		});
		i++;
	});
	return newConfig;
}

function buildNumber(role, number, roomName) {
	try {
		var room = Memory.rooms[roomName];
		switch (role) {
			case 'miner':
				number = room.sources.length * number;
				break;
			case 'transer':
				number = room.sources.length * number - room.structures.link.length + 1;
				break;
			case 'builder':
				number = Math.ceil(room.structures.needBuild.length / 4);
		}
		return number;
	} catch (e) {
		console.log("# Error BuildNumber " + role + "-" + roomName + " " + e);
		return 0;
	}
}

var partCost = {
	"move": 50,
	"work": 100,
	"attack": 80,
	"carry": 50,
	"heal": 250,
	"ranged_attack": 150,
	"tough": 10,
	"claim": 600
};

var partProprity = {
	"tough": 1,
	"carry": 2,
	"work": 3,
	"move": 4,
	"attack": 5,
	"ranged_attack": 6,
	"claim": 7,
	"heal": 8
};

(0, _sortBy3.default)(['work', 'heal', 'tough'], function (n) {
	return partProprity[n];
});

function buildBody() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var cost = 0,
	    body = buildBodyFormat(obj);
	(0, _forEach3.default)(body, function (part) {
		cost = cost + partCost[part];
	});
	return [body, cost];
}

function buildBodyFormat() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var move = void 0,
	    tough = [],
	    bodyArray = [];
	move = Math.ceil((0, _sum3.default)(obj) / 2);
	if (obj.tough) {
		tough = (0, _fill3.default)(Array(obj.tough), 'tough');
		delete obj.tough;
	}
	if (obj.move) {
		move = move > obj.move ? obj.move : move;
		delete obj.move;
	}
	(0, _forEach3.default)(obj, function (n, key) {
		bodyArray.push((0, _fill3.default)(Array(n), key));
	});

	if (obj.tough) bodyArray.unshift(tough);
	bodyArray = (0, _compact3.default)((0, _flattenDeep3.default)((0, _zip3.default)(concat(Array, bodyArray))));

	bodyArray = (0, _chunk3.default)(bodyArray, 2);
	for (var i = move; i > 0; i--) {
		bodyArray[i] = (0, _flatten3.default)([bodyArray[i], 'move']);
	}
	return (0, _compact3.default)((0, _flattenDeep3.default)(bodyArray));
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = [['W81S67', 'W81S66'], ['W82S67']];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (link) {
	var linkMain = link.room.memory.config.linkMain;
	if (link.id == linkMain || link.cooldown > 0 || link.energy < link.energyCapacity) return;
	var target = Game.getObjectById(linkMain);
	if (target.energy == 0) link.transferEnergy(target);
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (spawn, configRole) {
	// let target = spawn.pos.findInRange(spawn.room.memory.creeps.my.attacker, 1)
	// if (target && target.length > 0) {
	// 	console.log(spawn.recycleCreep(target[0]))
	//
	// }
	if (spawn.spawning) {
		var percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100),
		    text = [_util.emoji.build, spawn.spawning.name.split('#')[0], '(' + percent + '%)'].join(' ');
		console.log(text);
		spawn.room.visual.text(text, spawn.pos.x + 1, spawn.pos.y, {
			align: 'left',
			stroke: '#111111',
			color: '#ffffff',
			font: 0.5,
			background: 'rgba(0,0,0,.5)'
		});
		return;
	}
	if ((0, _util.timer)(2)) {
		var roleFactory = configRole;
		var priority = false;
		roleFactory.forEach(function (roleType) {
			var roleName = roleType.role;
			var roleTimeout = roleType.timeout ? roleType.timeout : 10;
			var roleMy = _.filter(Memory.global.creeps[roleName], function (roleCreep) {
				return roleCreep.ticksToLive >= roleTimeout;
			});
			if (roleMy.length - roleType.number >= 0 || priority) return;
			var spawnName = roleName + '#' + Game.time;
			spawn.createCreep(buildBody(roleType.body), spawnName, {
				bornRoom: spawn.room.name,
				bornTime: Game.time,
				role: roleName,
				name: spawnName,
				target: {}
			});
			console.log(_util.emoji.build, roleName, 'now:', roleMy.length, 'need:', roleType.number);
			priority = true;
		});
	}
};

function buildBody(obj) {
	var bodyArray = [];
	var move = void 0;
	if (!obj.move) {
		move = Math.ceil(_.sum(obj) / 2);
	} else {
		move = obj.move;
		delete obj.move;
	}
	_.forEach(obj, function (n, key) {
		bodyArray = bodyArray.concat(_.fill(Array(n), key));
	});
	bodyArray = _.chunk(bodyArray, 2);

	for (var i = move; i > 0; i--) {
		bodyArray[i] = _.flatten([bodyArray[i], 'move']);
	}
	return _.compact(_.flattenDeep(bodyArray));
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (tower) {
	var needFix = tower.room.memory.structures.needFix,
	    enemy = tower.room.memory.creeps.enemy;
	if (enemy.length > 0) {
		tower.attack(enemy[0]);
	} else if (needFix.length > 0) {
		tower.repair(needFix[0]);
	}
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(124);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(123);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

var _link = __webpack_require__(122);

Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_link).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (roomName, timeout) {
	"use strict";

	var room = Game.rooms[roomName];
	var gcl = Game.gcl,
	    gclLeft = Math.floor(gcl.progressTotal - gcl.progress),
	    gclSpeed = Math.round((gcl.progress - Memory.timer['gcl']) / timeout),
	    gclProcess = Math.round(gcl.progress / gcl.progressTotal * 100),
	    gclTimeLeft = Math.round(gclLeft / gclSpeed),
	    gclHourLeft = Math.floor(gclTimeLeft * 5 / 3600 * 100) / 100;
	Memory.timer['gcl'] = gcl.progress;

	var rcl = room.controller,
	    rclProcess = Math.round(rcl.progress / rcl.progressTotal * 100),
	    rclSpeed = Math.round((rcl.progress - Memory.timer['rcl']) / timeout),
	    rclLeft = rcl.progressTotal - rcl.progress,
	    rclTimeLeft = Math.round(rclLeft / rclSpeed),
	    rclHourLeft = Math.floor(rclTimeLeft * 5 / 3600 * 100) / 100;
	Memory.timer['rcl'] = rcl.progress;

	var rcl2 = Game.rooms['W82S67'].controller,
	    rcl2Process = Math.round(rcl2.progress / rcl2.progressTotal * 100),
	    rcl2Speed = Math.round((rcl2.progress - Memory.timer['rcl2']) / timeout),
	    rcl2Left = rcl2.progressTotal - rcl2.progress,
	    rcl2TimeLeft = Math.round(rcl2Left / rcl2Speed),
	    rcl2HourLeft = Math.floor(rcl2TimeLeft * 5 / 3600 * 100) / 100;
	Memory.timer['rcl2'] = rcl2.progress;

	var gclLog = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft', 'HourLeft'],
		body: [[_util.color.blue('GCL'), gcl.level, gclProcess + '%', gclLeft, gclSpeed, gclTimeLeft, gclHourLeft], [_util.color.orange('RCL 1'), rcl.level, rclProcess + '%', rclLeft, rclSpeed, rclTimeLeft, rclHourLeft], [_util.color.orange('RCL 2'), rcl2.level, rcl2Process + '%', rcl2Left, rcl2Speed, rcl2TimeLeft, rcl2HourLeft]]
	};
	//
	var extension = room.memory.structures.extension;
	var extensionFull = 0;
	extension.forEach(function (ex) {
		if (ex.energy == ex.energyCapacity) extensionFull++;
	});
	var configCreepNum = 0,
	    roleLog = [{
		header: [],
		body: [[]]
	}, {
		header: [],
		body: [[]]
	}];
	room.memory.config.role.forEach(function (role) {
		configCreepNum = configCreepNum + role.number;
		var NowCreeps = Memory.global.creeps[role.role];
		var NowNum = NowCreeps ? NowCreeps.length : 0;
		var i = role.role.match('far') ? 1 : 0;
		roleLog[i].header.push(role.role);
		roleLog[i].body[0].push(NowNum + '/' + role.number);
	});
	var energyLog = {
		header: ['Storage', 'Spawn', 'Extension', 'CanUse', 'Creeps', 'Cpu', 'Bucket'],
		body: [[_util.color.yellow(room.memory.structures.storage.store.energy), room.memory.structures.spawn.energy, extensionFull + '/' + extension.length, extensionFull * 50 + room.memory.structures.spawn.energy, Object.keys(Memory.creeps).length + '/' + configCreepNum, Math.floor(Game.cpu.getUsed()) + '/' + Game.cpu.limit, Game.cpu.bucket]]
	};

	console.log(_util.color.grey('# Gametime ' + Game.time), (0, _util.table)(gclLog), (0, _util.table)(energyLog), (0, _util.table)(roleLog[0]), (0, _util.table)(roleLog[1]));
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var trigger = function trigger() {
	isSafe('W81S66');
	// isSafe('W82S67')
};

trigger.install = function () {
	Memory.trigger = {
		noEnemy: {
			'W81S66': {
				timeout: 0,
				safe: true
			},
			'W82S67': {
				timeout: 0,
				safe: true
			}
		}
	};
};
exports.default = trigger;


function isSafe(roomName) {
	try {
		var _trigger = Memory.trigger.noEnemy[roomName];
		if (_trigger.safe && Memory.rooms[roomName].creeps.enemy.length > 0) {
			Memory.trigger.noEnemy[roomName] = {
				safe: false,
				timeout: Game.time
			};
			console.log('# [Warn]', roomName, 'Enemy Attack !');
		}
		if (!_trigger.safe) {
			var safeTimeout = Game.time - _trigger.timeout;
			console.log('# [Warn]', roomName, 'Safe Timeout:', safeTimeout + '/' + Memory.rooms[roomName].creeps.enemy[0].ticksToLive);
			if (Game.time - _trigger.timeout > Memory.rooms[roomName].creeps.enemy[0].ticksToLive) {
				console.log('# [Warn]', roomName, 'Safe Now !');
				Memory.trigger.noEnemy[roomName].safe = true;
				Memory.rooms[roomName].creeps.enemy = [];
			}
		}
	} catch (e) {
		Memory.trigger.noEnemy[roomName].safe = true;
		Memory.rooms[roomName].creeps.enemy = [];
	}
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _manager = __webpack_require__(13);

var Manager = _interopRequireWildcard(_manager);

var _gui = __webpack_require__(12);

var Gui = _interopRequireWildcard(_gui);

var _util = __webpack_require__(0);

var _task = __webpack_require__(15);

var _setting = __webpack_require__(14);

var _setting2 = _interopRequireDefault(_setting);

var _screepsProfiler = __webpack_require__(11);

var _screepsProfiler2 = _interopRequireDefault(_screepsProfiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var rooms = ['W81S67', 'W81S66', 'W82S67'];
_screepsProfiler2.default.enable();
console.log(_util.color.grey('# Coding Update!'));
// trigger.install()

// switch
var profilerEnabled = false;

// main
var main = function main() {
	if (Game.cpu.bucket < 2 * Game.cpu.tickLimit) {
		console.log('# Lack of CPU!');
		return;
	}

	// Manager
	(0, _task.trigger)();
	Manager.root();
	Manager.memory(rooms);
	Manager.global(rooms);
	Manager.role(rooms);
	Manager.structure(rooms);
	// GUI
	Gui.room(rooms[0]);
	Gui.role(rooms[0]);
	// Log
	if ((0, _util.timer)(10)) (0, _task.log)(rooms[0], 10);
	// Setting
	(0, _setting2.default)();
};

// loop
module.exports.loop = function () {
	if (profilerEnabled) {
		_screepsProfiler2.default.wrap(function () {
			main();
		});
	} else {
		main();
	}
};

/***/ })
/******/ ]);