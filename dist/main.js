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
/******/ 	return __webpack_require__(__webpack_require__.s = 83);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/_util/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ui = __webpack_require__(/*! ./Ui */ 82);

Object.defineProperty(exports, 'Ui', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Ui).default;
  }
});

var _Console = __webpack_require__(/*! ./Console */ 71);

Object.defineProperty(exports, 'Console', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Console).default;
  }
});

var _Target = __webpack_require__(/*! ./Target */ 77);

Object.defineProperty(exports, 'Target', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Target).default;
  }
});

var _Is = __webpack_require__(/*! ./Is */ 75);

Object.defineProperty(exports, 'Is', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Is).default;
  }
});

var _Timer = __webpack_require__(/*! ./Timer */ 78);

Object.defineProperty(exports, 'Timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Timer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/Action/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moveTo = __webpack_require__(/*! ./creep/_moveTo */ 15);

Object.defineProperty(exports, "moveTo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moveTo).default;
  }
});

var _attack = __webpack_require__(/*! ./creep/_attack */ 10);

Object.defineProperty(exports, "attack", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _heal = __webpack_require__(/*! ./creep/_heal */ 14);

Object.defineProperty(exports, "heal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_heal).default;
  }
});

var _build = __webpack_require__(/*! ./creep/_build */ 11);

Object.defineProperty(exports, "build", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _repair = __webpack_require__(/*! ./creep/_repair */ 17);

Object.defineProperty(exports, "repair", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_repair).default;
  }
});

var _dismantle = __webpack_require__(/*! ./creep/_dismantle */ 12);

Object.defineProperty(exports, "dismantle", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

var _harvest = __webpack_require__(/*! ./creep/_harvest */ 13);

Object.defineProperty(exports, "harvest", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvest).default;
  }
});

var _pickup = __webpack_require__(/*! ./creep/_pickup */ 16);

Object.defineProperty(exports, "pickup", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pickup).default;
  }
});

var _transfer = __webpack_require__(/*! ./creep/_transfer */ 19);

Object.defineProperty(exports, "transfer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transfer).default;
  }
});

var _withdraw = __webpack_require__(/*! ./creep/_withdraw */ 21);

Object.defineProperty(exports, "withdraw", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withdraw).default;
  }
});

var _upgradeController = __webpack_require__(/*! ./creep/_upgradeController */ 20);

Object.defineProperty(exports, "upgradeController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgradeController).default;
  }
});

var _reserveController = __webpack_require__(/*! ./creep/_reserveController */ 18);

Object.defineProperty(exports, "reserveController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reserveController).default;
  }
});

var _findInRange = __webpack_require__(/*! ./room/_findInRange */ 24);

Object.defineProperty(exports, "findInRange", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findInRange).default;
  }
});

var _findClosestByRange = __webpack_require__(/*! ./room/_findClosestByRange */ 23);

Object.defineProperty(exports, "findClosestByRange", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findClosestByRange).default;
  }
});

var _createConstructionSite = __webpack_require__(/*! ./room/_createConstructionSite */ 22);

Object.defineProperty(exports, "createConstructionSite", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createConstructionSite).default;
  }
});

var _isEqualTo = __webpack_require__(/*! ./room/_isEqualTo */ 25);

Object.defineProperty(exports, "isEqualTo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isEqualTo).default;
  }
});

var _isNearTo = __webpack_require__(/*! ./room/_isNearTo */ 26);

Object.defineProperty(exports, "isNearTo", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isNearTo).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/Action/_action.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = __webpack_require__(/*! ./ */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (_ref) {
	var creep = _ref.creep,
	    target = _ref.target,
	    actionName = _ref.actionName,
	    fn = _ref.fn,
	    _ref$color = _ref.color,
	    color = _ref$color === undefined ? "#fff" : _ref$color;

	var emoji = _util.Ui.emoji[actionName] ? _util.Ui.emoji[actionName] : actionName;
	switch (fn) {
		case OK:
			if (actionName) creep.say(emoji);
			return true;
		case ERR_NOT_OWNER:
			creep.say(emoji + "OWNER");
			break;
		case ERR_NO_PATH:
			creep.say(emoji + "PATH");
			break;
		case ERR_NAME_EXISTS:
			creep.say(emoji + "NAME");
			break;
		case ERR_BUSY:
			creep.say(emoji + "BUSY");
			break;
		case ERR_NOT_FOUND:
			creep.say(_util.Ui.emoji.moveTo);
			(0, _.moveTo)(creep, target, color, false);
			return true;
		case ERR_NOT_ENOUGH_ENERGY:
			creep.say(emoji + "ENERGY");
			if (creep.memory.role == 'miner') (0, _.moveTo)(creep, target, color);
			return true;
		case ERR_NOT_ENOUGH_RESOURCES:
			creep.say(emoji + "RESOURCES");
			return true;
		case ERR_INVALID_TARGET:
			(0, _.moveTo)(creep, target, color);
			return true;
		case ERR_FULL:
			creep.say(emoji + "FULL");
			delete creep.memory.target.transfer;
			break;
		case ERR_NOT_IN_RANGE:
			(0, _.moveTo)(creep, target, color);
			return true;
		case ERR_INVALID_ARGS:
			creep.say(emoji + "ARGS");
			break;
		case ERR_TIRED:
			creep.say(emoji + "TIRED");
			break;
		case ERR_NO_BODYPART:
			creep.say(emoji + "BODYPART");
			break;
		case ERR_NOT_ENOUGH_EXTENSIONS:
			creep.say(emoji + "EXTENSIONS");
			break;
		case ERR_RCL_NOT_ENOUGH:
			creep.say(emoji + "RCL");
			break;
		case ERR_GCL_NOT_ENOUGH:
			creep.say(emoji + "GCL");
			break;
	}
	return false;
};

module.exports = exports['default'];

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	room: [['W81S67', 'W81S66'], ['W82S67', 'W82S68']],
	role: {
		// name: [body , num[main,extra], timeout]
		attacker: [{ tough: 10, attack: 6 }, [0, 1], 100],
		filler: [{ carry: 6 }, [2, 0], 10],
		miner: [{ work: 8, carry: 1 }, [1, 1], 10],
		transer: [{ carry: 16 }, [1, 2], 10],
		cleaner: [{ carry: 6 }, [1, 0], 10],
		builder: [{ work: 2, carry: 6 }, [1, 1], 10],
		upgrader: [{ work: 6, carry: 12 }, [2, 0], 10],
		claimer: [{ claim: 2 }, [0, 1], 50],
		traveller: [{ move: 1 }, [0, 0], 10]

	},
	friend: ["Ruo", "FanHua"],
	profiler: false,
	repair: {
		percent: 0.5,
		maxHits: 80000
	}
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/_util/Ui/_c.js ***!
  \****************************/
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
module.exports = exports['default'];

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/screeps-profiler/screeps-profiler.js ***!
  \************************************************/
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
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./src/flow.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.body = exports.init = undefined;

var _Setup = __webpack_require__(/*! ./Setup */ 54);

var _Setup2 = _interopRequireDefault(_Setup);

var _Root = __webpack_require__(/*! ./Root */ 50);

var _Root2 = _interopRequireDefault(_Root);

var _Rooms = __webpack_require__(/*! ./Rooms */ 48);

var _Rooms2 = _interopRequireDefault(_Rooms);

var _Flags = __webpack_require__(/*! ./Flags */ 37);

var _Flags2 = _interopRequireDefault(_Flags);

var _Tasks = __webpack_require__(/*! ./Tasks */ 70);

var _Tasks2 = _interopRequireDefault(_Tasks);

var _Roles = __webpack_require__(/*! ./Roles */ 41);

var _Roles2 = _interopRequireDefault(_Roles);

var _Creeps = __webpack_require__(/*! ./Creeps */ 35);

var _Creeps2 = _interopRequireDefault(_Creeps);

var _Structures = __webpack_require__(/*! ./Structures */ 59);

var _Structures2 = _interopRequireDefault(_Structures);

var _config = __webpack_require__(/*! ./config */ 3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
	(0, _Setup2.default)();
};
var body = function body() {
	(0, _Root2.default)();
	var room = _Root2.default.room(_config2.default.room);
	_.forEach(room, function (roomGroup) {
		(0, _Rooms2.default)(roomGroup);
		(0, _Flags2.default)(roomGroup);
		(0, _Tasks2.default)(roomGroup);
		(0, _Roles2.default)(roomGroup);
		(0, _Creeps2.default)(roomGroup);
		(0, _Structures2.default)(roomGroup);
	});
};

exports.init = init;
exports.body = body;

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./~/lodash/first.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./head */ 8);

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./~/lodash/head.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */
function head(array) {
  return array && array.length ? array[0] : undefined;
}

