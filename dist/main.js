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
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timer = __webpack_require__(21);

Object.defineProperty(exports, 'timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timer).default;
  }
});

var _color = __webpack_require__(11);

Object.defineProperty(exports, 'color', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_color).default;
  }
});

var _colorType = __webpack_require__(12);

Object.defineProperty(exports, 'colorType', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_colorType).default;
  }
});

var _table = __webpack_require__(17);

Object.defineProperty(exports, 'table', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_table).default;
  }
});

var _emoji = __webpack_require__(13);

Object.defineProperty(exports, 'emoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emoji).default;
  }
});

var _build = __webpack_require__(10);

Object.defineProperty(exports, 'build', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _action = __webpack_require__(9);

Object.defineProperty(exports, 'action', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_action).default;
  }
});

var _isFriend = __webpack_require__(15);

Object.defineProperty(exports, 'isFriend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFriend).default;
  }
});

var _isFull = __webpack_require__(16);

Object.defineProperty(exports, 'isFull', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFull).default;
  }
});

var _flagCommand = __webpack_require__(14);

Object.defineProperty(exports, 'flagCommand', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_flagCommand).default;
  }
});

var _targetMaker = __webpack_require__(20);

Object.defineProperty(exports, 'targetMaker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetMaker).default;
  }
});

var _targetChanger = __webpack_require__(18);

Object.defineProperty(exports, 'targetChange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetChanger).default;
  }
});

var _targetFormat = __webpack_require__(19);

Object.defineProperty(exports, 'targetFormat', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_targetFormat).default;
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

var _moveTo = __webpack_require__(28);

Object.defineProperty(exports, "moveTo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveTo).default;
  }
});

var _attack = __webpack_require__(22);

Object.defineProperty(exports, "attack", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _heal = __webpack_require__(27);

Object.defineProperty(exports, "heal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_heal).default;
  }
});

var _build = __webpack_require__(23);

Object.defineProperty(exports, "build", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _repair = __webpack_require__(30);

Object.defineProperty(exports, "repair", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_repair).default;
  }
});

var _dismantle = __webpack_require__(25);

Object.defineProperty(exports, "dismantle", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

var _harvest = __webpack_require__(26);

Object.defineProperty(exports, "harvest", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvest).default;
  }
});

var _pickup = __webpack_require__(29);

Object.defineProperty(exports, "pickup", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pickup).default;
  }
});

var _transfer = __webpack_require__(31);

Object.defineProperty(exports, "transfer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transfer).default;
  }
});

var _withdraw = __webpack_require__(33);

Object.defineProperty(exports, "withdraw", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withdraw).default;
  }
});

var _upgradeController = __webpack_require__(32);

Object.defineProperty(exports, "upgradeController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgradeController).default;
  }
});

var _claimController = __webpack_require__(24);

