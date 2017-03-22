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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findMiner = __webpack_require__(26);

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

var _harvester = __webpack_require__(27);

Object.defineProperty(exports, 'taskHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _pathFinder = __webpack_require__(28);

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


__webpack_require__(4);

var _manager = __webpack_require__(13);

var Manager = _interopRequireWildcard(_manager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var roomName = 'W81S67';
var room = Game.rooms[roomName];
var roomNext = Game.rooms['W81S66'];
module.exports.loop = function () {
	// PathFinder.use(true);
	// cleanr
	for (var name in Memory.creeps) {
		!Game.creeps[name] ? delete Memory.creeps[name] : null;
		if (!Game.creeps[name].memory || !Game.creeps[name].memory.role) {
			Game.creeps[name].memory = {
				role: name.split('#')[0]
			};
		}
	}
	// start
	Manager.memory(room);
	Manager.role(room);

	if (roomNext) {
		Manager.memory(roomNext);
		Manager.role(roomNext);
	}

	Manager.structure(room);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var room = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.rooms['W81S67'];

    var needBuild = [];
    var friends = ["Ruo", "FanHua"];
    var repair = {
        percent: 0.5,
        maxHits: 10000
    };
    var role = [{
        role: "claim",
        body: { move: 1, claim: 1 },
        number: 1,
        priority: 7
    }, {
        role: "farMiner",
        body: { move: 3, work: 4, carry: 3 },
        number: 1,
        priority: 4
    }, {
        role: 'farHarvester',
        body: { move: 4, work: 0, carry: 4 },
        number: 4,
        priority: 5
    }, {
        role: 'harvester',
        body: { move: 4, work: 0, carry: 8 },
        number: 6,
        priority: 2
    }, {
        role: 'upgrader',
        body: { move: 1, work: 4, carry: 2 },
        number: 2,
        priority: 3
    }, {
        role: 'builder',
        body: { move: 3, work: 3, carry: 3 },
        number: needBuild.length / 2 < 4 ? needBuild.length / 2 : 4,
        priority: 6
    }, {
        role: "miner",
        body: { move: 3, work: 8, carry: 1 },
        number: 3,
        priority: 1
    }, {
        role: 'cleaner',
        body: { move: 2, work: 1, carry: 2 },
        number: 1,
        priority: 0
    }];

    return {
        role: role.sort(function (a, b) {
            return a.priority - b.priority;
        }),
        friends: friends,
        repair: repair
    };
};

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

exports.default = function (x, y, type) {
	if (x && y && type) {
		console.log('[Build] ' + type + ' in x:' + x + ' y:' + y, Game.spawns['Spawn1'].room.createConstructionSite(x, y, type));
	} else {
		console.log('You can build: ' + ['spawn', 'extension', 'road', 'constructedWall', 'rampart', 'keeperLair', 'portal', 'controller', 'link', 'storage', 'tower', 'observer', 'powerBank', 'powerSpawn', 'extractor', 'lab', 'terminal', 'container', 'nuker'].join('|'));
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (owner) {
	return _config2.default.friends.toString().match(owner) ? true : false;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (title) {
	var _console;

	for (var _len = arguments.length, content = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		content[_key - 1] = arguments[_key];
	}

	if (Memory.log[title]) (_console = console).log.apply(_console, ["[" + title + "]"].concat(content));
};

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

var _timer = __webpack_require__(8);

Object.defineProperty(exports, 'Timer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_timer).default;
  }
});

var _build = __webpack_require__(5);

Object.defineProperty(exports, 'Build', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_build).default;
  }
});

var _log = __webpack_require__(7);

Object.defineProperty(exports, 'log', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_log).default;
  }
});

var _isFriend = __webpack_require__(6);