module.exports = head;

/***/ }),
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./~/lodash/isArray.js ***!
  \*****************************/
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
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/Action/creep/_attack.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'attack';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.red
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/Action/creep/_build.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'build';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.blue
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		// Console.error(actionName, creep, JSON.stringify(target))
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./src/Action/creep/_dismantle.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'dismantle';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.red
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./src/Action/creep/_harvest.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'harvest';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.yellow
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./src/Action/creep/_heal.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'heal';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.green
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/Action/creep/_moveTo.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _first2 = __webpack_require__(/*! lodash/first */ 7);

var _first3 = _interopRequireDefault(_first2);

var _isArray2 = __webpack_require__(/*! lodash/isArray */ 9);

var _isArray3 = _interopRequireDefault(_isArray2);

var _util = __webpack_require__(/*! ../../_util */ 0);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';
	var noPathFinding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	if (!target) return false;
	var actionName = 'moveTo';
	if (creep.fatigue > 0) return false;
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
	try {
		if ((0, _isArray3.default)(target)) target = (0, _first3.default)(target);
		if (target.pos.roomName != creep.pos.roomName) {
			target = new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName);
			opt.noPathFinding = false;
		}
		if (!target) return false;
		if ((0, _action2.default)({
			creep: creep,
			target: target,
			fn: creep[actionName](target, opt)
		})) {
			visual(target, creep);
			return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
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
module.exports = exports["default"];

/***/ }),
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/Action/creep/_pickup.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'pickup';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.orange
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/Action/creep/_repair.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'repair';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.blue
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./src/Action/creep/_reserveController.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'reserveController';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.blue
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/Action/creep/_transfer.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	var resType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RESOURCE_ENERGY;

	if (!target) return;
	var actionName = 'transfer';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		var opt = {
			creep: creep,
			target: target,
			actionName: actionName,
			color: _util.Ui.c.purple
		};
		if (all) {
			_.forEach(creep.carry, function (n, type) {
				opt.fn = creep[actionName](target, type);
				if (target && (0, _action2.default)(opt)) {
					return true;
				} else {
					if ((0, _Action.moveTo)(creep, target)) return true;
				}
			});
		} else {
			opt.fn = creep[actionName](target, resType);
			if (target && (0, _action2.default)(opt)) {
				return true;
			} else {
				if ((0, _Action.moveTo)(creep, target)) return true;
			}
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./src/Action/creep/_upgradeController.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var check = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	if (!check || !target) return;
	var actionName = 'upgradeController';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		if (target && (0, _action2.default)({
			creep: creep,
			target: target,
			actionName: actionName,
			fn: creep[actionName](target),
			color: _util.Ui.c.blue
		})) {
			return true;
		} else {
			if ((0, _Action.moveTo)(creep, target)) return true;
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/Action/creep/_withdraw.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

var _Action = __webpack_require__(/*! ../../Action */ 1);

var _action = __webpack_require__(/*! ../_action */ 2);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep, target) {
	var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	var resType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RESOURCE_ENERGY;

	if (!target) return;
	var actionName = 'withdraw';
	try {
		target = _util.Target.format(creep, target);
		if (!target) return false;
		var opt = {
			creep: creep,
			target: target,
			actionName: actionName,
			color: _util.Ui.c.orange
		};
		if (all) {
			_.forEach(target.store, function (n, type) {
				opt.fn = creep[actionName](target, type);
				if (target && (0, _action2.default)(opt)) {
					return true;
				} else {
					if ((0, _Action.moveTo)(creep, target)) return true;
				}
			});
		} else {
			opt.fn = creep[actionName](target, resType);
			if (target && (0, _action2.default)(opt)) {
				return true;
			} else {
				if ((0, _Action.moveTo)(creep, target)) return true;
			}
		}
	} catch (e) {
		_util.Console.error(actionName, creep, JSON.stringify(target));
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/Action/room/_createConstructionSite.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

exports.default = function (creep, type) {
	try {
		if (creep.room.createConstructionSite(creep.pos, type)) return true;
	} catch (e) {
		_util.Console.error('createConstructionSite', e, creep, type);
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./src/Action/room/_findClosestByRange.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

exports.default = function (creep, array, opt) {
	try {
		var found = creep.pos.findClosestByRange(array);
		if (opt) found = _.filter(found, opt);
		return found;
	} catch (e) {
		_util.Console.error('findClosestByRange', e, creep, array, opt);
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/Action/room/_findInRange.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

exports.default = function (creep, array) {
	var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var opt = arguments[3];

	try {
		var found = creep.pos.findInRange(array, range);
		if (opt) found = _.filter(found, opt);
		return found;
	} catch (e) {
		_util.Console.error('findInRange', e, creep, array, opt);
		return false;
	}
};

module.exports = exports["default"];

/***/ }),
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/Action/room/_isEqualTo.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

exports.default = function (creep, target) {
	try {
		target = _util.Target.format(creep, target);
		return creep.pos.isEqualTo(target.pos);
	} catch (e) {
		_util.Console.error('isEqualTo', e, creep, target);
		return false;
	}
};

module.exports = exports['default'];

/***/ }),
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./src/Action/room/_isNearTo.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../../_util */ 0);

exports.default = function (creep, target) {
	try {
		target = _util.Target.format(creep, target);
		return creep.pos.isNearTo(target.pos);
	} catch (e) {
		_util.Console.error('isNearTo', e, creep, target);
		return false;
	}
};

module.exports = exports['default'];

/***/ }),
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Creeps/_attacker.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

exports.default = function (creep) {
	// target
	var attackTarget = void 0;
	if (creep.room.name !== creep.memory.roomName) {
		attackTarget = Memory.tasks[creep.memory.roomName].attack[0];
		if ((0, _Action.moveTo)(creep, attackTarget)) return;
	} else {
		attackTarget = (0, _Action.findClosestByRange)(creep, Memory.tasks[creep.memory.roomName].attack);
	}
	if ((0, _Action.attack)(creep, attackTarget)) return;
};

module.exports = exports['default'];