Object.defineProperty(exports, "claimController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claimController).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var room = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.rooms['W81S67'];

	var needBuild = room.memory.structures ? room.memory.structures.needBuild : [];
	var builderNumber = needBuild.length > 0 ? needBuild.length : 1;
	var noEnemy = Memory.trigger.noEnemy;

	var repair = {
		percent: 0.5,
		maxHits: 20000
	};
	var role = [{
		role: "claim",
		body: { claim: 2, move: 1 },
		timeout: 100,
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 7
	}, {
		role: "claimSec",
		body: { claim: 2, move: 4 },
		timeout: 200,
		number: noEnemy['W82S67'].safe ? 1 : 0,
		priority: 7
	}, {
		role: "farMiner",
		body: { work: 8, carry: 1, move: 4 },
		timeout: 100,
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 1
	}, {
		role: "farMinerSec",
		body: { work: 4, carry: 6, move: 5 },
		timeout: 100,
		number: noEnemy['W82S67'].safe ? 5 : 0,
		priority: 8
	}, {
		role: 'farHarvester',
		body: { carry: 8, move: 4 },
		number: noEnemy['W81S66'].safe ? 2 : 0,
		priority: 5
	}, {
		role: 'farBuilder',
		body: { carry: 5, work: 1, move: 3 },
		number: noEnemy['W81S66'].safe ? 1 : 0,
		priority: 5
	}, {
		role: 'harvester',
		body: { carry: 2, move: 1 },
		number: 1,
		priority: 2
	}, {
		role: 'upgrader',
		body: { carry: 2, work: 4, move: 2 },
		number: builderNumber > 1 ? 1 : 3,
		priority: 3
	}, {
		role: 'builder',
		body: { work: 3, carry: 3, move: 3 },
		number: builderNumber > 4 ? 4 : builderNumber,
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
		body: { attack: 2, move: 3 },
		number: 0,
		priority: 0
	}, {
		role: 'traveller',
		body: { move: 1 },
		number: 0,
		priority: 0
	}];

	return {
		role: role.sort(function (a, b) {
			return a.priority - b.priority;
		}),
		repair: repair,
		linkMain: '58d505eb204ecd9e507951f0'
	};
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attack = __webpack_require__(34);

Object.defineProperty(exports, 'attack', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _moveTo = __webpack_require__(36);

Object.defineProperty(exports, 'moveTo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveTo).default;
  }
});

var _dismantle = __webpack_require__(35);

Object.defineProperty(exports, 'dismantle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _creepBar = __webpack_require__(37);

Object.defineProperty(exports, 'creepBar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_creepBar).default;
  }
});

var _room = __webpack_require__(39);

Object.defineProperty(exports, 'room', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_room).default;
  }
});

var _role = __webpack_require__(38);

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(48);

Object.defineProperty(exports, 'root', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_root).default;
  }
});

var _memory = __webpack_require__(46);

Object.defineProperty(exports, 'memory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_memory).default;
  }
});

var _global = __webpack_require__(40);

Object.defineProperty(exports, 'global', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_global).default;
  }
});

var _structure = __webpack_require__(49);

Object.defineProperty(exports, 'structure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_structure).default;
  }
});

var _role = __webpack_require__(47);

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flags = __webpack_require__(3);

Object.defineProperty(exports, 'flags', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_flags).default;
  }
});

var _log = __webpack_require__(67);

Object.defineProperty(exports, 'log', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_log).default;
  }
});

var _trigger = __webpack_require__(68);

Object.defineProperty(exports, 'trigger', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_trigger).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 9 */
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
			if (creep.memory.role.match('iner')) (0, _util.targetMaker)(creep, creep.room.memory.sources[0], 'harvest');
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
			if (creep.memory.role.match('iner')) (0, _action.moveTo)(creep, target, color);
			return true;
			break;
		case ERR_NOT_ENOUGH_RESOURCES:
			creep.say(text + "RESOURCES");
			break;
		case ERR_INVALID_TARGET:
			creep.say(text + "TARGET");
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep) {
	if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
	if (creep.memory.full && creep.carry.energy == 0) creep.memory.full = false;
};