Object.defineProperty(exports, 'isFriend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFriend).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _util = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (room) {
    var config = (0, _config2.default)(room);
    var structures = room.find(FIND_STRUCTURES),
        myStructures = _.filter(structures, function (structure) {
        return structure.my;
    }),
        otherStructures = _.filter(structures, function (structure) {
        return !structure.my;
    }),
        container = _.filter(otherStructures, function (structure) {
        return structure.structureType == STRUCTURE_CONTAINER;
    }),
        storage = room.storage;
    var creeps = room.find(FIND_CREEPS),
        myCreeps = _.filter(creeps, function (creep) {
        return creep.my;
    }),
        otherCreeps = _.filter(creeps, function (creep) {
        return !creep.my;
    }),
        my = creepRole(myCreeps, config.role);
    var sources = room.find(FIND_SOURCES);

    var dock = container;

    if (dock.length > 0 && storage) {
        dock[dock.length] = storage;
    } else {
        dock = dock ? dock : [];
    }
    var sourceMiner = function sourceMiner(rawSources) {
        var sources = [];
        rawSources.forEach(function (source) {
            var minerNumber = 0;
            my.miner.forEach(function (creep) {
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

    var memory = {
        energyAvailable: room.energyAvailable,
        creeps: {
            my: my,
            friend: _.filter(otherCreeps, function (creep) {
                return (0, _util.isFriend)(creep.owner.username);
            }),
            enemy: _.filter(otherCreeps, function (creep) {
                return !(0, _util.isFriend)(creep.owner.username);
            })
        },
        structures: {
            terminal: room.terminal,
            controller: room.controller,
            storage: storage,
            tower: _.filter(myStructures, function (structure) {
                return structure.structureType == STRUCTURE_TOWER;
            })[0],
            spawn: _.filter(myStructures, function (structure) {
                return structure.structureType == STRUCTURE_SPAWN;
            })[0],
            container: container,
            canWithdraw: _.filter(dock, function (structure) {
                return structure.store.energy > 0;
            }),
            canFill: _.filter(dock, function (structure) {
                return structure.store.energy < structure.storeCapacity;
            }),
            needFill: _.filter(myStructures, function (structure) {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }),
            needFix: _.filter(structures, function (structure) {
                return (structure.my || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_WALL) && structure.hits / structure.hitsMax < config.repair.percent && structure.hits < config.repair.maxHits;
            }),
            needBuild: room.find(FIND_MY_CONSTRUCTION_SITES)
        },
        sources: sourceMiner(sources),
        dropped: {
            energy: room.find(FIND_DROPPED_ENERGY)
        },
        config: config
    };
    room.memory = memory;
};

function creepRole(myCreeps, configRole) {
    var my = {};
    configRole.forEach(function (role) {
        my[role.role] = _.filter(myCreeps, function (creep) {
            return creep.name.split('#')[0] == role.role;
        });
    });
    return my;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _role = __webpack_require__(22);

var role = _interopRequireWildcard(_role);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import config from '../config'
exports.default = function (room) {
    var Memory = room.memory;
    var targetStructures = Memory.structures;
    var myCreeps = Memory.creeps.my;
    var dropped = Memory.dropped ? Memory.dropped.energy : [];
    var newRoom = new RoomPosition(25, 47, 'W81S66');

    // creepRoleRun(myCreep, config(room).role)

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
        return role.builder(creep, targetStructures.needBuild);
    });
    myCreeps.cleaner.forEach(function (creep) {
        return role.cleaner(creep, dropped);
    });
    // far
    myCreeps.farHarvester.forEach(function (creep) {
        return role.farHarvester(creep);
    });
    myCreeps.farMiner.forEach(function (creep) {
        return role.farMiner(creep, newRoom);
    });
    myCreeps.claim.forEach(function (creep) {
        return role.claim(creep, newRoom);
    });
};

// function creepRoleRun(myCreeps, configRole) {
// 	configRole.forEach(roleName => {
// 		myCreeps[roleName].forEach(creep=> role[roleName](creep))
// 	})
// }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _structure = __webpack_require__(25);

var structure = _interopRequireWildcard(_structure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (room) {
    var Memory = room.memory;
    var targetStructures = Memory.structures;
    var targetCreeps = Memory.creeps;
    var config = Memory.config;
    structure.spawn(targetStructures.spawn, targetCreeps.my, config);
    structure.tower(targetStructures.tower, targetStructures.needFix, targetCreeps.enemy);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memory = __webpack_require__(10);

Object.defineProperty(exports, 'memory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_memory).default;
  }
});

var _structure = __webpack_require__(12);

Object.defineProperty(exports, 'structure', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_structure).default;
  }
});

var _role = __webpack_require__(11);

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

var _task = __webpack_require__(0);

exports.default = function (creep, needBuild) {

	if (creep.carry.energy == 0) {
		creep.memory.canBuild = false;
	}

	if (creep.carry.energy == creep.carryCapacity) {
		creep.memory.canBuild = true;
	}

	if (needBuild.length > 0) {
		if (creep.memory.canBuild) {
			var buildTarget = creep.pos.findClosestByRange(needBuild);
			buildTarget && creep.build(buildTarget) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, buildTarget) : null;
		} else {
			var canWithdraw = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
			canWithdraw && creep.withdraw(canWithdraw, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, canWithdraw) : null;
		}
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

exports.default = function (creep, newRoom) {
	"use strict";

	var controller = Game.getObjectById('5873bc3511e3e4361b4d738f');
	if (!controller) {
		(0, _task.pathFinder)(creep, newRoom);
	} else {
		creep.reserveController(controller) !== OK ? (0, _task.pathFinder)(creep, controller) : null;
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
  var dropped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  if (creep.carry.energy < creep.carryCapacity) {
    if (dropped.length > 0) {
      var pickupTarget = creep.pos.findClosestByPath(dropped);
      pickupTarget && creep.pickup(pickupTarget) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, pickupTarget) : null;
    } else {
      var transferTarget = creep.room.memory.structures.container.sort(function (a, b) {
        return b.store.enengy - a.store.enengy;
      });
      transferTarget && creep.withdraw(transferTarget[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, transferTarget[0]) : null;
    }
  } else {

    var needFill = creep.room.memory.structures.needFill;
    var needFillTarget = void 0;
    if (needFill.length > 0) {
      needFillTarget = creep.pos.findClosestByRange(needFill);
    } else {
      needFillTarget = creep.room.storage;
    }
    needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, needFillTarget) : null;
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {
    var room = Game.spawns['Spawn1'].room;
    var farMiner = creep.room.memory.creeps.my.farMiner;

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep, newRoom) {

    if (creep.carry.energy == 0) {
        creep.memory.canHarvest = true;
    }

    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.canHarvest = false;
        var targets = creep.pos.findInRange(creep.room.memory.creeps.my.farHarvester, 1, {
            filter: function filter(targetCreep) {
                return targetCreep.carry.energy < targetCreep.carryCapacity;
            }
        });
        if (targets.length > 0) {
            creep.transfer(targets[0], RESOURCE_ENERGY);
        } else {
            var needBuild = creep.room.memory.structures.needBuild;
            var buildTarget = creep.pos.findClosestByRange(needBuild);
            console.log(needBuild, buildTarget)(buildTarget && creep.build(buildTarget) == ERR_NOT_IN_RANGE) ? (0, _task.pathFinder)(creep, buildTarget) : null;
        }
    }

    if (creep.memory.canHarvest) {
        var source = Game.getObjectById('5873bc3511e3e4361b4d7390');
        if (!source) {
            (0, _task.pathFinder)(creep, newRoom);
        } else {
            creep.harvest(source) !== OK ? (0, _task.pathFinder)(creep, source) : null;
        }
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep) {
    var dropped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    if (creep.carry.energy == 0) {
        creep.memory.full = false;
    }

    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.full = true;
    }

    if (!creep.memory.full) {
        if (dropped.length > 0) {
            var pickupTarget = creep.pos.findInRange(dropped, 5);
            console.log(pickupTarget);
            pickupTarget.length > 0 && creep.pickup(pickupTarget[0]) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, pickupTarget[0]) : null;
        } else {
            var transferTarget = creep.room.memory.structures.container.sort(function (a, b) {
                return b.store.enengy - a.store.enengy;
            });
            transferTarget && creep.withdraw(transferTarget[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, transferTarget[0]) : null;
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
        needFillTarget && creep.transfer(needFillTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, needFillTarget) : null;
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep, sources) {
	var dropped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


	if (creep.carry.energy == creep.carryCapacity) {
		var canFill = creep.pos.findInRange(creep.room.memory.structures.canFill, 4);
		canFill.length > 0 && creep.transfer(canFill[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, canFill[0]) : null;
	}

	if (!creep.memory.harvestTarget) {
		creep.memory.harvestTarget = sources[0].source.id;
	}

	if (creep.carry.energy < creep.carryCapacity && creep.memory.harvestTarget) {
		if (dropped.length > 0) {
			var pickupTarget = creep.pos.findInRange(dropped, 0);
			if (pickupTarget.length > 0 && creep.pickup(pickupTarget[0]) == OK) creep.say('pickup');
		} else {
			var harvestTarget = Game.getObjectById(creep.memory.harvestTarget);
			creep.harvest(harvestTarget) == ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, harvestTarget) : null;
		}
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = __webpack_require__(0);

exports.default = function (creep, controller) {
	if (creep.memory.upgrading && creep.carry.energy == 0) {
		creep.memory.upgrading = false;
	}
	if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
		creep.memory.upgrading = true;
		creep.say('UP');
	}

	if (creep.memory.upgrading) {
		if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) (0, _task.pathFinder)(creep, controller);
	} else {
		var canWithdraw = creep.pos.findClosestByRange(creep.room.memory.structures.canWithdraw);
		canWithdraw && creep.withdraw(canWithdraw, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ? (0, _task.pathFinder)(creep, canWithdraw) : null;
	}
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _harvester = __webpack_require__(19);

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_harvester).default;
  }
});

var _upgrader = __webpack_require__(21);

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_upgrader).default;
  }
});