/***/ }),
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Creeps/_builder.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	// target
	var builderTarget = Memory.tasks[roonName].build;
	if (isFull) {
		if (creep.carry.energy == 0) (0, _Action.transfer)(creep, creep.room.storage);

		if (creep.room.name !== creep.memory.roomName) {
			var target = Memory.tasks[creep.memory.roomName].build[0];
			if (!target) target = Memory.tasks[creep.memory.roomName].repair[0];
			if ((0, _Action.moveTo)(creep, target)) return;
		}

		if ((0, _Action.build)(creep, builderTarget)) return;
		if (creep.room.memory.structures.my.tower.length > 0) {
			if ((0, _Action.repair)(creep, (0, _Action.findInRange)(creep, Memory.tasks[roonName].repair, 4))) return;
		} else {
			if ((0, _Action.repair)(creep, Memory.tasks[roonName].repair)) return;
		}
		if ((0, _Action.upgradeController)(creep, Memory.tasks[roonName].upgrade)) return;
	} else {
		if (creep.room.name == creep.memory.roomName && creep.memory.roomType == "extra") {
			if ((0, _Action.withdraw)(creep, Memory.tasks[roonName].withdraw, false)) return;
		}
		var storage = Game.rooms[creep.memory.bornRoom].storage;
		if (storage && storage.store.energy > 0) {
			if ((0, _Action.withdraw)(creep, storage, false)) return;
		} else {
			if ((0, _Action.withdraw)(creep, Memory.tasks[roonName].withdraw, false)) return;
		}
	}
};

module.exports = exports['default'];

/***/ }),
/* 29 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Creeps/_claimer.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

exports.default = function (creep) {
	// target

	if (!Memory.rooms[creep.memory.roomName] || creep.room.name !== creep.memory.roomName) {
		if (creep.moveTo(new RoomPosition(25, 25, creep.memory.roomName)) == OK) return;
	}

	if ((0, _Action.reserveController)(creep, creep.room.controller)) return;
};

module.exports = exports['default'];

/***/ }),
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Creeps/_cleaner.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	//
	var pickTarget = Memory.tasks[roonName].pickup;
	var storage = Game.rooms[creep.memory.bornRoom].storage;
	// run
	if (isFull) {
		if (!storage) {
			if ((0, _Action.transfer)(creep, Memory.tasks[roonName].transfer)) return;
		} else {
			if ((0, _Action.transfer)(creep, storage)) return;
		}
	} else {
		if (creep.room.name !== creep.memory.roomName) {
			pickTarget = Memory.tasks[creep.memory.roomName].pickup[0];
			if ((0, _Action.moveTo)(creep, pickTarget)) return;
		}
		var target = _.filter(Memory.tasks[creep.memory.roomName].withdraw, function (t) {
			return t.store.energy == 0;
		});
		if (target && (0, _Action.withdraw)(creep, target)) return;
		if ((0, _Action.pickup)(creep, pickTarget)) return;
	}
	if (_.sum(creep.carry) > 0 && (0, _Action.transfer)(creep, storage)) return;
};

module.exports = exports['default'];

/***/ }),
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/Creeps/_filler.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	// target
	var transferTarget = creep.memory.target.transfer;
	var storage = creep.room.storage;
	// run
	if (isFull) {
		if (creep.carry.energy == 0) (0, _Action.transfer)(creep, storage);
		var terminal = creep.room.memory.structures.my.terminal;
		if (terminal.length > 0 && _.sum(terminal[0].store) < 10000) {
			if ((0, _Action.transfer)(creep, terminal[0], false)) return;
		}
		if (transferTarget && transferTarget.energy < transferTarget.energyCapacity) {
			if ((0, _Action.transfer)(creep, transferTarget, false)) return;
		}
		if ((0, _Action.transfer)(creep, storage)) return;
	} else {
		try {
			var link = Game.getObjectById(Memory.flags[creep.room.name].link.id);
			if (link.energy > 0 && (0, _Action.withdraw)(creep, link, false)) return;
		} catch (e) {}
		if ((0, _Action.pickup)(creep, (0, _Action.findInRange)(creep, Memory.tasks[roonName].pickup, 4))) return;
		if (transferTarget && storage && storage.store.energy > 0) {
			if ((0, _Action.withdraw)(creep, storage, false)) return;
		} else {
			if ((0, _Action.withdraw)(creep, _.filter(Memory.tasks[roonName].withdraw, function (t) {
				return t.id !== '58e269c771190d4029847ab7';
			}), false)) return;
		}
	}
};

module.exports = exports['default'];

/***/ }),
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Creeps/_miner.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	var harvestTarget = creep.memory.target.harvest;
	// run
	if (creep.room.name !== creep.memory.roomName) {
		harvestTarget = Memory.tasks[creep.memory.roomName].harvest[0];
		if ((0, _Action.moveTo)(creep, harvestTarget)) return;
	}
	if (isFull) {
		var link = (0, _Action.findInRange)(creep, Memory.rooms[roonName].structures.my.link, 3);
		if (link.length > 0) {
			if ((0, _Action.transfer)(creep, link)) return;
		}
		var buildContainer = (0, _Action.findInRange)(creep, Memory.tasks[roonName].build, 0)[0];
		if (buildContainer && (0, _Action.build)(creep, buildContainer) && creep.carry.energy > 0) return;
		var container = (0, _Action.findInRange)(creep, Memory.rooms[roonName].structures.my.container, 2)[0];
		if (!(0, _Action.isNearTo)(creep, harvestTarget)) {
			(0, _Action.moveTo)(creep, harvestTarget);
		} else {
			if (container && !(0, _Action.isEqualTo)(creep, container) && (0, _Action.moveTo)(creep, container)) return;
			if (container && container.hits < container.hitsMax && creep.carry.energy > 0) {
				(0, _Action.repair)(creep, container);
			}
		}
	}
	if ((0, _Action.harvest)(creep, harvestTarget)) return;
};

module.exports = exports['default'];

/***/ }),
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Creeps/_transer.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	// target
	var withdrawTarget = creep.memory.target.withdraw;
	// run
	var storage = Game.rooms[creep.memory.bornRoom].storage;
	if (isFull) {
		if (creep.memory.roomType == 'extra' && creep.room.name == creep.memory.bornRoom) {
			var link = (0, _Action.findInRange)(creep, creep.room.memory.structures.my.link, 3);
			if (link.length > 0) {
				if ((0, _Action.transfer)(creep, link)) return;
			}
		}
		if (creep.memory.roomType == 'extra') {
			if ((0, _Action.moveTo)(creep, storage) && (0, _Action.transfer)(creep, storage)) return;
		}
		if (!storage) {
			if ((0, _Action.transfer)(creep, Memory.tasks[roonName].transfer)) return;
		} else {
			if ((0, _Action.transfer)(creep, storage)) return;
		}
	} else {
		if (creep.room.name !== creep.memory.roomName) {
			withdrawTarget = Memory.tasks[creep.memory.roomName].withdraw[0];
			if ((0, _Action.moveTo)(creep, withdrawTarget)) return;
		}
		if ((0, _Action.pickup)(creep, (0, _Action.findInRange)(creep, Memory.tasks[roonName].pickup, 4))) return;
		if ((0, _Action.withdraw)(creep, withdrawTarget)) return;
	}
};

module.exports = exports['default'];

/***/ }),
/* 34 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Creeps/_upgrader.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (creep) {
	var roonName = creep.memory.roomName;
	var isFull = _util.Is.full(creep);
	// run
	if (isFull) {
		if (creep.carry.energy == 0) (0, _Action.transfer)(creep, creep.room.storage);
		if ((0, _Action.upgradeController)(creep, Memory.tasks[roonName].upgrade)) return;
	} else {
		if ((0, _Action.pickup)(creep, (0, _Action.findInRange)(creep, Memory.tasks[roonName].pickup, 4))) return;
		var withdrawTarget = _.filter([].concat(Memory.tasks[roonName].withdraw, [creep.room.storage]), function (t) {
			return t.store.energy > 0;
		});
		if ((0, _Action.withdraw)(creep, (0, _Action.findClosestByRange)(creep, withdrawTarget), false)) return;
	}
	if ((0, _Action.upgradeController)(creep, Memory.tasks[roonName].upgrade)) return;
};

module.exports = exports['default'];

/***/ }),
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/Creeps/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _miner = __webpack_require__(/*! ./_miner */ 32);

