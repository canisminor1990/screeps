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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timer = __webpack_require__(11);

Object.defineProperty(exports, 'Timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timer).default;
  }
});

var _build = __webpack_require__(7);

Object.defineProperty(exports, 'Build', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _emoji = __webpack_require__(8);

Object.defineProperty(exports, 'emoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emoji).default;
  }
});

var _action = __webpack_require__(6);

Object.defineProperty(exports, 'action', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_action).default;
  }
});

var _isFriend = __webpack_require__(9);

Object.defineProperty(exports, 'isFriend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFriend).default;
  }
});

var _isFull = __webpack_require__(10);

Object.defineProperty(exports, 'isFull', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFull).default;
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

var _findMiner = __webpack_require__(45);

Object.defineProperty(exports, 'taskFindMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findMiner).default;
  }
});

var _container = __webpack_require__(3);

Object.defineProperty(exports, 'taskContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_container).default;
  }
});

var _harvester = __webpack_require__(46);

Object.defineProperty(exports, 'taskHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _pathFinder = __webpack_require__(47);

Object.defineProperty(exports, 'pathFinder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pathFinder).default;
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

var _attack = __webpack_require__(12);

Object.defineProperty(exports, "attack", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_attack).default;
  }
});

var _heal = __webpack_require__(17);

Object.defineProperty(exports, "heal", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_heal).default;
  }
});

var _build = __webpack_require__(13);

Object.defineProperty(exports, "build", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _repair = __webpack_require__(19);

Object.defineProperty(exports, "repair", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_repair).default;
  }
});

var _dismantle = __webpack_require__(15);

Object.defineProperty(exports, "dismantle", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dismantle).default;
  }
});

var _harvest = __webpack_require__(16);

Object.defineProperty(exports, "harvest", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvest).default;
  }
});

var _pickup = __webpack_require__(18);

Object.defineProperty(exports, "pickup", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pickup).default;
  }
});

var _transfer = __webpack_require__(20);

Object.defineProperty(exports, "transfer", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_transfer).default;
  }
});

var _withdraw = __webpack_require__(22);

Object.defineProperty(exports, "withdraw", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_withdraw).default;
  }
});

var _upgradeController = __webpack_require__(21);

Object.defineProperty(exports, "upgradeController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgradeController).default;
  }
});

var _claimController = __webpack_require__(14);

Object.defineProperty(exports, "claimController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claimController).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep) {
	"use strict";

	var targetsStorage = Game.getObjectById('58d07b35bfeec6256575be5d');
	if (targetsStorage.store['energy'] < targetsStorage.storeCapacity) {
		creep.transfer(targetsStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? creep.moveTo(targetsStorage, { reusePath: 8, visualizePathStyle: { stroke: '#3f51b5' } }) : null;
	} else {
		var controller = creep.room.controller;
		creep.upgradeController(controller) == ERR_NOT_IN_RANGE ? creep.moveTo(controller, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } }) : null;
	}
};

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(30);

Object.defineProperty(exports, 'root', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_root).default;
  }
});

var _memory = __webpack_require__(28);

Object.defineProperty(exports, 'memory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_memory).default;
  }
});

var _structure = __webpack_require__(31);

Object.defineProperty(exports, 'structure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_structure).default;
  }
});