/***/ }),
/* 17 */
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
	if (content instanceof Array) {
		contentBody = content;
	} else {
		contentHeadr = content.header;
		contentBody = content.body;
		contentHeadr.forEach(function (col) {
			return tableHeader += "<th style=\"border:1px solid #444;padding:4px 8px\">" + col + "</th>";
		});
		tableHeader = "<tr style=\"border:1px solid #444;background: #333;color:#888\" >" + tableHeader + "</tr>";
	}
	contentBody.forEach(function (row) {
		var tableCol = "";
		row.forEach(function (col) {
			return tableCol += "<td style=\"border:1px solid #444;padding:4px 8px\">" + col + "</td>";
		});
		tableBody += "<tr style=\"border:1px solid #444\" >" + tableCol + "</tr>";
	});
	return "<table style=\"border:1px solid #444\">" + tableHeader + tableBody + "</table>";
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

	target = (0, _util.targetFormat)(target);
	if (!target) return false;
	if (!creep.memory.target[type]) {
		(0, _util.targetMaker)(creep, target, type);
	} else {
		if (target.id == creep.memory.target[type].id) return true;
		creep.memory.target[type] = {
			id: target.id,
			pos: target.pos,
			time: Game.time
		};
		creep.say(_util.emoji.targetChange);
	}
	return true;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target) {
	if (!target) return;
	if (target.length) target = _.compact(target)[0];
	return target;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

	target = (0, _util.targetFormat)(target);
	if (!target) return false;
	if (!creep.memory.target) creep.memory.target = {};
	creep.memory.target[type] = {
		id: target.id,
		pos: target.pos,
		time: Game.time
	};
	creep.say(_util.emoji.target);
	return true;
};

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'attack');
	if ((0, _util.action)(creep, target, creep.attack(target), _util.emoji.attack, _util.colorType.red)) return true;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'build');
	if ((0, _util.action)(creep, target, creep.build(target), _util.emoji.build, _util.colorType.blue)) return true;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'reserveController');
	if ((0, _util.action)(creep, target, creep.reserveController(target), _util.emoji.claim, _util.colorType.orange)) return true;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'dismantle');
	if ((0, _util.action)(creep, target, creep.dismantle(target), _util.emoji.dismantle, _util.colorType.red)) return true;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	// targetChange(creep,target,'harvest')
	if ((0, _util.action)(creep, target, creep.harvest(target), _util.emoji.harvest, _util.colorType.yellow)) return true;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'heal');
	if ((0, _util.action)(creep, target, creep.heal(target), _util.emoji.heal, _util.colorType.green)) return true;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';
	var noPathFinding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	if (creep.fatigue > 0) return false;
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	if (!target.room || !Game.rooms[target.pos.roomName]) {
		target = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName);
	}
	if ((0, _util.action)(creep, target, creep.moveTo(target, {
		reusePath: 15,
		serializeMemory: true,
		noPathFinding: noPathFinding,
		visualizePathStyle: {
			stroke: color,
			lineStyle: 'dotted',
			opacity: 0.5,
			strokeWidth: 0.1
		}
	}))) {
		target.room.visual.circle(target.pos, { fill: 'transparent', radius: 0.55, stroke: color });
		if (target.pos.roomName == creep.pos.roomName) {
			target.room.visual.line(creep.pos, target.pos, { color: color, width: 0.1, opacity: 0.05 });
		}
		return true;
	}
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'pickup');
	if ((0, _util.action)(creep, target, creep.pickup(target), _util.emoji.pickup, _util.colorType.yellow)) return true;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'repair');
	if ((0, _util.action)(creep, target, creep.repair(target), _util.emoji.repair, _util.colorType.blue)) return true;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RESOURCE_ENERGY;

	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'transfer');
	if ((0, _util.action)(creep, target, creep.transfer(target, type), _util.emoji.transfer, _util.colorType.purple)) return true;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'upgradeController');
	if ((0, _util.action)(creep, target, creep.upgradeController(target), _util.emoji.upgrade, _util.colorType.orange)) return true;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, target) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RESOURCE_ENERGY;

	target = (0, _util.targetFormat)(target);
	if (!target) return;
	(0, _util.targetChange)(creep, target, 'withdraw');
	if ((0, _util.action)(creep, target, creep.withdraw(target, type), _util.emoji.withdraw, _util.colorType.purple)) return true;
};

/***/ }),
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _config = __webpack_require__(2);

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
/* 39 */
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
/* 40 */
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
/* 41 */
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
	var creepsMy = {};
	configRole.forEach(function (role) {
		creepsMy[role.role] = _.filter(creepsMyRaw, function (creep) {
			return creep.name.split('#')[0] == role.role;
		});
	});
	return creepsMy;
}

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _flags = __webpack_require__(3);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room, miner) {
	var rawSources = room.find(FIND_SOURCES);
	var sources = [];
	rawSources.forEach(function (source) {
		sources.push({
			source: source,
			minerNumber: source.pos.findInRange(source.room.memory.creeps.my.miner, 2).length
		});
	});
	if (sources.length > 0) {
		sources.sort(function (a, b) {
			return b.source.energy - a.source.energy;
		}).sort(function (a, b) {
			return a.minerNumber - b.minerNumber;
		});
	}
	return sources;
};