var _miner2 = _interopRequireDefault(_miner);

var _transer = __webpack_require__(/*! ./_transer */ 33);

var _transer2 = _interopRequireDefault(_transer);

var _upgrader = __webpack_require__(/*! ./_upgrader */ 34);

var _upgrader2 = _interopRequireDefault(_upgrader);

var _cleaner = __webpack_require__(/*! ./_cleaner */ 30);

var _cleaner2 = _interopRequireDefault(_cleaner);

var _builder = __webpack_require__(/*! ./_builder */ 28);

var _builder2 = _interopRequireDefault(_builder);

var _filler = __webpack_require__(/*! ./_filler */ 31);

var _filler2 = _interopRequireDefault(_filler);

var _claimer = __webpack_require__(/*! ./_claimer */ 29);

var _claimer2 = _interopRequireDefault(_claimer);

var _attacker = __webpack_require__(/*! ./_attacker */ 27);

var _attacker2 = _interopRequireDefault(_attacker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var roomGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	_.forEach(roomGroup, function (roomName) {
		var creep = Memory.rooms[roomName].creeps.my;
		_.forEach(creep.miner, function (c) {
			return (0, _miner2.default)(c);
		});
		_.forEach(creep.transer, function (c) {
			return (0, _transer2.default)(c);
		});
		if (Memory.tasks[roomName].pickup.length > 0) {
			_.forEach(creep.cleaner, function (c) {
				return (0, _cleaner2.default)(c);
			});
		} else {
			_.forEach(creep.cleaner, function (c) {
				return (0, _filler2.default)(c);
			});
		}
		_.forEach(creep.upgrader, function (c) {
			return (0, _upgrader2.default)(c);
		});
		_.forEach(creep.builder, function (c) {
			return (0, _builder2.default)(c);
		});
		_.forEach(creep.filler, function (c) {
			return (0, _filler2.default)(c);
		});
		_.forEach(creep.claimer, function (c) {
			return (0, _claimer2.default)(c);
		});
		_.forEach(creep.attacker, function (c) {
			return (0, _attacker2.default)(c);
		});
	});
};

module.exports = exports['default'];

/***/ }),
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/Flags/_command.js ***!
  \*******************************/
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

module.exports = exports['default'];

/***/ }),
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Flags/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _command = __webpack_require__(/*! ./_command */ 36);

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (roomGroup) {
	if (!Memory.flags) Memory.flags = {};
	_.forEach(roomGroup, function (roomName) {
		var flagsRaw = Memory.rooms[roomName].flags.all;
		var flagsMemory = {};
		_.forEach(flagsRaw, function (flagRaw) {
			var flag = (0, _command2.default)(flagRaw),
			    command = flag.command,
			    commandContent = flag.commandContent;
			flagsMemory[command] = {
				id: commandContent,
				pos: flagRaw.pos
			};
		});
		Memory.flags[roomName] = flagsMemory;
	});
};

module.exports = exports['default'];

/***/ }),
/* 38 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Roles/_body.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _part = __webpack_require__(/*! ./_part */ 40);

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = function () {
	var partData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var energy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var cost = 0,
	    body = (0, _part2.default)(partData);
	_.forEach(body, function (part) {
		cost += partCost[part];
	});
	while (cost > energy) {
		cost = 0, _.forEach(partData, function (mumber, part) {
			if (mumber > 1) partData[part]--;
		});
		body = (0, _part2.default)(partData);
		_.forEach(body, function (part) {
			cost += partCost[part];
		});
	}

	return {
		body: body,
		cost: cost
	};
};

module.exports = exports["default"];

/***/ }),
/* 39 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Roles/_number.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var roomName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	var roomType = arguments[3];

	try {
		var room = Memory.rooms[roomName],
		    task = Memory.tasks[roomName];
		if (roomType == "main") {
			switch (role) {
				case 'filler':
					number = room.structures.my.storage.length > 0 ? number : 0;
					break;
				case 'cleaner':
					number = task.pickup.length > 0 ? number : 0;
					break;
				case 'transer':
					var miner = task.harvest.length,
					    link = room.structures.my.link.length;
					if (link > 0) {
						number = number * (miner - link + 1);
					} else {
						number = number * miner;
					}
					break;
				case 'miner':
					number = task.harvest.length * number;
					break;
				case 'builder':
					number = Math.ceil(task.build.length / 4);
					number = number > 4 ? 4 : number;
			}
		} else {
			var claimer = room.creeps.my.claimer.length;
			switch (role) {
				// case 'claimer':
				// 	break
				case 'attacker':
					number = task.attack.length * number;
					break;
				case 'miner':
					number = claimer > 0 ? task.harvest.length * number : 0;
					break;
				case 'transer':
					if (task.withdraw.length > 0) {
						var _miner = task.harvest.length;
						number = claimer > 0 ? number * _miner : 0;
					} else {
						number = 0;
					}
					break;
				case 'builder':
					number = claimer > 0 && (task.build.length > 0 || task.repair.length > 0) ? number : 0;
					break;
			}
		}
	} catch (e) {
		number = 0;
	}
	return number > 0 ? number : 0;
};

module.exports = exports["default"];

/***/ }),
/* 40 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Roles/_part.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

exports.default = function () {
	var partData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var move = void 0,
	    tough = [],
	    bodyArray = [];
	if (partData.tough) {
		tough = _.fill(Array(partData.tough), 'tough');
		delete partData.tough;
	}
	var moveRaw = partData.move;
	delete partData.move;
	move = Math.floor(_.sum(partData) / 2);
	move = move > moveRaw ? moveRaw : move;
	move = move > 0 ? move : 1;
	_.forEach(partData, function (n, key) {
		return bodyArray.push(_.fill(Array(n), key));
	});
	bodyArray = _.sortBy(bodyArray, function (n) {
		return partProprity[n[0]];
	});
	if (partData.tough) bodyArray.unshift(tough);
	bodyArray = _.compact(_.flattenDeep(bodyArray));
	bodyArray = [].concat(tough, bodyArray);
	bodyArray = _.chunk(bodyArray, 2);
	for (var i = move; i > 0; i--) {
		bodyArray[i] = _.flatten([bodyArray[i], 'move']);
	}
	bodyArray = _.compact(_.flattenDeep(bodyArray));

	return bodyArray;
};

module.exports = exports["default"];

/***/ }),
/* 41 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Roles/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(/*! ../config */ 3);

var _config2 = _interopRequireDefault(_config);

var _body = __webpack_require__(/*! ./_body */ 38);

var _body2 = _interopRequireDefault(_body);

var _number = __webpack_require__(/*! ./_number */ 39);

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// name: [body , num[main,extra], time]
exports.default = function () {
	var roomGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	if (!Memory.roles) Memory.roles = {};

	var energy = Game.rooms[roomGroup[0]].energyCapacityAvailable;
	var i = 0,
	    prioprity = 0,
	    roomRoles = {};
	_.forEach(roomGroup, function (roomName) {
		_.forEach(_config2.default.role, function (array, key) {
			var roomType = i == 0 ? "main" : "extra";
			var number = (0, _number2.default)(key, i > 0 ? array[1][1] : array[1][0], roomName, roomType);
			if (number == 0) return;
			var body = (0, _body2.default)(array[0], energy),
			    name = i > 0 ? key + '-' + roomName : key;
			roomRoles[name] = {
				role: key,
				roomName: roomName,
				roomType: roomType,
				body: body.body,
				cost: body.cost,
				number: number,
				timeout: i > 0 ? array[2] + 100 : array[2],
				prioprity: prioprity
			};
			prioprity++;
		});
		i++;
	});
	Memory.roles[roomGroup[0]] = roomRoles;
};