var _role = __webpack_require__(29);

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, target, fc, text) {
	switch (fc) {
		case OK:
			if (text) creep.say(text);
			break;
		case ERR_NOT_OWNER:
			creep.say(text + "OWNER");
			break;
		case ERR_NO_PATH:
			creep.say(text + "NO_PATH");
			break;
		case ERR_NAME_EXISTS:
			creep.say(text + "NAME_EXISTS");
			break;
		case ERR_BUSY:
			creep.say(text + "BUSY");
			break;
		case ERR_NOT_FOUND:
			creep.say(text + "FOUND");
			break;
		case ERR_NOT_ENOUGH_ENERGY:
			creep.say(text + "ENERGY");
			break;
		case ERR_NOT_ENOUGH_RESOURCES:
			creep.say(text + "RESOURCES");
			break;
		case ERR_INVALID_TARGET:
			creep.say(text + "TARGET");
			console.log(target);
			break;
		case ERR_FULL:
			creep.say(text + "FULL");
			break;
		case ERR_NOT_IN_RANGE:
			(0, _task.pathFinder)(creep, target);
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
			creep.say(text + "ENOUGH_EXTENSIONS");
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
/* 7 */
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
/* 8 */
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
	transfer: unescape("%uD83E%uDD1D"),
	build: unescape("%uD83D%uDEA7"),
	repair: unescape("%uD83D%uDD27"),
	claim: unescape("%uD83D%uDEA9"),
	heal: unescape("%uD83D%uDC9A"),
	pickup: unescape("%uD83E%uDD33"),
	withdraw: unescape("%uD83E%uDD33"),
	upgrade: unescape("%uD83D%uDE80"),
	recycle: unescape("%uD83D%uDD04"),
	dismantle: unescape("%u2B55")
};

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tick) {
    if (Memory.timer[tick] && Game.time - Memory.timer[tick] < tick) return false;
    Memory.timer[tick] = Game.time;
    return true;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.attack(target), _util.emoji.attack);
	return true;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.build(target), _util.emoji.build);
	return true;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.claimController(target), _util.emoji.claim);
	return true;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.dismantle(target), _util.emoji.dismantle);
	return true;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.harvest(target), _util.emoji.harvest);
	return true;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.heal(target), _util.emoji.heal);
	return true;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.pickup(target), _util.emoji.pickup);
	return true;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.repair(target), _util.emoji.repair);
	return true;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RESOURCE_ENERGY;

	if (!rawTarget) return false;
	var target = rawTarget;
	console.log(typeof target === "undefined" ? "undefined" : _typeof(target));
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	};

	(0, _util.action)(creep, target, creep.transfer(target, type), _util.emoji.transfer);
	return true;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (creep, rawTarget) {
	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.upgradeController(target), _util.emoji.upgrade);
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

exports.default = function (creep, rawTarget) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RESOURCE_ENERGY;

	if (!rawTarget) return false;
	var target = rawTarget;
	if (target instanceof Array) {
		target = _.compact(target);
		if (target.length == 0) return false;
		target = target[0];
	}
	(0, _util.action)(creep, target, creep.withdraw(target, type), _util.emoji.withdraw);
	return true;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var room = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.rooms['W81S67'];

	var needBuild = room.memory.structures.needBuild;
	var repair = {
		percent: 0.5,
		maxHits: 10000
	};
	var role = [{
		role: "claim",
		body: { tough: 1, move: 1, claim: 1 },
		roleTimeout: 100,
		number: 1,
		priority: 7
	}, {
		role: "farMiner",
		body: { move: 2, work: 4, carry: 2 },
		roleTimeout: 50,
		number: 1,
		priority: 4
	}, {
		role: 'farHarvester',
		body: { tough: 1, move: 3, carry: 4, attack: 1 },
		number: 3,
		priority: 5
	}, {
		role: 'farBuilder',
		body: { carry: 9, work: 3, move: 3 },
		number: 1,
		priority: 5
	}, {
		role: 'harvester',
		body: { carry: 12, move: 4 },
		number: 4,
		priority: 2
	}, {
		role: 'upgrader',
		body: { carry: 2, work: 4, move: 1 },
		number: 2,
		priority: 3
	}, {
		role: 'builder',
		body: { work: 3, carry: 3, move: 3 },
		number: needBuild.length > 0 ? 1 : 0,
		priority: 6
	}, {
		role: "miner",
		body: { carry: 1, work: 8, move: 2 },
		number: 2,
		roleTimeout: 20,
		priority: 1
	}, {
		role: 'cleaner',
		body: { carry: 2, move: 1 },
		number: 2,
		priority: 0
	}];

	return {
		role: role.sort(function (a, b) {
			return a.priority - b.priority;
		}),
		repair: repair
	};
};