/***/ }),
/* 45 */
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
		container: _.filter(structuresOther, function (structure) {
			return structure.structureType == STRUCTURE_CONTAINER;
		}),
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _creeps = __webpack_require__(41);

var _creeps2 = _interopRequireDefault(_creeps);

var _structures = __webpack_require__(45);

var _structures2 = _interopRequireDefault(_structures);

var _sources = __webpack_require__(44);

var _sources2 = _interopRequireDefault(_sources);

var _dropped = __webpack_require__(42);

var _dropped2 = _interopRequireDefault(_dropped);

var _flags = __webpack_require__(43);

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
			sources: (0, _sources2.default)(room, _.merge(creeps.my.miner, creeps.my.farMiner, creeps.my.farMinerSec)),
			dropped: (0, _dropped2.default)(room),
			flags: (0, _flags2.default)(room)
		};

		room.memory = memory;
		// Memory.game  = Game;
	});
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(62);

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
					role.farBuilder(creep, newRoomMaker(roomArrary[1]));
					break;
				case 'farHarvester':
					role.farHarvester(creep, newRoomMaker(roomArrary[1]));
					break;
				case 'farMiner':
					role.farMiner(creep, newRoomMaker(roomArrary[1]));
					break;
				case 'claim':
					role.claim(creep, newRoomMaker(roomArrary[1]));
					break;
				case 'farMinerSec':
					role.farMinerSec(creep, newRoomMaker(roomArrary[2]));
					break;
				case 'claimSec':
					role.claimSec(creep, newRoomMaker(roomArrary[2]));
					break;
				case 'attacker':
					role.attacker(creep, newRoom);
					break;
			}
		}

		// // cheap base
		// myCreeps.cleaner.forEach(creep => role.cleaner(creep))
		//
		// // source
		// myCreeps.harvester.forEach(creep => role.harvester(creep))
		// myCreeps.miner.forEach(creep => role.miner(creep))
		// myCreeps.upgrader.forEach(creep => role.upgrader(creep))
		// myCreeps.builder.forEach(creep => role.builder(creep))
		//
		// // far
		// myCreeps.farBuilder.forEach(creep => role.farBuilder(creep, newRoom))
		// myCreeps.farHarvester.forEach(creep => role.farHarvester(creep, newRoom))
		// myCreeps.farMiner.forEach(creep => role.farMiner(creep, newRoom))
		// myCreeps.claim.forEach(creep => role.claim(creep, newRoom))
		//
		// // attack
		// myCreeps.attacker.forEach(creep => role.attacker(creep, newRoom))
	});
};

function newRoomMaker(roomName) {
	return {
		pos: new RoomPosition(25, 47, roomName),
		memory: Game.rooms[roomName] ? Game.rooms[roomName].memory : {}
	};
}