module.exports = exports['default'];

/***/ }),
/* 42 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/Rooms/_constructionSites.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (data) {
	var all = [].concat(data);
	return {
		all: all
	};
};

module.exports = exports["default"];

/***/ }),
/* 43 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Rooms/_creeps.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../_util */ 0);

var _config = __webpack_require__(/*! ../config */ 3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildCreeps = function buildCreeps(data) {
	var creeps = { all: [].concat(data) };
	_.forEach(_config2.default.role, function (role, roleName) {
		creeps[roleName] = _.remove(data, function (c) {
			return c.memory.role == roleName;
		});
	});
	return creeps;
};

exports.default = function (data) {
	var creepsMy = _.remove(data, function (c) {
		return c.my;
	}),
	    creepsFriendly = _.remove(data, function (c) {
		return _util.Is.firendly(c.owner);
	}),
	    creepsHostile = data;
	return {
		my: buildCreeps(creepsMy),
		friendly: creepsFriendly,
		hostile: creepsHostile
	};
};

module.exports = exports['default'];

/***/ }),
/* 44 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/Rooms/_drops.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (data) {
	var all = [].concat(data);
	var energy = _.remove(data, function (d) {
		return d.resourceType == RESOURCE_ENERGY;
	}),
	    mineral = data;

	return {
		all: all,
		energy: energy,
		mineral: mineral
	};
};

module.exports = exports["default"];

/***/ }),
/* 45 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/Rooms/_flags.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (data) {
	var all = [].concat(data);
	return {
		all: all
	};
};

module.exports = exports["default"];

/***/ }),
/* 46 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Rooms/_resources.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (source, mineral) {
	return {
		all: source.concat(mineral),
		source: source,
		mineral: mineral
	};
};

module.exports = exports["default"];

/***/ }),
/* 47 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/Rooms/_structures.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../_util */ 0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildStructures = function buildStructures() {
	var _ref;

	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var all = [].concat(data);
	var container = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_CONTAINER;
	}),
	    controller = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_CONTROLLER;
	}),
	    extension = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_EXTENSION;
	}),
	    extractor = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_EXTRACTOR;
	}),
	    keeperLair = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_KEEPER_LAIR;
	}),
	    lab = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_LAB;
	}),
	    link = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_LINK;
	}),
	    nuker = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_NUKER;
	}),
	    observer = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_OBSERVER;
	}),
	    powerBank = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_POWER_BANK;
	}),
	    powerSpawn = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_POWER_SPAWN;
	}),
	    portal = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_PORTAL;
	}),
	    rampart = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_RAMPART;
	}),
	    road = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_ROAD;
	}),
	    spawn = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_SPAWN;
	}),
	    storage = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_STORAGE;
	}),
	    terminal = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_TERMINAL;
	}),
	    tower = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_TOWER;
	}),
	    wall = _.remove(data, function (s) {
		return s.structureType == STRUCTURE_WALL;
	});

	return _ref = {
		all: all,
		container: container,
		controller: controller,
		extension: extension,
		extractor: extractor
	}, _defineProperty(_ref, 'container', container), _defineProperty(_ref, 'keeperLair', keeperLair), _defineProperty(_ref, 'lab', lab), _defineProperty(_ref, 'link', link), _defineProperty(_ref, 'nuker', nuker), _defineProperty(_ref, 'observer', observer), _defineProperty(_ref, 'powerBank', powerBank), _defineProperty(_ref, 'powerSpawn', powerSpawn), _defineProperty(_ref, 'portal', portal), _defineProperty(_ref, 'rampart', rampart), _defineProperty(_ref, 'road', road), _defineProperty(_ref, 'spawn', spawn), _defineProperty(_ref, 'storage', storage), _defineProperty(_ref, 'terminal', terminal), _defineProperty(_ref, 'tower', tower), _defineProperty(_ref, 'wall', wall), _ref;
};

exports.default = function () {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var structuresMy = _.remove(data, function (s) {
		return s.my || s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_CONTAINER;
	}),
	    structuresFriendly = _.remove(data, function (s) {
		return _util.Is.firendly(s.owner);
	}),
	    structuresHostile = data;
	return {
		my: buildStructures(structuresMy),
		friendly: buildStructures(structuresFriendly),
		hostile: buildStructures(structuresHostile)
	};
};

module.exports = exports['default'];

/***/ }),
/* 48 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Rooms/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _structures = __webpack_require__(/*! ./_structures */ 47);

var _structures2 = _interopRequireDefault(_structures);

var _constructionSites = __webpack_require__(/*! ./_constructionSites */ 42);

var _constructionSites2 = _interopRequireDefault(_constructionSites);

var _flags = __webpack_require__(/*! ./_flags */ 45);

var _flags2 = _interopRequireDefault(_flags);

var _resources = __webpack_require__(/*! ./_resources */ 46);

var _resources2 = _interopRequireDefault(_resources);

var _creeps = __webpack_require__(/*! ./_creeps */ 43);

var _creeps2 = _interopRequireDefault(_creeps);

var _drops = __webpack_require__(/*! ./_drops */ 44);

var _drops2 = _interopRequireDefault(_drops);

var _util = __webpack_require__(/*! ../_util */ 0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildRoom = function buildRoom(room, type, extra) {
	var gameRoom = Game.rooms[room];
	return {
		name: gameRoom.name,
		type: type,
		extra: extra,
		mode: gameRoom.mode,
		rcl: gameRoom.controller.level,
		energyAvailable: gameRoom.energyAvailable,
		energyCapacityAvailable: gameRoom.energyCapacityAvailable,
		structures: (0, _structures2.default)(gameRoom.find(FIND_STRUCTURES)),
		constructionSites: (0, _constructionSites2.default)(gameRoom.find(FIND_MY_CONSTRUCTION_SITES)),
		flags: (0, _flags2.default)(gameRoom.find(FIND_FLAGS)),
		resources: (0, _resources2.default)(gameRoom.find(FIND_SOURCES), gameRoom.find(FIND_MINERALS)),
		creeps: (0, _creeps2.default)(gameRoom.find(FIND_CREEPS)),
		drops: (0, _drops2.default)(gameRoom.find(FIND_DROPPED_RESOURCES))
	};
};

exports.default = function (roomGroup) {
	var i = void 0;
	if (!Memory.rooms) Memory.rooms = {};

	_.forEach(roomGroup, function (room) {
		var type = i > 0 ? 'extra' : 'main',
		    extra = _.drop(roomGroup);
		Memory.rooms[room] = buildRoom(room, type, extra);
		i++;
	});
};

module.exports = exports["default"];

/***/ }),
/* 49 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./src/Root/_cleanCreepsMemory.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function () {
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			_util.Console.warn('Creeps', 'Goodbye', name, '!');
		}
	}
};

module.exports = exports['default'];

/***/ }),
/* 50 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./src/Root/index.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cleanCreepsMemory = __webpack_require__(/*! ./_cleanCreepsMemory */ 49);