/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (room, miner) {
	var rawSources = room.find(FIND_SOURCES);
	var sources = [];
	rawSources.forEach(function (source) {
		var minerNumber = 0;
		miner.forEach(function (creep) {
			creep.memory.harvestTarget == source.id ? minerNumber++ : null;
		});
		sources.push({
			source: source,
			minerNumber: minerNumber
		});
	});
	if (sources.length > 0) {
		sources.sort(function (a, b) {
			return a.minerNumber - b.minerNumber;
		});
	}
	return sources;
};

/***/ }),
/* 27 */
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

	var structuresDocker = structuresContainer.concat([structuresStorage]);

	return {
		terminal: room.terminal,
		controller: room.controller,
		storage: structuresStorage,
		tower: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_TOWER;
		})[0],
		spawn: _.filter(structuresMy, function (structure) {
			return structure.structureType == STRUCTURE_SPAWN;
		})[0],
		container: _.filter(structuresOther, function (structure) {
			return structure.structureType == STRUCTURE_CONTAINER;
		}),
		canWithdraw: structuresDocker[0] != null ? _.filter(structuresDocker, function (structure) {
			return structure.store.energy > 0;
		}) : [],
		canFill: structuresDocker[0] != null ? _.filter(structuresDocker, function (structure) {
			return structure.store.energy < structure.storeCapacity;
		}) : [],
		needFill: _.filter(structuresMy, function (structure) {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
		}),
		needFix: _.filter(structures, function (structure) {
			return (structure.my || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL) && structure.hits / structure.hitsMax < config.repair.percent && structure.hits < config.repair.maxHits;
		}).sort(function (a, b) {
			return a.hits - b.hits;
		}),
		needBuild: room.find(FIND_MY_CONSTRUCTION_SITES)
	};
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(23);

var _config2 = _interopRequireDefault(_config);

var _creeps = __webpack_require__(24);

var _creeps2 = _interopRequireDefault(_creeps);

var _structures = __webpack_require__(27);

var _structures2 = _interopRequireDefault(_structures);

var _sources = __webpack_require__(26);

var _sources2 = _interopRequireDefault(_sources);

var _dropped = __webpack_require__(25);

var _dropped2 = _interopRequireDefault(_dropped);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (roomArrary) {
	_.each(roomArrary, function (room) {
		room = Game.rooms[room];
		var config = (0, _config2.default)(room);
		var creeps = (0, _creeps2.default)(room, config);
		var memory = {
			energyAvailable: room.energyAvailable,
			config: config,
			creeps: creeps,
			structures: (0, _structures2.default)(room, config),
			sources: (0, _sources2.default)(room, creeps.my.miner),
			dropped: (0, _dropped2.default)(room)
		};
		room.memory = memory;
	});
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(41);

var role = _interopRequireWildcard(_role);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArrary) {

	_.each(roomArrary, function (room) {
		room = Game.rooms[room];
		var Memory = room.memory;
		var targetStructures = Memory.structures;
		var myCreeps = Memory.creeps.my;
		var dropped = Memory.dropped ? Memory.dropped.energy : [];

		var newRoom = {
			pos: new RoomPosition(25, 47, roomArrary[1]),
			memory: Game.rooms[roomArrary[1]] ? Game.rooms[roomArrary[1]].memory : {}
		};

		myCreeps.harvester.forEach(function (creep) {
			return role.harvester(creep, dropped);
		});
		myCreeps.miner.forEach(function (creep) {
			return role.miner(creep, Memory.sources, dropped);
		});
		myCreeps.upgrader.forEach(function (creep) {
			return role.upgrader(creep, targetStructures.controller);
		});
		myCreeps.builder.forEach(function (creep) {
			return role.builder(creep, targetStructures.needBuild, newRoom);
		});
		myCreeps.cleaner.forEach(function (creep) {
			return role.cleaner(creep, dropped);
		});
		// far
		myCreeps.farBuilder.forEach(function (creep) {
			return role.farBuilder(creep, newRoom);
		});
		myCreeps.farHarvester.forEach(function (creep) {
			return role.farHarvester(creep, newRoom);
		});
		myCreeps.farMiner.forEach(function (creep) {
			return role.farMiner(creep, newRoom);
		});
		myCreeps.claim.forEach(function (creep) {
			return role.claim(creep, newRoom);
		});
	});
};