/***/ }),
/* 48 */
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
		}
	}
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _structure = __webpack_require__(66);

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArray) {
	roomArray.forEach(function (room) {
		room = Game.rooms[room];
		if (room && room.memory) {
			var structures = room.memory.structures;
			var config = room.memory.config;
			if (structures.spawn) structure.spawn(structures.spawn, config);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (creep) {};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	// target = creep.room.memory.flags.dismantle
	// if (target.length > 0, target[0] != null) {
	// 	if (dismantle(creep, target[0]))return
	// }
	if (creep.memory.full) {
		var needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findClosestByRange(needBuild);
			if ((0, _action.build)(creep, target)) return;
		}
		var needFix = creep.room.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if ((0, _action.repair)(creep, target)) return;
		}
		target = creep.room.controller;
		if ((0, _action.upgradeController)(creep, target)) return;
	} else {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = creep.room.storage;
		if ((0, _action.withdraw)(creep, target)) return;
	}
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	//
	var target = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!target) {
		(0, _action.moveTo)(creep, newRoom.pos);
		return;
	} else {
		if ((0, _action.claimController)(creep, target)) return;
	}
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {

	var target = Game.getObjectById('5873bc1d11e3e4361b4d7140');
	if (!target) {
		(0, _action.moveTo)(creep, newRoom.pos);
		return;
	} else {
		if ((0, _action.claimController)(creep, target)) return;
	}
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var target = void 0;
	if (creep.room.name !== 'W81S67') {
		(0, _action.moveTo)(creep, Game.spawns['Spawn1']);
		return;
	}
	// memory
	(0, _util.isFull)(creep);
	// run
	var needFill = creep.room.memory.structures.needFill;
	if (!creep.memory.full) {
		target = Game.getObjectById(creep.room.memory.config.linkMain);
		if (target.energy > 0) {
			if ((0, _action.withdraw)(creep, target)) return;
		}
		if (!needFill || needFill.length == 0) {
			var dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findClosestByRange(dropped);
				if ((0, _action.pickup)(creep, target)) return;
			}
		}
		target = creep.room.storage;
		if ((0, _action.withdraw)(creep, target)) return;
	} else {
		target = creep.pos.findClosestByRange(needFill);
		if ((0, _action.transfer)(creep, target)) return;
		target = creep.room.memory.structures.tower.sort(function (a, b) {
			return a.energy - b.energy;
		})[0];
		if (target && target.energy == target.energyCapacity) {
			target = creep.room.storage;
			if ((0, _action.transfer)(creep, target)) return;
		} else {
			if ((0, _action.transfer)(creep, target)) return;
		}
	}
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	if (!newRoom.memory || !newRoom.memory.structures) return;
	var room = Game.spawns['Spawn1'].room;
	var needBuild = newRoom.memory.structures.needBuild;
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (needBuild.length > 0) {
		if (!creep.memory.full) {
			var dropped = creep.room.memory.dropped.energy;
			if (dropped.length > 0) {
				target = creep.pos.findInRange(dropped, 3);
				if ((0, _action.pickup)(creep, target[0])) return;
			}
			target = room.storage;
			if ((0, _action.withdraw)(creep, target)) return;
		} else {
			target = creep.pos.findClosestByRange(needBuild);
			if ((0, _action.build)(creep, target)) return;
			(0, _action.moveTo)(creep, newRoom.pos);
			return;
		}
	} else {
		if (!creep.memory.full) {
			var _dropped = creep.room.memory.dropped.energy;
			if (_dropped.length > 0) {
				target = creep.pos.findInRange(_dropped, 4);
				if ((0, _action.pickup)(creep, target[0])) return;
			}
			target = newRoom.memory.structures.canWithdraw;
			if ((0, _action.withdraw)(creep, target[0])) return;
			var farMiner = newRoom.memory.creeps.my.farMiner;
			if (farMiner.length > 0) {
				target = Game.getObjectById(farMiner[0].id);
				(0, _action.moveTo)(creep, target);
				return;
			}
		} else {
			var needFix = newRoom.memory.structures.needFix;
			if (needFix.length > 0) {
				target = creep.pos.findClosestByRange(needFix);
				if ((0, _action.repair)(creep, target)) return;
			}
			target = room.storage;
			if ((0, _action.transfer)(creep, target)) return;
		}
	}
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (!creep.memory.full) {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = newRoom.memory.structures.canWithdraw;
		if ((0, _action.withdraw)(creep, target[0])) return;
		var farMiner = newRoom.memory.creeps.my.farMiner;
		if (farMiner.length > 0) {
			target = Game.getObjectById(farMiner[0].id);
			(0, _action.moveTo)(creep, target);
			return;
		}
	} else {
		target = Game.getObjectById('58d07b35bfeec6256575be5d');
		if ((0, _action.transfer)(creep, target)) return;
	}
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, newRoom) {
	var target = void 0;
	(0, _util.isFull)(creep);
	//
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = newRoom.memory.sources[0].source.id;
	//
	if (creep.memory.full) {
		var container = creep.pos.findInRange(creep.room.memory.structures.container, 0)[0];
		if (container) {
			if (container.hits < container.hitsMax && (0, _action.repair)(creep, container)) return;
		} else {
			creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER);
		}
		var needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && (0, _action.build)(creep, target[0])) return;
		}
	} else {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
	}

	target = Game.getObjectById(creep.memory.harvestTarget);
	if (!target) {
		(0, _action.moveTo)(creep, newRoom.pos);
		return;
	} else {
		if ((0, _action.harvest)(creep, target)) return;
	}
	// // memory
	// isFull(creep)
	// // run
	// if (!creep.memory.full) {
	// 	const dropped = creep.room.memory.dropped.energy;
	// 	if (dropped.length > 0) {
	// 		target = creep.pos.findInRange(dropped, 0);
	// 		if (pickup(creep, target[0])) return;
	// 	}
	// 	target = Game.getObjectById('5873bc3511e3e4361b4d7390');
	// 	if (!target) {
	// 		moveTo(creep, newRoom.pos)
	// 	} else {
	// 		if (harvest(creep, target)) return;
	// 	}
	// } else {
	// 	target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
	// 	if (transfer(creep, target[0])) return;
	// 	target = newRoom.memory.structures.needBuild;
	// 	if (build(creep, target[0])) return;
	// }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _action = __webpack_require__(1);