var _cleanCreepsMemory2 = _interopRequireDefault(_cleanCreepsMemory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = function root() {
	(0, _cleanCreepsMemory2.default)();
};

root.room = function (rooms) {
	_.forEach(rooms, function (roomGroup) {
		for (var name in roomGroup) {
			if (!Game.rooms[roomGroup[name]]) {
				var roomMain = Memory.rooms[roomGroup[0]],
				    roomName = roomGroup[name];
				if (roomMain.creeps.my.claimer.length < 1) {
					var spawn = Game.getObjectById(roomMain.structures.my.spawn[0].id),
					    spawnName = 'claimer-' + roomName;
					spawn.createCreep([CLAIM, CLAIM, MOVE], spawnName, {
						bornRoom: roomGroup[0],
						bornTime: Game.time,
						roomName: roomName,
						roomType: 'extra',
						role: 'claimer',
						name: spawnName,
						target: {}
					});
				}
				roomGroup.pop();
			}
		}
	});
	return rooms;
};

exports.default = root;
module.exports = exports['default'];

/***/ }),
/* 51 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Setup/_buildRoad.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var room = Game.spawns['Spawn1'].room;
	var targetArray = [].concat(room.find(FIND_SOURCES), room.controller);
	_.forEach(targetArray, function (target) {
		return buildRoad(target);
	});
};

function buildRoad(target) {
	var room = Game.spawns['Spawn1'].room;
	var pathArray = PathFinder.search(Game.spawns['Spawn1'].pos, target.pos, {
		plainCost: 1,
		swampCost: 1,
		maxRooms: 1,
		heuristicWeight: 100
	});
	_.forEach(pathArray.path, function (path) {
		room.createConstructionSite(path.x, path.y, STRUCTURE_ROAD);
	});
}
module.exports = exports['default'];

/***/ }),
/* 52 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/Setup/_optimizePathFinding.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	function roomPositionIdentifier(roomPosition) {
		return roomPosition.roomName + 'x' + roomPosition.x + 'y' + roomPosition.y;
	};

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
};

module.exports = exports['default'];

/***/ }),
/* 53 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./src/Setup/_speedUpArrayFunctions.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
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
};

module.exports = exports["default"];

/***/ }),
/* 54 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Setup/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _buildRoad = __webpack_require__(/*! ./_buildRoad */ 51);

var _buildRoad2 = _interopRequireDefault(_buildRoad);

var _speedUpArrayFunctions = __webpack_require__(/*! ../Setup/_speedUpArrayFunctions */ 53);

var _speedUpArrayFunctions2 = _interopRequireDefault(_speedUpArrayFunctions);

var _optimizePathFinding = __webpack_require__(/*! ../Setup/_optimizePathFinding */ 52);

var _optimizePathFinding2 = _interopRequireDefault(_optimizePathFinding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	// buildRoad()
	(0, _speedUpArrayFunctions2.default)();
	// optimizePathFinding()
};

module.exports = exports['default'];

/***/ }),
/* 55 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Structures/_link.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (link) {
	var linkMain = Memory.flags[link.room.name].link.id;
	if (link.id == linkMain || link.cooldown > 0 || link.energy < link.energyCapacity) return;
	var target = Game.getObjectById(linkMain);
	if (target.energy == 0) link.transferEnergy(target);
};

module.exports = exports["default"];

/***/ }),
/* 56 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/Structures/_spawn.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(/*! ../_util */ 0);

var spawnUi = function spawnUi(spawn) {
	var percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100),
	    text = [_util.Ui.emoji.build, spawn.spawning.name.split('-')[0], '(' + percent + '%)'].join(' ');
	console.log(text);
	spawn.room.visual.text(text, spawn.pos.x + 1, spawn.pos.y, {
		align: 'left',
		stroke: '#111111',
		color: '#ffffff',
		font: 0.5
	});
	return true;
};

exports.default = function (spawn) {
	var roomName = spawn.room.name;
	if (spawn.spawning && spawnUi(spawn)) return;

	var energy = Memory.rooms[roomName].energyAvailable;
	var roleData = Memory.roles[roomName];

	var _loop = function _loop(i) {
		var roleName = roleData[i].role,
		    roleTimeout = roleData[i].timeout ? roleData[i].timeout : 10,
		    roleNumber = roleData[i].number,
		    roleNumberNow = _.filter(Game.creeps, function (c) {
			return c.memory.role == roleData[i].role && c.memory.roomName == roleData[i].roomName && c.memory.roomType == roleData[i].roomType && c.ticksToLive >= roleTimeout;
		}).length;

		if (roleNumberNow - roleNumber >= 0) return 'continue';
		if (roleData[i].cost > energy) {
			_util.Console.note(i, 'Now:' + roleNumberNow, 'Need:' + roleNumber, 'Cost:' + roleData[i].cost, 'Availabl:' + energy);
			return {
				v: void 0
			};
		}
		var spawnTime = Game.time,
		    spawnName = i + '-' + spawnTime.toString().substr(spawnTime.toString().length - 3, 3);
		if (spawn.createCreep(roleData[i].body, spawnName, {
			bornRoom: spawn.room.name,
			bornTime: spawnTime,
			roomName: roleData[i].roomName,
			roomType: roleData[i].roomType,
			role: roleName,
			name: spawnName,
			target: {}
		}) == OK) return {
				v: void 0
			};
	};

	for (var i in roleData) {
		var _ret = _loop(i);

		switch (_ret) {
			case 'continue':
				continue;

			default:
				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
	}
};

module.exports = exports['default'];

/***/ }),
/* 57 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/Structures/_terminal.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (terminal) {
	// let price  = 0.03,
	//     amount = 10000;
	// if (terminal.store.energy < 10000) return
	// if (_.isEmpty(Game.market.orders)) {
	// 	console.log(amount*pirce)
	// 	console.log(Game.market.createOrder(ORDER_SELL, RESOURCE_ENERGY, price, amount))
	// }
	var room = "W81S67";
	var orders = Game.market.getAllOrders({ type: ORDER_BUY, resourceType: RESOURCE_ENERGY });
	var orderFee = [];
	_.forEach(orders, function (order) {
		var pay = order.price * 1000,
		    fee = Game.market.calcTransactionCost(1000, room, order.roomName),
		    cost = pay - fee;
		if (fee > -1500) {
			_util.Console.succeed('Market', 'Pay: ' + pay + '(' + order.price + ')', 'Fee: ' + fee);
		}
	});
};

module.exports = exports['default'];

/***/ }),
/* 58 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/Structures/_tower.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(/*! ../_util */ 0);

exports.default = function (tower) {
	var tasklist = Memory.tasks[tower.room.name];
	if (tasklist.attack.length > 0) {
		tower.attack(_util.Target.format(tower, tasklist.attack));
	} else if (tasklist.repair.length > 0) {
		tower.repair(_util.Target.format(tower, tasklist.repair));
	}
};

module.exports = exports['default'];

/***/ }),
/* 59 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Structures/index.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _spawn = __webpack_require__(/*! ./_spawn */ 56);

var _spawn2 = _interopRequireDefault(_spawn);

var _tower = __webpack_require__(/*! ./_tower */ 58);

var _tower2 = _interopRequireDefault(_tower);

var _link = __webpack_require__(/*! ./_link */ 55);

var _link2 = _interopRequireDefault(_link);

var _terminal = __webpack_require__(/*! ./_terminal */ 57);

var _terminal2 = _interopRequireDefault(_terminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var roomGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var structures = Memory.rooms[roomGroup[0]].structures.my;
	_.forEach(structures.spawn, function (s) {
		return (0, _spawn2.default)(s);
	});
	_.forEach(structures.tower, function (s) {
		return (0, _tower2.default)(s);
	});
	_.forEach(structures.link, function (s) {
		return (0, _link2.default)(s);
	});
	_.forEach(structures.terminal, function (s) {
		return (0, _terminal2.default)(s);
	});
};