var _builder = __webpack_require__(14);

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_builder).default;
  }
});

var _miner = __webpack_require__(20);

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_miner).default;
  }
});

var _cleaner = __webpack_require__(16);

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cleaner).default;
  }
});

var _farHarvester = __webpack_require__(17);

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farHarvester).default;
  }
});

var _farMiner = __webpack_require__(18);

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_farMiner).default;
  }
});

var _claim = __webpack_require__(15);

Object.defineProperty(exports, 'claim', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_claim).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (spawn, my, config) {
    if (spawn.spawning) return;
    var priority = false;
    var roleFactory = config.role;
    roleFactory.forEach(function (roleType) {
        var roleNmae = roleType.role;
        var roleNumber = roleType.number - my[roleNmae].length;
        if (roleNumber <= 0 || priority) return;
        var spawnName = buildName(roleNmae);
        spawn.createCreep(buildBody(roleType.body), spawnName, { role: roleNmae });
        if (spawn.spawning) {
            console.log('Spawn', spawnName);
            spawn.room.visual.text('[Spawn] ' + spawnName, spawn.pos.x + 1, spawn.pos.y, { align: 'left', opacity: 0.8 });
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tower = __webpack_require__(24);

Object.defineProperty(exports, "tower", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tower).default;
  }
});

var _spawn = __webpack_require__(23);

Object.defineProperty(exports, "spawn", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_spawn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _task = __webpack_require__(0);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _container = __webpack_require__(3);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (creep, target) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';

    if (creep.fatigue > 0) return;
    creep.moveTo(target, { reusePath: 6, visualizePathStyle: { stroke: color } });
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);