/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _structure = __webpack_require__(44);

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArray) {
	var room = Game.rooms[roomArray[0]];
	var roomNext = Game.rooms[roomArray[1]];
	var Memory = room.memory;
	var nextMemory = roomNext ? roomNext.memory : null;
	var targetStructures = Memory.structures;
	var targetCreeps = Memory.creeps;
	var config = Memory.config;

	var spawn = nextMemory ? _.merge(targetCreeps.my, nextMemory.creeps.my) : targetCreeps.my;

	structure.spawn(targetStructures.spawn, spawn, config);
	structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, needBuild, newRoom) {

	if (creep.carry.energy == 0) {
		creep.memory.canBuild = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canBuild = true;
	}

	if (needBuild.length > 0) {
		if (creep.memory.canBuild) {
			var buildTarget = creep.pos.findClosestByRange(needBuild);
			buildTarget && creep.build(buildTarget) != OK ? (0, _task.pathFinder)(creep, buildTarget) : null;
		} else {
			var canWithdraw = creep.room.storage;
			canWithdraw && creep.withdraw(canWithdraw, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, canWithdraw) : null;
		}
	} else {
		if (creep.carry.energy < 50) {
			var transferTarget = creep.room.storage;
			creep.withdraw(transferTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, transferTarget) : null;
		} else {
			var needFill = creep.room.memory.structures.needFill;
			var needFillTarget = creep.pos.findClosestByRange(needFill);
			needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, needFillTarget) : null;
		}
	}
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	"use strict";

	var controller = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!controller) {
		(0, _task.pathFinder)(creep, newRoom.pos);
	} else {
		creep.reserveController(controller) !== OK ? (0, _task.pathFinder)(creep, controller) : null;
	}
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep) {
	var dropped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	if (creep.room.memory.creeps.my.harvester.length > 0 && creep.room.memory.creeps.my.miner.length > 0) {

		if (creep.carry.energy < creep.carryCapacity) {
			if (dropped.length > 0) {
				var pickupTarget = creep.pos.findClosestByPath(dropped);
				pickupTarget && creep.pickup(pickupTarget) != OK ? (0, _task.pathFinder)(creep, pickupTarget) : null;
			} else {
				var transferTarget = creep.room.memory.structures.container.sort(function (a, b) {
					return b.store.enengy - a.store.enengy;
				});
				transferTarget && creep.withdraw(transferTarget[0], RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, transferTarget[0]) : null;
			}
		} else {

			var needFill = creep.room.memory.structures.needFill;
			var needFillTarget = void 0;
			if (needFill.length > 0) {
				needFillTarget = creep.pos.findClosestByRange(needFill);
			} else {
				needFillTarget = creep.room.storage;
			}
			needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, needFillTarget) : null;
		}
	} else {

		if (creep.carry.energy < 50) {
			var _transferTarget = creep.room.storage;
			creep.withdraw(_transferTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, _transferTarget) : null;
		} else {
			var _needFill = creep.room.memory.structures.needFill;
			var _needFillTarget = creep.pos.findClosestByRange(_needFill);
			_needFillTarget && creep.transfer(_needFillTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, _needFillTarget) : null;
		}
	}
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var room = Game.spawns['Spawn1'].room;
	var newRoomMemory = newRoom.memory;
	var farMiner = newRoomMemory.creeps.my.farMiner;
	var enemy = newRoomMemory.creeps.enemy;
	var needBuild = newRoomMemory.structures.needBuild;

	if (enemy.length > 0) {
		var enemyTarget = creep.pos.findClosestByRange(enemy);
		enemyTarget && creep.attack(enemyTarget) != OK ? (0, _task.pathFinder)(creep, enemyTarget) : null;
		return;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	if (creep.carry.energy == creep.carryCapacity || !farMiner.length > 0) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {
		var farMinerTarget = Game.getObjectById(farMiner[0].id);
		(0, _task.pathFinder)(creep, farMinerTarget);
	} else {

		if (needBuild.length > 0) {
			var buildTarget = creep.pos.findClosestByRange(needBuild);
			buildTarget && creep.build(buildTarget) != OK ? (0, _task.pathFinder)(creep, buildTarget) : null;
		} else {

			creep.transfer(room.storage, RESOURCE_ENERGY) !== OK ? (0, _task.pathFinder)(creep, room.storage) : null;
		}
	}
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var room = Game.spawns['Spawn1'].room;
	var newRoomMemory = newRoom.memory;
	var farMiner = newRoomMemory.creeps.my.farMiner;
	var enemy = newRoomMemory.creeps.enemy;

	if (enemy.length > 0) {
		var enemyTarget = creep.pos.findClosestByRange(enemy);
		enemyTarget && creep.attack(enemyTarget) != OK ? (0, _task.pathFinder)(creep, enemyTarget) : null;
		return;
	}

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	if (creep.carry.energy == creep.carryCapacity || !farMiner.length > 0) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {
		var farMinerTarget = Game.getObjectById(farMiner[0].id);
		(0, _task.pathFinder)(creep, farMinerTarget);
	} else {

		creep.transfer(room.storage, RESOURCE_ENERGY) !== OK ? (0, _task.pathFinder)(creep, room.storage) : null;
	}
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep, newRoom) {

    if (creep.carry.energy == 0) {
        creep.memory.canHarvest = true;
    }

    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.canHarvest = false;
    }

    if (creep.memory.canHarvest) {
        var source = Game.getObjectById('5873bc3511e3e4361b4d7390');
        if (!source) {
            (0, _task.pathFinder)(creep, newRoom.pos);
        } else {
            creep.harvest(source) !== OK ? (0, _task.pathFinder)(creep, source) : null;
        }
    } else {
        var targets = creep.pos.findInRange(newRoom.memory.creeps.my.farHarvester, 1, {
            filter: function filter(targetCreep) {
                return targetCreep.carry.energy < targetCreep.carryCapacity;
            }
        });
        if (targets.length > 0) {
            creep.transfer(targets[0], RESOURCE_ENERGY);
        } else {
            var needBuild = newRoom.memory.structures.needBuild;
            needBuild.length > 0 && creep.build(needBuild[0]) != OK ? (0, _task.pathFinder)(creep, needBuild[0]) : null;
        }
    }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(1);