module.exports = exports['default'];

/***/ }),
/* 60 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Tasks/_attack.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {
	var tasklist = room.creeps.hostile;
	return _.sortByOrder(tasklist, ['hits'], ['asc']);
};

module.exports = exports['default'];

/***/ }),
/* 61 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/Tasks/_build.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {
	return room.constructionSites.all;
};

module.exports = exports["default"];

/***/ }),
/* 62 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/Tasks/_dismantle.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (room) {};

module.exports = exports["default"];

/***/ }),
/* 63 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/Tasks/_harvest.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

exports.default = function (room) {
	var tasklist = [];
	if (room.structures.my.extractor.length > 0) {
		tasklist = room.resources.all;
	} else {
		tasklist = room.resources.source;
	}
	_.filter(tasklist, function (r) {
		return r.energy && r.energy > 0 || r.mineralAmount && r.mineralAmount > 0;
	});

	var miners = [].concat(room.creeps.my.miner);
	// miners     = _.filter(miners, c => !c.memory.target.harvest);

	var _loop = function _loop(t) {
		if (tasklist.length < 1 || miners.length < 1) return "break";
		var miner = (0, _Action.findClosestByRange)(tasklist[t], miners);
		if (!miner) return "break";
		_.remove(miners, function (c) {
			return c.id == miner.id;
		});
		miner.memory.target.harvest = tasklist[t];
		tasklist[t].target = miner;
	};

	for (var t in tasklist) {
		var _ret = _loop(t);

		if (_ret === "break") break;
	}

	return tasklist;
};

module.exports = exports["default"];

/***/ }),
/* 64 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Tasks/_heal.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (room) {};

module.exports = exports["default"];

/***/ }),
/* 65 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Tasks/_pickup.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {
	var tasklist = room.drops.all;
	return tasklist;
};

module.exports = exports["default"];

/***/ }),
/* 66 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/Tasks/_repair.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(/*! ../config */ 3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (room) {
	var tasklist = _.filter(room.structures.my.all, function (s) {
		return s.hits / s.hitsMax < _config2.default.repair.percent && s.hits < _config2.default.repair.maxHits;
	});
	return _.sortByOrder(tasklist, ['hits'], ['asc']);
};

module.exports = exports['default'];

/***/ }),
/* 67 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Tasks/_transfer.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

exports.default = function (room) {
	var structures = room.structures.my;
	var tasklist = [].concat(structures.spawn, structures.extension, structures.tower, structures.storage);
	tasklist = _.filter(tasklist, function (s) {
		return s.energy < s.energyCapacity;
	});
	var fillers = [].concat(room.creeps.my.filler);
	fillers = _.filter(fillers, function (c) {
		return c && c.memory && c.memory.full;
	});

	var _loop = function _loop(t) {
		if (tasklist.length < 1 || fillers.length < 1) return "break";
		var filler = (0, _Action.findClosestByRange)(tasklist[t], fillers);
		if (!filler) return "break";
		_.remove(fillers, function (c) {
			return c.id == filler.id;
		});
		filler.memory.target.transfer = tasklist[t];
		tasklist[t].target = filler;
	};

	for (var t in tasklist) {
		var _ret = _loop(t);

		if (_ret === "break") break;
	}

	return tasklist;
};

module.exports = exports["default"];

/***/ }),
/* 68 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/Tasks/_upgrade.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room) {
	var structures = room.structures.my;
	return structures.controller;
};

module.exports = exports["default"];

/***/ }),
/* 69 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/Tasks/_withdraw.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../Action */ 1);

exports.default = function (room) {
	var structures = room.structures.my;
	var tasklist = structures.container;
	tasklist = _.filter(tasklist, function (s) {
		return _.sum(s.store) > 300;
	});

	var transers = [].concat(room.creeps.my.transer);
	transers = _.filter(transers, function (c) {
		return !c.memory.full;
	});

	var _loop = function _loop(t) {
		if (tasklist.length < 1 || transers.length < 1) return "break";
		var transer = (0, _Action.findClosestByRange)(tasklist[t], transers);
		if (!transer) return "break";
		_.remove(transers, function (c) {
			return c.id == transer.id;
		});
		transer.memory.target.withdraw = tasklist[t];
		tasklist[t].target = transer;
	};

	for (var t in tasklist) {
		var _ret = _loop(t);

		if (_ret === "break") break;
	}

	return tasklist;
};

module.exports = exports["default"];

/***/ }),
/* 70 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/Tasks/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _build = __webpack_require__(/*! ./_build */ 61);

var _build2 = _interopRequireDefault(_build);

var _repair = __webpack_require__(/*! ./_repair */ 66);

var _repair2 = _interopRequireDefault(_repair);

var _harvest = __webpack_require__(/*! ./_harvest */ 63);

var _harvest2 = _interopRequireDefault(_harvest);

var _pickup = __webpack_require__(/*! ./_pickup */ 65);

var _pickup2 = _interopRequireDefault(_pickup);

var _transfer = __webpack_require__(/*! ./_transfer */ 67);

var _transfer2 = _interopRequireDefault(_transfer);

var _withdraw = __webpack_require__(/*! ./_withdraw */ 69);

var _withdraw2 = _interopRequireDefault(_withdraw);

var _attack = __webpack_require__(/*! ./_attack */ 60);

var _attack2 = _interopRequireDefault(_attack);

var _heal = __webpack_require__(/*! ./_heal */ 64);

var _heal2 = _interopRequireDefault(_heal);

var _upgrade = __webpack_require__(/*! ./_upgrade */ 68);

var _upgrade2 = _interopRequireDefault(_upgrade);

var _dismantle = __webpack_require__(/*! ./_dismantle */ 62);

var _dismantle2 = _interopRequireDefault(_dismantle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (roomGroup) {
	if (!Memory.tasks) Memory.tasks = {};

	_.forEach(roomGroup, function (roomName) {
		var room = Memory.rooms[roomName];
		Memory.tasks[roomName] = {
			build: (0, _build2.default)(room) || [],
			repair: (0, _repair2.default)(room) || [],
			harvest: (0, _harvest2.default)(room) || [],
			pickup: (0, _pickup2.default)(room) || [],
			transfer: (0, _transfer2.default)(room) || [],
			withdraw: (0, _withdraw2.default)(room) || [],
			attack: (0, _attack2.default)(room) || [],
			heal: (0, _heal2.default)(room) || [],
			upgrade: (0, _upgrade2.default)(room) || [],
			dismantle: (0, _dismantle2.default)(room) || []
		};
	});
};

module.exports = exports['default'];

/***/ }),
/* 71 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/_util/Console/index.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ = __webpack_require__(/*! ../ */ 0);

exports.default = {
	error: function error() {
		for (var _len = arguments.length, content = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			content[_key - 1] = arguments[_key];
		}

		var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.time;

		console.log(_.Ui.color.red('#', 'Error'), '[' + _.Ui.color.purple(title) + ']', [].concat(content).join(' | '));
	},
	warn: function warn() {
		for (var _len2 = arguments.length, content = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			content[_key2 - 1] = arguments[_key2];
		}

		var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.time;

		console.log(_.Ui.color.yellow('#', 'Warn'), '[' + _.Ui.color.purple(title) + ']', [].concat(content).join(' | '));
	},
	succeed: function succeed() {
		for (var _len3 = arguments.length, content = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			content[_key3 - 1] = arguments[_key3];
		}

		var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.time;

		console.log(_.Ui.color.green('#', 'Succeed'), '[' + _.Ui.color.purple(title) + ']', [].concat(content).join(' | '));
	},
	note: function note() {
		for (var _len4 = arguments.length, content = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			content[_key4 - 1] = arguments[_key4];
		}

		var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.time;

		console.log(_.Ui.color.blue('#', 'Note'), '[' + _.Ui.color.purple(title) + ']', [].concat(content).join(' | '));
	},
	info: function info() {
		var _Ui$color;

		for (var _len5 = arguments.length, content = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			content[_key5] = arguments[_key5];
		}

		console.log((_Ui$color = _.Ui.color).grey.apply(_Ui$color, ['#'].concat(content)));
	}
};
module.exports = exports['default'];

