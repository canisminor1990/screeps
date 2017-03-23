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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findMiner = __webpack_require__(46);

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

var _harvester = __webpack_require__(47);

Object.defineProperty(exports, 'taskHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _pathFinder = __webpack_require__(48);

Object.defineProperty(exports, 'pathFinder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pathFinder).default;
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

var _root = __webpack_require__(31);

Object.defineProperty(exports, 'root', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_root).default;
  }
});

var _memory = __webpack_require__(29);

Object.defineProperty(exports, 'memory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_memory).default;
  }
});

var _structure = __webpack_require__(32);

Object.defineProperty(exports, 'structure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_structure).default;
  }
});

var _role = __webpack_require__(30);

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

var _task = __webpack_require__(2);

exports.default = function (creep, target, fc, text) {
	switch (fc) {
		case OK:
			if (text) creep.say(text, { public: true });
			return true;
			break;
		case ERR_NOT_OWNER:
			creep.say(text + "OWNER");
			break;
		case ERR_NO_PATH:
			creep.say(text + "PATH");
			break;
		case ERR_NAME_EXISTS:
			creep.say(text + "NAME");
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
			break;
		case ERR_FULL:
			creep.say(text + "FULL");
			break;
		case ERR_NOT_IN_RANGE:
			(0, _task.pathFinder)(creep, target);
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
	withdraw: unescape("%uD83D%uDCB0"),
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
	if ((0, _util.action)(creep, target, creep.attack(target), _util.emoji.attack)) return true;
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
	if ((0, _util.action)(creep, target, creep.build(target), _util.emoji.build)) return true;
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
	if ((0, _util.action)(creep, target, creep.reserveController(target), _util.emoji.claim)) return true;
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
	if ((0, _util.action)(creep, target, creep.dismantle(target), _util.emoji.dismantle)) return true;
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
	if ((0, _util.action)(creep, target, creep.harvest(target), _util.emoji.harvest)) return true;
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
	if ((0, _util.action)(creep, target, creep.heal(target), _util.emoji.heal)) return true;
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
	if ((0, _util.action)(creep, target, creep.pickup(target), _util.emoji.pickup)) return true;
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
	if ((0, _util.action)(creep, target, creep.repair(target), _util.emoji.repair)) return true;
};

/***/ }),
/* 20 */
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
	};

	if ((0, _util.action)(creep, target, creep.transfer(target, type), _util.emoji.transfer)) return true;
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
	if ((0, _util.action)(creep, target, creep.upgradeController(target), _util.emoji.upgrade)) return true;
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
	if ((0, _util.action)(creep, target, creep.withdraw(target, type), _util.emoji.withdraw)) return true;
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
	var builderNumber = needBuild.length > 0 ? Math.ceil(needBuild.length / 2) : 1;
	var repair = {
		percent: 0.5,
		maxHits: 20000
	};
	var role = [{
		role: "claim",
		body: { claim: 2, move: 1 },
		timeout: 200,
		number: 1,
		priority: 7
	}, {
		role: "farMiner",
		body: { work: 8, move: 3 },
		timeout: 120,
		number: 1,
		priority: 4
	}, {
		role: 'farHarvester',
		body: { carry: 4, work: 1, move: 2, attack: 1 },
		number: 2,
		priority: 5
	}, {
		role: 'farBuilder',
		body: { carry: 6, work: 3, move: 3 },
		number: 1,
		priority: 5
	}, {
		role: 'harvester',
		body: { carry: 12, move: 6 },
		number: 3,
		priority: 2
	}, {
		role: 'upgrader',
		body: { carry: 2, work: 4, move: 2 },
		number: 3,
		priority: 3
	}, {
		role: 'builder',
		body: { work: 3, carry: 3, move: 3 },
		number: builderNumber > 3 ? 3 : builderNumber,
		priority: 6
	}, {
		role: "miner",
		body: { work: 8, move: 3 },
		number: 2,
		timeout: 40,
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

/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
				canWithdraw: structuresDocker.length > 0 ? _.filter(structuresDocker, function (structure) {
						return structure.store && structure.store.energy > 0;
				}) : [],
				canFill: structuresDocker.length > 0 ? _.filter(structuresDocker, function (structure) {
						return structure.store && structure.store.energy < structure.storeCapacity;
				}) : [],
				needFill: _.filter(structuresMy, function (structure) {
						return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity && structure.energy < 300;
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(23);

var _config2 = _interopRequireDefault(_config);

var _creeps = __webpack_require__(25);

var _creeps2 = _interopRequireDefault(_creeps);

var _structures = __webpack_require__(28);

var _structures2 = _interopRequireDefault(_structures);

var _sources = __webpack_require__(27);

var _sources2 = _interopRequireDefault(_sources);

var _dropped = __webpack_require__(26);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _role = __webpack_require__(42);

var role = _interopRequireWildcard(_role);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArrary) {

	_.each(roomArrary, function (room) {
		room = Game.rooms[room];
		var Memory = room.memory;
		var myCreeps = Memory.creeps.my;
		var newRoom = {
			pos: new RoomPosition(25, 47, roomArrary[1]),
			memory: Game.rooms[roomArrary[1]] ? Game.rooms[roomArrary[1]].memory : {}
		};

		myCreeps.cleaner.forEach(function (creep) {
			return role.cleaner(creep);
		});

		myCreeps.harvester.forEach(function (creep) {
			return role.harvester(creep);
		});
		myCreeps.miner.forEach(function (creep) {
			return role.miner(creep);
		});
		myCreeps.upgrader.forEach(function (creep) {
			return role.upgrader(creep);
		});
		myCreeps.builder.forEach(function (creep) {
			return role.builder(creep);
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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _structure = __webpack_require__(45);

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (roomArray) {
	var room = Game.rooms[roomArray[0]];
	var roomNext = Game.rooms[roomArray[1]];
	var Memory = room.memory;
	var targetStructures = Memory.structures;
	var targetCreeps = Memory.creeps;
	var config = Memory.config;

	var spawn = roomNext ? _.merge(targetCreeps.my, roomNext.memory.creeps.my) : targetCreeps.my;

	structure.spawn(targetStructures.spawn, spawn, config);
	structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
};

/***/ }),
/* 33 */
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
			target = creep.pos.findInRange(dropped, 3);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = creep.room.storage;
		if ((0, _action.withdraw)(creep, target)) return;
	}
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(2);

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var target = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!target) {
		(0, _task.pathFinder)(creep, newRoom.pos);
	} else {
		if ((0, _action.claimController)(creep, target)) return;
	}
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

var _task = __webpack_require__(2);

exports.default = function (creep) {
	var target = void 0;
	if (creep.room.name != 'W81S67') {
		(0, _task.pathFinder)(creep, Game.spawns[0]);
		return;
	}
	// memory
	(0, _util.isFull)(creep);
	// run
	if (!creep.memory.full) {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findClosestByRange(dropped);
			if ((0, _action.pickup)(creep, target)) return;
		}
		target = creep.room.storage;
		if ((0, _action.withdraw)(creep, target)) return;
	} else {
		target = creep.room.memory.structures.needFill;
		target = creep.pos.findClosestByRange(target);
		if ((0, _action.transfer)(creep, target)) return;
		target = creep.room.memory.structures.tower;
		if (target && target.energy == target.energyCapacity) return;
		if ((0, _action.transfer)(creep, target)) return;
	}
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

var _task = __webpack_require__(2);

exports.default = function (creep, newRoom) {
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
			(0, _task.pathFinder)(creep, newRoom.pos);
		}
	} else {
		var farMiner = newRoom.memory.creeps.my.farMiner;
		if (!creep.memory.full) {
			var _dropped = creep.room.memory.dropped.energy;
			if (_dropped.length > 0) {
				target = creep.pos.findInRange(_dropped, 4);
				if ((0, _action.pickup)(creep, target[0])) return;
			}
			if (farMiner.length > 0) {
				target = Game.getObjectById(farMiner[0].id);
				(0, _task.pathFinder)(creep, target);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var room = Game.spawns['Spawn1'].room;
	var newRoomMemory = newRoom.memory;
	var enemy = newRoomMemory.creeps.enemy;
	var target = void 0;
	// memory
	(0, _util.isFull)(creep);
	// run
	if (enemy.length > 0) {
		target = creep.pos.findClosestByRange(enemy);
		if ((0, _action.attack)(creep, target)) return;
	}

	if (!creep.memory.full) {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 4);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = _.filter(newRoom.memory.structures.container, function (container) {
			return container.id != '58d31e9dbbb5793fe9d0ad71' && container.store.energy > 0;
		}).sort(function (a, b) {
			return b.store.energy - a.store.energy;
		});
		if ((0, _action.withdraw)(creep, target[0])) return;
	} else {
		var needFix = newRoom.memory.structures.needFix;
		if (needFix.length > 0) {
			target = creep.pos.findClosestByRange(needFix);
			if ((0, _action.repair)(creep, target)) return;
		}
		if ((0, _action.transfer)(creep, room.storage)) return;
	}
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

var _task = __webpack_require__(2);

var _action = __webpack_require__(1);

exports.default = function (creep, newRoom) {
	var target = void 0;

	target = Game.getObjectById('5873bc3511e3e4361b4d7390');
	if (!target) {
		(0, _task.pathFinder)(creep, newRoom.pos);
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
	// 		pathFinder(creep, newRoom.pos)
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
/* 39 */
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
	if (!creep.memory.full) {
		var dropped = creep.room.memory.dropped.energy;
		if (dropped.length > 0) {
			target = creep.pos.findInRange(dropped, 6);
			if ((0, _action.pickup)(creep, target[0])) return;
		}
		target = _.filter(creep.room.memory.structures.container, function (container) {
			return container.id != '58d31e9dbbb5793fe9d0ad71' && container.store.energy > 0;
		}).sort(function (a, b) {
			return b.store.energy - a.store.energy;
		});

		if ((0, _action.withdraw)(creep, target[0])) return;
	} else {
		target = creep.room.memory.structures.needFill;
		if (target.length > 0) {
			target = creep.pos.findClosestByRange(target);
		} else {
			target = creep.room.storage;
		}
		if ((0, _action.transfer)(creep, target)) return;
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

var _action = __webpack_require__(1);

exports.default = function (creep) {
	var sources = creep.room.memory.sources;
	var target = void 0;
	// root
	if (!creep.memory.harvestTarget) creep.memory.harvestTarget = sources[0].source.id;
	target = Game.getObjectById(creep.memory.harvestTarget);
	if ((0, _action.harvest)(creep, target)) return;
	// // memory
	// isFull(creep)
	// // run
	// if (creep.memory.full) {
	// 	target = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
	// 	if (transfer(creep, target[0])) return;
	// 	if (creep.memory.harvestTarget == "5873bc3511e3e4361b4d7393") {
	// 		target = creep.room.controller;
	// 		if (upgradeController(creep, target)) return;
	// 	}
	// } else {
	// 	const dropped = creep.room.memory.dropped.energy;
	// 	if (dropped.length > 0) {
	// 		target = creep.pos.findInRange(dropped, 0);
	// 		if (pickup(creep, target[0])) return;
	// 	}
	// 	target = Game.getObjectById(creep.memory.harvestTarget)
	// 	if (harvest(creep, target)) return;
	// }
};

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(39);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _upgrader = __webpack_require__(41);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(33);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(40);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(35);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farBuilder = __webpack_require__(36);

Object.defineProperty(exports, 'farBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farBuilder).default;
  }
});

var _farHarvester = __webpack_require__(37);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(38);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _claim = __webpack_require__(34);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(0);

exports.default = function (spawn, my, config) {
	if (spawn.spawning) {
		var percent = Math.round((1 - spawn.spawning.remainingTime / spawn.spawning.needTime) * 100);
		spawn.room.visual.text([_util.emoji.build, spawn.spawning.name.split('#')[0], '(' + percent + '%)'].join(' '), spawn.pos.x + 1, spawn.pos.y, {
			align: 'left',
			stroke: '#111111',
			color: '#ffffff'
		});
		return;
	}

	var roleFactory = config.role;
	var priority = false;
	roleFactory.forEach(function (roleType) {
		var roleName = roleType.role;
		var roleTimeout = roleType.timeout ? roleType.timeout : 10;
		var roleMy = _.filter(my[roleName], function (roleCreep) {
			return roleCreep.ticksToLive > roleTimeout;
		});
		var roleNumber = roleType.number - roleMy.length;
		if (roleNumber <= 0 || priority) return;
		var spawnName = buildName(roleName);
		spawn.createCreep(buildBody(roleType.body), spawnName, { role: roleName, name: spawnName });
		console.log('[Spawn]', spawnName);
		priority = true;
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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(44);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(43);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(2);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _container = __webpack_require__(3);

var _container2 = _interopRequireDefault(_container);

var _task = __webpack_require__(2);

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
/* 48 */
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
	return;
};

/***/ })
/******/ ]);