exports.default = function (creep) {
	var dropped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {

		var pickupTarget = [];
		if (dropped.length > 0) {
			pickupTarget = creep.pos.findInRange(dropped, 5);
		}

		if (pickupTarget.length > 0) {
			creep.pickup(pickupTarget[0]) != OK ? (0, _task.pathFinder)(creep, pickupTarget[0]) : null;
		} else {
			var transferTarget = _.filter(creep.room.memory.structures.container, function (container) {
				return container.id != '58d31e9dbbb5793fe9d0ad71' && container.store.energy > 0;
			});
			transferTarget = transferTarget.sort(function (a, b) {
				return b.store.energy - a.store.energy;
			})[0];
			transferTarget && creep.withdraw(transferTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, transferTarget) : null;
		}
	}

	if (creep.memory.full) {
		var needFill = creep.room.memory.structures.needFill;
		var needFillTarget = void 0;
		if (needFill.length > 0) {
			needFillTarget = creep.pos.findClosestByRange(needFill);
		} else {
			needFillTarget = creep.room.storage;
		}
		needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) != OK ? (0, _task.pathFinder)(creep, needFillTarget) : null;
	}
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(2);

exports.default = function (creep, sources) {
	var dropped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	var target = void 0;
	// root
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = sources[0].source.id;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (creep.memory.full) {
		target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		if ((0, _action.transfer)(creep, target[0])) return;
		if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
			target = creep.room.controller;
			if ((0, _action.upgradeController)(creep, target)) return;
		}
	} else {
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 0);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = Game.getObjectById(creep.memory.harvestTarget);
		if ((0, _action.harvest)(creep, target)) return;
	}
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(2);

