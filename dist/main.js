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

var _findMiner = __webpack_require__(21);

Object.defineProperty(exports, 'taskFindMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findMiner).default;
  }
});

var _container = __webpack_require__(4);

Object.defineProperty(exports, 'taskContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_container).default;
  }
});

var _harvester = __webpack_require__(22);

Object.defineProperty(exports, 'taskHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _pathFinder = __webpack_require__(23);

Object.defineProperty(exports, 'pathFinder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pathFinder).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

var _role = __webpack_require__(17);

var role = _interopRequireWildcard(_role);

var _structure = __webpack_require__(20);

var structure = _interopRequireWildcard(_structure);

var _util = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mySpawn = Game.spawns['Spawn1'];

module.exports.loop = function () {

	mySpawn.room.memory = {
		structures: mySpawn.room.find(FIND_STRUCTURES),
		constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES),
		source: mySpawn.room.find(FIND_SOURCES),
		miner: mySpawn.room.find(FIND_MY_CREEPS, { filter: function filter(miner) {
				return miner.memory.role === "miner";
			} }),
		drop: mySpawn.room.find(FIND_DROPPED_ENERGY)
	};

	var targetsHarvest = mySpawn.room.memory.structures.filter(function (structure) {
		return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
	});
	var targetsBuild = mySpawn.room.memory.constructionSites;
	var targetsPickup = mySpawn.room.memory.drop;

	for (var name in mySpawn.room.memory.structures) {
		var structureName = mySpawn.room.memory.structures[name];
		switch (structureName.structureType) {
			case 'spawn':
				structure.spawn(structureName);
				break;
			case 'tower':
				structure.tower(structureName);
				break;
		}
	}

	for (var _name in Game.creeps) {
		var creep = Game.creeps[_name];
		switch (creep.memory.role) {
			case 'claim':
				role.claim(creep);
				break;
			case 'farMiner':
				role.farMiner(creep);
				break;
			case 'farHarvester':
				role.farHarvester(creep);
				break;
			case 'harvester':
				role.harvester(creep);
				break;
			case 'upgrader':
				role.upgrader(creep);
				break;
			case 'builder':
				targetsBuild.length > 0 ? role.builder(creep) : role.harvester(creep);
				break;
			case 'miner':
				role.miner(creep);
				break;
			case 'cleaner':
				targetsPickup.length > 0 ? role.cleaner(creep) : role.harvester(creep);
				break;
		}
	}

	if ((0, _util.Timer)(10)) {
		console.log(['[Log]', 'Harvest:', targetsHarvest.length, 'Build:', targetsBuild.length, 'Pickup:', targetsPickup.length].join(' '));
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var role = [{
	role: "claim",
	body: { move: 1, claim: 1 },
	number: [1],
	priority: 7
}, {
	role: "farMiner",
	body: { move: 3, work: 4, carry: 3 },
	number: [1],
	priority: 4
}, {
	role: 'farHarvester',
	body: { move: 4, work: 1, carry: 4 },
	number: [4],
	priority: 5
}, {
	role: 'harvester',
	body: { move: 4, work: 1, carry: 6 },
	number: [0, 2],
	priority: 1
}, {
	role: 'upgrader',
	body: { move: 1, work: 4, carry: 2 },
	number: [2],
	priority: 3
}, {
	role: 'builder',
	body: { move: 3, work: 3, carry: 3 },
	number: [0, 1],
	priority: 6
}, {
	role: "miner",
	body: { move: 2, work: 5, carry: 1 },
	number: [1, 2],
	priority: 2
}, {
	role: 'cleaner',
	body: { move: 2, work: 1, carry: 2 },
	number: [1],
	priority: 8
}];

var repair = function repair(structure) {
	return structure.hits / structure.hitsMax < 0.5 && structure.hits < 10000;
};

/*
 "move": 50,
 "work": 100,
 "attack": 80,
 "carry": 50,
 "heal": 250,
 "ranged_attack": 150,
 "tough": 10,
 "claim": 600
 */

exports.default = {
	role: role.sort(function (a, b) {
		return a.priority - b.priority;
	}),
	repair: repair
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timer = __webpack_require__(8);

Object.defineProperty(exports, 'Timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timer).default;
  }
});

var _build = __webpack_require__(6);

Object.defineProperty(exports, 'Build', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _findDireciton = __webpack_require__(7);

Object.defineProperty(exports, 'findDireciton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_findDireciton).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (pos, nextPos) {

    var directonArray = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

    var directionFix = [],
        directonPos = [nextPos.x - pos.x, nextPos.y - pos.y];

    for (var i = 0; i < directonArray.length; i++) {
        if (directonArray[i].toString() == directonPos.toString()) {
            var nextI = i + 1 <= 7 ? i + 1 : 0,
                beforeI = i - 1 >= 0 ? i - 1 : 7;

            directionFix.push(directonArray[nextI]);
            directionFix.push(directonArray[beforeI]);
        }
    }
    // return {
    //     direction      : Direciton(directonPos),
    //     directionFix   : [Direciton(directionFix[0]), Direciton(directionFix[1])],
    //     directionFixPos: [
    //         DirecitonFixPos(pos, directionFix[0], nextPos.roomName),
    //         DirecitonFixPos(pos, directionFix[1], nextPos.roomName)
    //     ],
    // }

    return [DirecitonFixPos(pos, directionFix[0], nextPos.roomName), DirecitonFixPos(pos, directionFix[1], nextPos.roomName)];
};

function DirecitonFixPos(creep, pos, roomName) {
    return new RoomPosition(creep.x + pos[0], creep.y + pos[1], roomName);
}

//
// function Direciton(pos = [0, 0]) {
//     let directon;
//     switch (pos.toString()) {
//         case '0,-1':
//             directon = TOP
//             break
//         case '1,-1':
//             directon = TOP_RIGHT
//             break
//         case '1,0':
//             directon = RIGHT
//             break
//         case '1,1':
//             directon = BOTTOM_RIGHT
//             break
//         case '0,1':
//             directon = BOTTOM
//             break
//         case '-1,1':
//             directon = BOTTOM_LEFT
//             break
//         case '-1,0':
//             directon = LEFT
//             break
//         case '-1,-1':
//             directon = TOP_LEFT
//             break
//     }
//
//     return directon;
// }

// TOP         : 1,
// TOP_RIGHT   : 2,
// RIGHT       : 3,
// BOTTOM_RIGHT: 4,
// BOTTOM      : 5,
// BOTTOM_LEFT : 6,
// LEFT        : 7,
// TOP_LEFT    : 8,

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (creep) {

	if (creep.memory.building && creep.carry.energy == 0) {
		creep.memory.building = false;
	}
	if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		creep.memory.building = true;
		creep.say('[B]build');
	}

	if (creep.memory.building) {
		var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES),
		    halfBroken = creep.pos.findInRange(FIND_STRUCTURES, 5, {
			filter: function filter(structure) {
				return _config2.default.repair(structure) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART;
			}
		})[0];

		halfBroken && creep.repair(halfBroken) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, halfBroken) : null;

		targets && creep.build(targets) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, targets) : null;
	} else {
		(0, _task.taskFindMiner)(creep);
	}
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {
	"use strict";

	var controller = Game.getObjectById('5873bc3511e3e4361b4d738f');

	if (!controller) {
		creep.moveTo(new RoomPosition(27, 21, 'W81S66'));
	} else {
		creep.reserveController(controller) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, controller) : null;
	}
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {
		var pickup = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
		pickup && creep.pickup(pickup) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, pickup) : null;
	} else {
		(0, _task.taskHarvester)(creep);
	}
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {
	var room = 'W81S66';
	var myRoom = Game.spawns['Spawn1'];
	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {
		var source = Game.getObjectById('5873bc3511e3e4361b4d7390');
		if (!source) {
			creep.moveTo(new RoomPosition(27, 21, room));
		} else {
			var miner = creep.pos.findInRange(FIND_MY_CREEPS, 5, { filter: function filter(creepRole) {
					return creepRole.memory.role == 'farMiner';
				} })[0];
			if (!miner) {
				creep.harvest(source) == ERR_NOT_IN_RANGE ? creep.moveTo(source) : null;
			} else {
				creep.moveTo(miner);
			}
		}
	} else {
		if (creep.room.name !== myRoom.room.name) {
			creep.moveTo(myRoom);
			creep.moveTo(myRoom, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
		} else {
			(0, _task.taskHarvester)(creep);
		}
	}
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {

	if (creep.carry.energy < creep.carryCapacity) {
		var source = Game.getObjectById('5873bc3511e3e4361b4d7390');

		if (!source) {
			creep.moveTo(new RoomPosition(27, 21, 'W81S66'));
		} else {

			creep.harvest(source) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, source) : null;
		}
	}
	if (creep.carry.energy >= 50) {
		var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
			filter: function filter(tCreep) {
				return tCreep.memory.role !== 'miner';
			}
		});

		var maxNum = 0,
		    maxName = void 0;
		for (var name in targets) {
			var num = targets[name].carryCapacity - targets[name].carry.energy;
			if (num > maxNum) {
				maxNum = num;
				maxName = name;
			}
		}

		if (maxName, maxNum != 0) {
			creep.transfer(targets[maxName], RESOURCE_ENERGY, maxNum > creep.carry.energy ? creep.carry.energy : maxNum);
			creep.say('transfer:' + maxNum);
		}
	}
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {

	if (creep.carry.energy == 0) {
		creep.memory.full = false;
	}
	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.full = true;
	}

	if (!creep.memory.full) {

		var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
		pickup.length > 0 && creep.pickup(pickup[0]) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, pickup[0]) : (0, _task.taskFindMiner)(creep);
	} else {
		(0, _task.taskHarvester)(creep);
	}
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {

	if (creep.carry.energy < creep.carryCapacity) {
		var source = creep.room.memory.source[creep.memory.source];
		var pickup = creep.pos.findInRange(FIND_DROPPED_ENERGY, 0);
		if (pickup.length > 0 && creep.pickup(pickup[0]) == OK) {
			creep.say('pickup');
		} else {
			creep.harvest(source) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, source) : null;
		}
	}
	if (creep.carry.energy >= 50) {
		var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
			filter: function filter(tCreep) {
				return tCreep.memory.role !== 'miner';
			}
		});
		var farTargets = creep.pos.findInRange(FIND_MY_CREEPS, 4, {
			filter: function filter(tCreep) {
				return tCreep.memory.role !== 'miner';
			}
		});

		var maxNum = 0,
		    maxName = void 0;
		for (var name in targets) {
			var num = targets[name].carryCapacity - targets[name].carry.energy;
			if (num > maxNum) {
				maxNum = num;
				maxName = name;
			}
		}

		if (maxName, maxNum != 0) {
			creep.transfer(targets[maxName], RESOURCE_ENERGY);
			creep.say('transfer:' + maxNum);
		} else if (!farTargets[0]) {
			var targetsContainer = creep.pos.findInRange(FIND_STRUCTURES, 6, { filter: function filter(structure) {
					return structure.structureType == STRUCTURE_CONTAINER && structure.store["energy"] < structure.storeCapacity;
				} })[0];
			if (targetsContainer) {
				if (creep.transfer(targetsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetsContainer, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
				}
			} else {
				var targetsBuild = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 6)[0];
				if (creep.build(targetsBuild) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetsBuild, { visualizePathStyle: { reusePath: 8, stroke: '#ffffff' } });
				}
			}
		}
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy > 50) {
        creep.memory.upgrading = true;
        creep.say('[U]upgrade');
    }

    if (creep.memory.upgrading) {
        var controller = creep.room.controller;
        creep.moveTo(controller, { reusePath: 8, visualizePathStyle: { stroke: '#ffffff' } });
        creep.upgradeController(controller);
    } else {
        (0, _task.taskFindMiner)(creep);
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(14);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _upgrader = __webpack_require__(16);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(9);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(15);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(11);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farHarvester = __webpack_require__(12);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(13);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _claim = __webpack_require__(10);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var factory = _config2.default.role;

exports.default = function (spawn) {

	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log(['[Clean]', name].join(' '));
		}
	}

	var _loop = function _loop(_name) {

		var role = factory[_name].role,
		    body = buildBody(factory[_name].body),
		    number = factory[_name].number,
		    numberSum = _.sum(number);

		var _loop2 = function _loop2(i) {
			var nowNumber = _.filter(Game.creeps, function (creep) {
				return creep.memory.role == role && creep.memory.source == i;
			}).length;

			if (number[i] > nowNumber) {

				if (Game.spawns['Spawn1'].canCreateCreep(body) === OK) {
					var _name2 = role + '#' + getNowFormatDate();
					Game.spawns['Spawn1'].createCreep(body, _name2, { role: role, source: i });
					console.log(['[Spawn]', _name2, 'Source:', i].join(' '));
				} else {
					return {
						v: {
							v: void 0
						}
					};
				}
			}
		};

		for (var i in number) {
			var _ret2 = _loop2(i);

			if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
		}
	};

	for (var _name in factory) {
		var _ret = _loop(_name);

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	if (spawn.spawning) {
		var spawningCreep = Game.creeps[spawn.spawning.name];
		spawn.room.visual.text('[Spawn] ' + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, { align: 'left', opacity: 0.8 });
	}
};