/***/ }),
/* 72 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./src/_util/Is/_energy.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep) {
	if (!creep.memory.hasEnergy && creep.carry.energy > 0) creep.memory.hasEnergy = true;
	if (creep.memory.hasEnergy && creep.carry.energy == 0) creep.memory.hasEnergy = false;
	return creep.memory.hasEnergy;
};

module.exports = exports["default"];

/***/ }),
/* 73 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./src/_util/Is/_firendly.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(/*! ../../config */ 3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (owner) {
	var isFriendly = _.indexOf(_config2.default.friend, owner) >= 0 ? true : false;

	return isFriendly;
};

module.exports = exports['default'];

/***/ }),
/* 74 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/_util/Is/_full.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep) {
	var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (all) {
		if (!creep.memory.full && _.sum(creep.carry) == creep.carryCapacity) creep.memory.full = true;
		if (creep.memory.full && _.sum(creep.carry) == 0) creep.memory.full = false;
	} else {
		if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
		if (creep.memory.full && creep.carry.energy == 0) creep.memory.full = false;
	}
	return creep.memory.full;
};

module.exports = exports["default"];

/***/ }),
/* 75 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/_util/Is/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _full = __webpack_require__(/*! ./_full */ 74);

var _full2 = _interopRequireDefault(_full);

var _firendly = __webpack_require__(/*! ./_firendly */ 73);

var _firendly2 = _interopRequireDefault(_firendly);

var _energy = __webpack_require__(/*! ./_energy */ 72);

var _energy2 = _interopRequireDefault(_energy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	firendly: _firendly2.default,
	full: _full2.default,
	energy: _energy2.default
};
module.exports = exports['default'];

/***/ }),
/* 76 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/_util/Target/_format.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Action = __webpack_require__(/*! ../../Action */ 1);

exports.default = function (creep, target) {
	if (_.isArray(target)) {
		if (target.length == 0) return false;
		if (target.length == 1) {
			target = _.first(target);
		} else {
			try {
				target = (0, _Action.findClosestByRange)(creep, target);
			} catch (e) {
				console.log(e);
				target = _.first(target);
			}
		}
	}
	if (target.pos.roomName != creep.pos.roomName) {
		return false;
	} else {
		try {
			target = Game.getObjectById(target.id);
			return target;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
};

module.exports = exports['default'];

/***/ }),
/* 77 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./src/_util/Target/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _format = __webpack_require__(/*! ./_format */ 76);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	format: _format2.default
};
module.exports = exports['default'];

/***/ }),
/* 78 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/_util/Timer/index.js ***!
  \**********************************/
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

module.exports = exports["default"];

/***/ }),
/* 79 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/_util/Ui/_color.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _c = __webpack_require__(/*! ./_c */ 4);

var _c2 = _interopRequireDefault(_c);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var color = function color(_color) {
	for (var _len = arguments.length, content = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		content[_key - 1] = arguments[_key];
	}

	return '<font color=' + _color + '>' + [].concat(content).join(' ') + '</font>';
};
color.yellow = function () {
	for (var _len2 = arguments.length, content = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		content[_key2] = arguments[_key2];
	}

	return '<font color=' + _c2.default.yellow + '>' + [].concat(content).join(' ') + '</font>';
};
color.blue = function () {
	for (var _len3 = arguments.length, content = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
		content[_key3] = arguments[_key3];
	}

	return '<font color=' + _c2.default.blue + '>' + [].concat(content).join(' ') + '</font>';
};
color.red = function () {
	for (var _len4 = arguments.length, content = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
		content[_key4] = arguments[_key4];
	}

	return '<font color=' + _c2.default.red + '>' + [].concat(content).join(' ') + '</font>';
};
color.purple = function () {
	for (var _len5 = arguments.length, content = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
		content[_key5] = arguments[_key5];
	}

	return '<font color=' + _c2.default.purple + '>' + [].concat(content).join(' ') + '</font>';
};
color.grey = function () {
	for (var _len6 = arguments.length, content = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
		content[_key6] = arguments[_key6];
	}

	return '<font color=' + _c2.default.grey + '>' + [].concat(content).join(' ') + '</font>';
};
color.orange = function () {
	for (var _len7 = arguments.length, content = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
		content[_key7] = arguments[_key7];
	}

	return '<font color=' + _c2.default.orange + '>' + [].concat(content).join(' ') + '</font>';
};
color.green = function () {
	for (var _len8 = arguments.length, content = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
		content[_key8] = arguments[_key8];
	}

	return '<font color=' + _c2.default.green + '>' + [].concat(content).join(' ') + '</font>';
};
exports.default = color;
module.exports = exports['default'];

/***/ }),
/* 80 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/_util/Ui/_emoji.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	attack: unescape("%uD83D%uDD2B"),
	harvest: unescape("%u26CF"),
	error: unescape("%u274C"),
	moveTo: unescape("%uD83D%uDEB6"),
	transfer: unescape("%uD83D%uDD01"),
	build: unescape("%uD83D%uDEA7"),
	repair: unescape("%uD83D%uDD27"),
	claim: unescape("%uD83D%uDEA9"),
	reserveController: unescape("%uD83D%uDEA9"),
	upgradeController: unescape("%uD83D%uDE80"),
	heal: unescape("%uD83D%uDC9A"),
	pickup: unescape("%uD83D%uDC4B"),
	withdraw: unescape("%uD83D%uDCB0"),
	recycle: unescape("%uD83D%uDD04"),
	dismantle: unescape("%u26A0%uFE0F"),
	target: unescape("%uD83D%uDC41%uFE0F"),
	targetChange: unescape("%u267B%uFE0F%uD83D%uDC41%uFE0F")
};
module.exports = exports["default"];

/***/ }),
/* 81 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/_util/Ui/_table.js ***!
  \********************************/
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

module.exports = exports["default"];

/***/ }),
/* 82 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/_util/Ui/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	c: __webpack_require__(/*! ./_c */ 4),
	color: __webpack_require__(/*! ./_color */ 79),
	table: __webpack_require__(/*! ./_table */ 81),
	emoji: __webpack_require__(/*! ./_emoji */ 80)
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loop = loop;

var _util = __webpack_require__(/*! ./_util */ 0);

var _screepsProfiler = __webpack_require__(/*! screeps-profiler */ 5);

var _screepsProfiler2 = _interopRequireDefault(_screepsProfiler);

var _config = __webpack_require__(/*! ./config */ 3);

var _config2 = _interopRequireDefault(_config);

var _flow = __webpack_require__(/*! ./flow */ 6);

var flow = _interopRequireWildcard(_flow);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// info
_util.Console.info('Coding Update!');
// init
if (_config2.default.profiler) _screepsProfiler2.default.enable();
flow.init();
// loop
var Body = function Body() {
	Game.cpu.bucket < 2 * Game.cpu.tickLimit ? _util.Console.warn('Lack of CPU!') : flow.body();
};
function loop() {
	_config2.default.profiler ? _screepsProfiler2.default.wrap(function () {
		return Body();
	}) : Body();
}

/***/ })
/******/ ]);