exports.default = function (creep, controller) {
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (creep.memory.full) {
		(0, _action.upgradeController)(creep, controller);
	} else {
		target = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		(0, _action.withdraw)(creep, target);
	}
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(38);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _upgrader = __webpack_require__(40);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(32);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(39);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(34);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farBuilder = __webpack_require__(35);

Object.defineProperty(exports, 'farBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farBuilder).default;
  }
});

var _farHarvester = __webpack_require__(36);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(37);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _claim = __webpack_require__(33);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (spawn, my, config) {
	if (spawn.spawning) {
		spawn.room.visual.text('[Spawn] ' + spawn.spawning.name, spawn.pos.x + 1, spawn.pos.y, { align: 'left', opacity: 0.8 });
		return;
	}

	var roleFactory = config.role;
	var priority = false;
	roleFactory.forEach(function (roleType) {
		var roleName = roleType.role;
		var roleTimeout = roleType.roleTimeout ? roleType.roleTimeout : 10;
		var roleMy = _.filter(my[roleName], function (roleCreep) {
			return roleCreep.ticksToLive > roleTimeout;
		});
		var roleNumber = roleType.number - roleMy.length;
		if (roleNumber <= 0 || priority) return;
		var spawnName = buildName(roleName);
		if (spawn.createCreep(buildBody(roleType.body), spawnName, { role: roleName }) == OK) {
			console.log('Spawn', spawn.spawning.name);
		} else {
			priority = true;
		}
	});
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (tower) {
	var needFix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var enemy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	if (enemy.length > 0) {
		tower.attack(enemy[0]);
	} else if (needFix.length > 0) {
		tower.repair(needFix[0]);
	}
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(43);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(42);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(1);

var taskFindMiner = function taskFindMiner(creep) {
    var target = void 0;

    if (creep.memory.role == "builder") {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function filter(structure) {
                return structure.structureType == (STRUCTURE_STORAGE || STRUCTURE_CONTAINER) && structure.store["energy"] > 0;
            }
        });
    } else if (creep.memory.role == 'upgrader') {
        target = Game.getObjectById('58d151fe1b3da0c326b1385b');
    } else {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function filter(structure) {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] > 0 && structure.id != '58d151fe1b3da0c326b1385b';
            }
        });
    }

    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        (0, _task.pathFinder)(creep, target);
    }
};

exports.default = taskFindMiner;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _container = __webpack_require__(3);

var _container2 = _interopRequireDefault(_container);

var _task = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep) {
    "use strict";

    var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function filter(structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    });

    if (targets) {
        creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, targets) : null;
    } else {
        var targetsBuild = creep.room.memory.constructionSites;
        if (creep.role != "builder" && targetsBuild.length > 0) {
            var builderTargets = creep.pos.findInRange(FIND_MY_CREEPS, 5, { filter: function filter(creep) {
                    return creep.role == "builder" && creep.carry['energy'] < creep.carryCapacity;
                } })[0];
            builderTargets && creep.transfer(builderTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, builderTargets) : null;
        } else {
            (0, _container2.default)(creep);
        }
    }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (creep, target) {
	var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';

	if (creep.fatigue > 0) return;
	creep.moveTo(target, {
		reusePath: 12,
		serializeMemory: true,
		visualizePathStyle: { stroke: color }
	});
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _manager = __webpack_require__(5);

var Manager = _interopRequireWildcard(_manager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports.loop = function () {
	var rooms = ['W81S67', 'W81S66'];
	// start
	Manager.root();
	Manager.memory(rooms);
	Manager.role(rooms);
	Manager.structure(rooms);
};

/***/ })
/******/ ]);