function getNowFormatDate() {
	var date = new Date();
	return [date.getHours(), date.getMinutes(), date.getSeconds()].join('');
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (tower) {
    if (tower.energy > 0) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: function filter(structure) {
                return _config2.default.repair(structure);
            } });
        closestDamagedStructure ? tower.repair(closestDamagedStructure) : null;
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        closestHostile && closestHostile.owner != "Ruo" ? tower.attack(closestHostile) : null;
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(19);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(18);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

var taskFindMiner = function taskFindMiner(creep) {
	var source = creep.room.memory.source[creep.memory.source];
	if (source.energy > 0) {

		var miner = creep.room.memory.miner.filter(function (miner) {
			return creep.memory.source === miner.memory.source && miner.carry.energy > 0;
		});

		var minerTarget = void 0,
		    minerEnergy = 0;

		for (var i = 0; i < miner.length; i++) {
			if (minerEnergy < miner[i].carry.energy) {
				minerTarget = miner[i];
				minerEnergy = miner[i].carry.energy;
			}
		}

		if (minerTarget && minerEnergy >= 50) {
			(0, _task.pathFinder)(creep, minerTarget);
		} else {
			creep.harvest(source) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, source) : null;
		}
	} else {
		var targetsContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: function filter(structure) {
				return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store["energy"] > 0;
			}
		});

		if (creep.withdraw(targetsContainer, 'energy') == ERR_NOT_IN_RANGE) {
			(0, _task.pathFinder)(creep, targetsContainer);
		}
	}
};