var _util = __webpack_require__(0);

exports.default = function (creep, newRoom) {
	var target = void 0;
	(0, _util.isFull)(creep);
	//
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = newRoom.memory.sources[0].source.id;
	//
	if (!creep.memory.full) {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = Game.getObjectById(creep.memory.harvestTarget);
		if ((0, _action.harvest)(creep, target)) return;
	} else {
		var needFix = newRoom.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if ((0, _action.repair)(creep, target)) return;
		}
		var needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findClosestByRange(needBuild);
			if ((0, _action.build)(creep, target)) return;
		}
		target = Game.getObjectById('58d07b35bfeec6256575be5d');
		if ((0, _action.transfer)(creep, target)) return;
	}
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (creep.memory.full) {
		target = Game.getObjectById('58d758a13de0ed30b84fb81e');
		(0, _action.transfer)(creep, target);
	} else {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = Game.getObjectById('58d6a0f58f53422d7fea1d52');
		if (target.store.energy > 0) {
			if ((0, _action.withdraw)(creep, target)) return;
		}
	}
	// let container = Game.getObjectById('58d6a0f58f53422d7fea1d52')
	//
	// if (container) {
	// 	if (!creep.memory.full) {
	// 		const dropped = creep.room.memory.dropped.energy;
	// 		if (dropped.length > 0) {
	// 			target = creep.pos.findInRange(dropped, 6);
	// 			if (pickup(creep, target[0])) return;
	// 		}
	// 		if (container.store.energy > 0) {
	// 			if (withdraw(creep, container)) return;
	// 		}
	// 	} else {
	// 		target = creep.room.memory.structures.needFill;
	// 		if (target.length > 0) {
	// 			target = creep.pos.findClosestByRange(target);
	// 		} else {
	// 			target = creep.room.storage
	// 		}
	// 		if (transfer(creep, target)) return;
	// 	}
	// } else {
	// 	if (!creep.memory.full) {
	// 		const dropped = creep.room.memory.dropped.energy;
	// 		if (dropped.length > 0) {
	// 			target = creep.pos.findClosestByRange(dropped);
	// 			if (pickup(creep, target)) return;
	// 		}
	// 		target = creep.room.storage;
	// 		if (withdraw(creep, target)) return;
	// 	} else {
	// 		target = creep.room.memory.structures.needFill;
	// 		target = creep.pos.findClosestByRange(target);
	// 		if (transfer(creep, target)) return;
	// 		target = creep.room.memory.structures.tower.sort((a, b) => a.energy - b.energy)[0];
	// 		if (target && target.energy == target.energyCapacity) return;
	// 		if (transfer(creep, target)) return;
	// 	}
	// }
};