exports.default = taskFindMiner;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _container = __webpack_require__(4);

var _container2 = _interopRequireDefault(_container);

var _task = __webpack_require__(0);

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
        (0, _container2.default)(creep);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(3);

exports.default = function (creep, target) {

    if (creep.memory.lastPos && creep.pos.x == creep.memory.lastPos.x && creep.pos.y == creep.memory.lastPos.y && creep.fatigue == 0) {
        creep.moveTo(target);
        delete creep.memory.path;
        delete creep.memory.lastPos;
        console.log('pathFinder Debug');
        return;
    }
    var Pos = creep.pos;
    var targetPos = target.pos;
    var Path = void 0;

    if (!creep.memory.path) {

        Path = PathFinder.search(Pos, targetPos, { maxRooms: 2 }).path;
        var NextPos = Path[0];

        if (!hasRoad(NextPos)) {
            var Direciton = (0, _util.findDireciton)(Pos, NextPos);
            if (hasRoad(Direciton[0])) {
                Path[0] = Direciton[0];
            } else if (hasRoad(Direciton[1])) {
                Path[0] = Direciton[1];
            }
        }
    } else {
        Path = creep.memory.path;
    }

    if (creep.moveByPath(Path) == 0) {
        Path.shift();
    } else {
        delete creep.memory.path;
        delete creep.memory.lastPos;
    }
    creep.memory.lastPos = Pos;
    creep.memory.path = Path;
};

function hasRoad(pos) {
    var hasRoad = pos.lookFor(LOOK_STRUCTURES).filter(function (lookObject) {
        return lookObject.structureType == 'road';
    });
    var hasCreep = pos.lookFor(LOOK_CREEPS);
    return hasRoad.length > 0 && hasCreep.length == 0 ? true : false;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);