// if (creep.memory.full) {
// 	target = Game.getObjectById('58d758a13de0ed30b84fb81e')
// 	transfer(creep, target)
// } else {
// 	target = Game.getObjectById('58d6a0f58f53422d7fea1d52')
// 	withdraw(creep, target)
// }

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var memory = creep.room.memory;
	var target = void 0;
	// root
	(0, _util.isFull)(creep);
	//run
	(0, _util.targetMaker)(creep, memory.sources[0].source, 'harvest');

	var harvestTarget = Game.getObjectById(creep.memory.target.harvest.id);
	if (creep.memory.full) {
		var container = harvestTarget.pos.findInRange(creep.room.memory.structures.container, 1);
		if (container && container.length > 0 && container[0].hits < container[0].hitsMax / 2) {
			if ((0, _action.repair)(creep, container[0])) return;
		}
		var needBuild = creep.room.memory.structures.needBuild;
		if (needBuild.length > 0) {
			target = creep.pos.findInRange(needBuild, 0);
			if (target.length > 0 && (0, _action.build)(creep, target[0])) return;
		}
	}
	if ((0, _action.harvest)(creep, harvestTarget)) return;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (creep.memory.full) {
		target = creep.room.controller;
		if ((0, _action.upgradeController)(creep, target)) return;
	} else {
		target = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		if ((0, _action.withdraw)(creep, target)) return;
	}
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(59);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _upgrader = __webpack_require__(61);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(51);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(60);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(54);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farBuilder = __webpack_require__(55);

Object.defineProperty(exports, 'farBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farBuilder).default;
  }
});

var _farHarvester = __webpack_require__(56);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(57);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _farMinerSec = __webpack_require__(58);

Object.defineProperty(exports, 'farMinerSec', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMinerSec).default;
  }
});

var _claim = __webpack_require__(52);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

var _claimSec = __webpack_require__(53);

Object.defineProperty(exports, 'claimSec', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claimSec).default;
  }
});

var _attacker = __webpack_require__(50);

Object.defineProperty(exports, 'attacker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attacker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (spawn, config) {
	var target = spawn.pos.findInRange(spawn.room.memory.creeps.my.attacker, 1);
	if (target && target.length > 0) {
		console.log(spawn.recycleCreep(target[0]));
	}
	if (spawn.spawning) {
		var percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100),
		    text = [_util.emoji.build, spawn.spawning.name.split('#')[0], '(' + percent + '%)'].join(' ');
		console.log(text);
		spawn.room.visual.text(text, spawn.pos.x + 1, spawn.pos.y, {
			align: 'left',
			stroke: '#111111',
			color: '#ffffff'
		});
		return;
	}
	if ((0, _util.timer)(2)) {
		var roleFactory = config.role;
		var priority = false;
		roleFactory.forEach(function (roleType) {
			var roleName = roleType.role;
			var roleTimeout = roleType.timeout ? roleType.timeout : 10;
			var roleMy = _.filter(Memory.global.creeps[roleName], function (roleCreep) {
				return roleCreep.ticksToLive >= roleTimeout;
			});
			if (roleMy.length - roleType.number >= 0 || priority) return;
			var spawnName = buildName(roleName);
			spawn.createCreep(buildBody(roleType.body), spawnName, {
				role: roleName,
				name: spawnName,
				target: {}
			});
			console.log(_util.emoji.build, roleName, 'now:', roleMy.length, 'need:', roleType.number);
			priority = true;
		});
	}
};

function buildName(role) {
	var date = new Date();
	return [role, "#", date.getHours(), date.getMinutes(), date.getSeconds()].join('');
}

function buildBody(obj) {
	var array = [];
	for (var key in obj) {
		for (var num = 0; num < obj[key]; num++) {
			array.push(key);
		}
	}
	return array;
}

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(65);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(64);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

var _link = __webpack_require__(63);

Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_link).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 67 */
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
	    gclTimeLeft = Math.round(gclLeft / gclSpeed);
	Memory.timer['gcl'] = gcl.progress;

	var rcl = room.controller,
	    rclProcess = Math.round(rcl.progress / rcl.progressTotal * 100),
	    rclSpeed = Math.round((rcl.progress - Memory.timer['rcl']) / timeout),
	    rclLeft = rcl.progressTotal - rcl.progress,
	    rclTimeLeft = Math.round(rclLeft / rclSpeed);
	Memory.timer['rcl'] = rcl.progress;

	var gclLog = {
		header: ['Type', 'Lvl', 'Progress', 'EnergyLeft', 'Speed(e/t)', 'TickLeft'],
		body: [[_util.color.blue('GCL'), gcl.level, gclProcess + '%', gclLeft, gclSpeed, gclTimeLeft], [_util.color.orange('RCL'), rcl.level, rclProcess + '%', rclLeft, rclSpeed, rclTimeLeft]]
	};
	//
	var extension = room.memory.structures.extension;
	var extensionFull = 0;
	extension.forEach(function (ex) {
		if (ex.energy == ex.energyCapacity) extensionFull++;
	});
	var energyLog = {
		header: ['Storage', 'Spawn', 'Extension', 'CanUse', 'Creeps', 'Cpu', 'Bucket'],
		body: [[_util.color.yellow(room.memory.structures.storage.store.energy), room.memory.structures.spawn.energy, extensionFull + '/' + extension.length, extensionFull * 50 + room.memory.structures.spawn.energy, Object.keys(Memory.creeps).length, Math.floor(Game.cpu.getUsed()) + '/' + Game.cpu.limit, Game.cpu.bucket]]
	};

	console.log((0, _util.table)(gclLog), (0, _util.table)(energyLog));
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var trigger = function trigger() {
	isSafe('W81S66');
	isSafe('W82S67');
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
	if (!Memory.trigger[roomName]) return;
	if (Memory.trigger[roomName].safe && (!Game.rooms[roomName] || Game.rooms[roomName].memory.creeps.enemy.length > 0)) {
		Memory.trigger[roomName].safe = false;
		Memory.trigger[roomName].timeout = Game.time;
	}
	if (!Memory.trigger[roomName].safe) {
		if (Game.time - Memory.trigger[roomName].timeout > 1500) Memory.trigger[roomName].safe = true;
	}
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _manager = __webpack_require__(7);

var Manager = _interopRequireWildcard(_manager);

var _gui = __webpack_require__(6);

var Gui = _interopRequireWildcard(_gui);

var _util = __webpack_require__(0);

var _task = __webpack_require__(8);

var _screepsProfiler = __webpack_require__(5);

var _screepsProfiler2 = _interopRequireDefault(_screepsProfiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var rooms = ['W81S67', 'W81S66', 'W82S67'];
_screepsProfiler2.default.enable();
console.log('# Coding Update!');
_task.trigger.install();
module.exports.loop = function () {
	if (Game.cpuLimit > 100) {
		_screepsProfiler2.default.wrap(function () {
			(0, _task.trigger)();
			Manager.root();
			Manager.memory(rooms);
			Manager.global(rooms);
			Manager.role(rooms);
			Manager.structure(rooms);
			// Gui.creepBar(rooms[0])
			Gui.room(rooms[0]);
			Gui.role(rooms[0]);
		});
	}

	if ((0, _util.timer)(10)) (0, _task.log)(rooms[0], 10);
};

/***/ })
/******/ ]);