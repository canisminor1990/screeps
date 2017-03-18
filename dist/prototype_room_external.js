'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.checkBlocked = function () {
  var exits = Game.map.describeExits(this.name);
  var room = this;
  var roomCallback = function roomCallback(roomName) {
    var costMatrix = new PathFinder.CostMatrix();
    var structures = room.find(FIND_STRUCTURES);
    for (var _iterator = structures, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

      var structure = _ref;

      costMatrix.set(structure.pos.x, structure.pos.y, 0xFF);
    }
    return costMatrix;
  };
  for (var fromDirection in exits) {
    var fromExitDirection = this.findExitTo(exits[fromDirection]);
    var fromExitPoss = this.find(fromExitDirection);
    var fromNextExit = fromExitPoss[Math.floor(fromExitPoss.length / 2)];
    for (var toDirection in exits) {
      if (fromDirection === toDirection) {
        continue;
      }

      var toExitDirection = this.findExitTo(exits[toDirection]);
      var toExitPoss = this.find(toExitDirection);
      var toNextExit = toExitPoss[Math.floor(toExitPoss.length / 2)];

      var search = PathFinder.search(fromNextExit, toNextExit, {
        maxRooms: 0,
        roomCallback: roomCallback
      });
      if (search.incomplete) {
        return true;
      }
    }
  }
  return false;
};

Room.prototype.externalHandleRoom = function () {
  if (!this.controller) {
    var nameSplit = this.splitRoomName();
    if (nameSplit[2] % 10 === 0 || nameSplit[4] % 10 === 0) {
      return this.externalHandleHighwayRoom();
    }
  } else {
    if (this.controller.owner) {
      return this.handleOccupiedRoom();
    }

    if (this.controller.reservation && this.controller.reservation.username === Memory.username) {
      return this.handleReservedRoom();
    }
  }

  if (!this.memory.blockedCheck || Game.time - this.memory.blockedCheck > 100000) {
    this.memory.blockedCheck = Game.time;
    var blocked = this.checkBlocked();
    if (blocked) {
      this.memory.lastSeen = Game.time;
      this.memory.state = 'Blocked';
    }
  }

  if (this.controller && !this.controller.reservation) {
    if (this.handleUnreservedRoom()) {
      return false;
    }
  }

  if (!this.controller) {
    var sourceKeeper = this.find(FIND_HOSTILE_STRUCTURES, {
      filter: function filter(object) {
        return object.owner.username === 'Source Keeper';
      }
    });

    if (sourceKeeper.length > 0) {
      this.memory.lastSeen = Game.time;
      this.handleSourceKeeperRoom();
      return false;
    }
  }

  delete Memory.rooms[this.roomName];
  return false;
};

Room.prototype.externalHandleHighwayRoom = function () {
  if (config.power.disabled) {
    return false;
  }

  var structures = this.findPropertyFilter(FIND_STRUCTURES, 'structureType', [STRUCTURE_POWER_BANK]);
  if (structures.length === 0) {
    if (Memory.powerBanks) {
      delete Memory.powerBanks[this.name];
    }
    return false;
  }

  if (Memory.powerBanks && Memory.powerBanks[this.name]) {
    if (Memory.powerBanks[this.name].target && Memory.powerBanks[this.name] !== null) {
      if (Memory.powerBanks[this.name].transporter_called) {
        return;
      }
      if (structures[0].hits < 300000) {
        for (var i = 0; i < Math.ceil(structures[0].power / 1000); i++) {
          this.log('Adding powertransporter at ' + Memory.powerBanks[this.name].target);
          Game.rooms[Memory.powerBanks[this.name].target].memory.queue.push({
            role: 'powertransporter',
            routing: {
              targetRoom: this.name
            }
          });
        }

        Memory.powerBanks[this.name].transporter_called = true;
      }
    }
    return;
  }

  if (structures[0].ticksToDecay < 3000) {
    Memory.powerBanks[this.name] = {
      target: null
    };
    return true;
  } else {
    var min_route = 6;
    var target = null;
    var route;
    for (var room_id in Memory.myRooms) {
      var room = Game.rooms[Memory.myRooms[room_id]];
      if (!room || !room.storage || room.storage.store.energy < config.power.energyForCreeps) {
        continue;
      }
      var route_to_test = Game.map.findRoute(this.name, room.name);
      if (route_to_test.length < min_route) {
        min_route = route_to_test.length;
        target = room;
        route = route_to_test;
      }
    }

    if (!Memory.powerBanks) {
      Memory.powerBanks = {};
    }
    if (target !== null) {
      Memory.powerBanks[this.name] = {
        target: target.name,
        min_route: min_route
      };
      this.log('--------------> Start power harvesting in: ' + target.name + ' <----------------');
      Game.rooms[target.name].memory.queue.push({
        role: 'powerattacker',
        routing: {
          targetRoom: this.name
        }
      });
      Game.rooms[target.name].memory.queue.push({
        role: 'powerhealer',
        routing: {
          targetRoom: this.name
        }
      });
      Game.rooms[target.name].memory.queue.push({
        role: 'powerhealer',
        routing: {
          targetRoom: this.name
        }
      });
    } else {
      Memory.powerBanks[this.name] = {
        target: null
      };
    }
  }
};

Room.prototype.handleOccupiedRoom = function () {
  this.memory.lastSeen = Game.time;
  var hostiles = this.find(FIND_HOSTILE_CREEPS);
  if (hostiles.length > 0) {
    // TODO replace with enum
    this.memory.state = 'Occupied';
    this.memory.player = this.controller.owner.username;

    // TODO trigger everytime?
    if (!this.controller.safeMode) {
      var myCreeps = this.find(FIND_MY_CREEPS, {
        filter: function filter(object) {
          var creep = Game.getObjectById(object.id);
          if (creep.memory.role === 'scout') {
            return false;
          }
          return true;
        }
      });
      if (myCreeps.length > 0) {
        return false;
      }
      var spawns = this.findPropertyFilter(FIND_HOSTILE_STRUCTURES, 'structureType', [STRUCTURE_SPAWN]);
      if (spawns.length > 0) {
        this.attackRoom();
      }
    }

    return false;
  }
};

Room.prototype.checkBlockedPath = function () {
  for (var pathName in this.getMemoryPaths()) {
    var path = this.getMemoryPath(pathName) || {};
    for (var _iterator2 = path, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) {
          break;
        }

        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();

        if (_i2.done) {
          break;
        }

        _ref2 = _i2.value;
      }

      var pos = _ref2;

      var roomPos = new RoomPosition(pos.x, pos.y, this.name);
      var structures = roomPos.lookFor('structure');

      for (var _iterator3 = structures, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) {
            break;
          }

          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();

          if (_i3.done) {
            break;
          }

          _ref3 = _i3.value;
        }

        var structure = _ref3;

        if (structure.structureType === STRUCTURE_ROAD) {
          continue;
        }
        if (structure.structureType === STRUCTURE_RAMPART) {
          continue;
        }
        if (structure.structureType === STRUCTURE_CONTAINER) {
          continue;
        }
        this.log('Path ' + pathName + ' blocked on ' + pos + ' due to ' + structure.structureType);
        return true;
      }
    }
  }
};

Room.prototype.checkAndSpawnReserver = function () {
  var reservation = this.memory.reservation;
  if (reservation === undefined) {
    // TODO Check the closest room and set reservation
    this.log('No reservation');
    return false;
  }

  var baseRoom = Game.rooms[reservation.base];
  if (baseRoom === undefined) {
    delete this.memory.reservation;
    return false;
  }

  if (this.checkBlockedPath()) {
    if (Game.time % config.creep.structurerInterval === 0) {
      this.log('Call structurer from ' + baseRoom.name);
      Game.rooms[creep.memory.base].checkRoleToSpawn('structurer', 1, undefined, this.name);
      return;
    }
  }

  var reserverSpawn = {
    role: 'reserver',
    level: 2,
    routing: {
      targetRoom: this.name,
      targetId: this.controller.id,
      reached: false,
      routePos: 0,
      pathPos: 0
    }
  };
  // TODO move the creep check from the reserver to here and spawn only sourcer (or one part reserver) when controller.level < 4
  var energyNeeded = 1300;
  if (baseRoom.misplacedSpawn) {
    energyNeeded += 300;
  }
  if (baseRoom.getEnergyCapacityAvailable() >= energyNeeded) {
    if (!baseRoom.inQueue(reserverSpawn)) {
      baseRoom.checkRoleToSpawn('reserver', 1, this.controller.id, this.name, 2);
    }
  }
};

Room.prototype.handleReservedRoom = function () {
  this.memory.state = 'Reserved';
  this.memory.lastSeen = Game.time;
  if (this.memory.lastChecked !== undefined && Game.time - this.memory.lastChecked < 500) {
    return false;
  }
  this.memory.lastChecked = Game.time;

  var idiotCreeps = this.find(FIND_HOSTILE_CREEPS, {
    filter: this.findAttackCreeps
  });
  for (var _iterator4 = idiotCreeps, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
    var _ref4;

    if (_isArray4) {
      if (_i4 >= _iterator4.length) {
        break;
      }

      _ref4 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();

      if (_i4.done) {
        break;
      }

      _ref4 = _i4.value;
    }

    var idiotCreep = _ref4;

    brain.increaseIdiot(idiotCreep.owner.username);
  }

  var reservers = this.find(FIND_MY_CREEPS, {
    filter: function filter(c) {
      return c.memory.role === 'reserver';
    }
  });
  if (reservers.length === 0) {
    this.checkAndSpawnReserver();
  }
  return false;
};

Room.prototype.handleUnreservedRoom = function () {
  this.memory.state = 'Unreserved';
  this.memory.lastSeen = Game.time;
  if (this.memory.lastChecked !== undefined && Game.time - this.memory.lastChecked < 500) {
    return true;
  }

  // TODO: Don't check every tick.
  if (this.memory.reservation === undefined) {
    var isReservedBy = function isReservedBy(roomName) {
      return function (roomMemory) {
        return roomMemory.reservation !== undefined && roomMemory.state === 'Reserved' && roomMemory.reservation.base === roomName;
      };
    };

    checkRoomsLabel: for (var _iterator5 = Memory.myRooms, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) {
          break;
        }

        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();

        if (_i5.done) {
          break;
        }

        _ref5 = _i5.value;
      }

      var roomName = _ref5;

      var room = Game.rooms[roomName];
      if (!room) {
        continue;
      }
      var distance = Game.map.getRoomLinearDistance(this.name, room.name);
      if (distance > config.external.distance) {
        continue;
      }
      var route = Game.map.findRoute(this.name, room.name);
      distance = route.length;
      if (distance > config.external.distance) {
        continue;
      }
      // Only allow pathing through owned rooms or already reserved rooms.
      for (var _iterator6 = route, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
        var _ref6;

        if (_isArray6) {
          if (_i6 >= _iterator6.length) {
            break;
          }

          _ref6 = _iterator6[_i6++];
        } else {
          _i6 = _iterator6.next();

          if (_i6.done) {
            break;
          }

          _ref6 = _i6.value;
        }

        var routeEntry = _ref6;

        var routeRoomName = routeEntry.room;
        if (Game.rooms[routeRoomName] === undefined) {
          continue checkRoomsLabel;
        }
        var routeRoom = Game.rooms[routeRoomName];
        if (routeRoom.controller === undefined) {
          continue checkRoomsLabel;
        }
        if (!routeRoom.controller.my && routeRoom.memory.state !== 'Reserved') {
          continue checkRoomsLabel;
        }
      }
      if (room.memory.queue && room.memory.queue.length === 0 && room.energyAvailable >= room.getEnergyCapacityAvailable()) {
        var reservedRooms = _.filter(Memory.rooms, isReservedBy(room.name));
        // RCL: target reserved rooms
        var numRooms = config.room.reservedRCL;
        if (reservedRooms.length < numRooms[room.controller.level]) {
          this.log('Would start to spawn');
          this.memory.reservation = {
            base: room.name
          };
          this.memory.state = 'Reserved';
          break;
        }
      }
    }
  }

  if (this.memory.reservation !== undefined) {
    this.memory.lastChecked = Game.time;
    var reservation = this.memory.reservation;
    if (this.name === reservation.base) {
      this.log('Want to spawn reserver for the base room, why?');
      delete this.memory.reservation;
      return false;
    }
    this.memory.state = 'Reserved';
    this.checkAndSpawnReserver();
  }
  return true;
};

Room.prototype.handleSourceKeeperRoom = function () {
  if (!this.memory.base) {
    return false;
  }

  if (Game.time % 893 !== 0) {
    return false;
  }
  this.log('handle source keeper room');
  this.log('DISABLED - Routing keep distance to Source keeper structure, sourcer/carry check for next spawn, move await ~10 ticksToSpawn');
  if (true) {
    return false;
  }

  var myCreeps = this.find(FIND_MY_CREEPS);
  var sourcer = 0;
  var melee = 0;
  for (var _iterator7 = myCreeps, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
    var _ref7;

    if (_isArray7) {
      if (_i7 >= _iterator7.length) {
        break;
      }

      _ref7 = _iterator7[_i7++];
    } else {
      _i7 = _iterator7.next();

      if (_i7.done) {
        break;
      }

      _ref7 = _i7.value;
    }

    var object = _ref7;

    var _creep = Game.getObjectById(object.id);
    if (_creep.memory.role === 'sourcer') {
      sourcer++;
      continue;
    }
    if (_creep.memory.role === 'atkeepermelee') {
      melee++;
      continue;
    }
  }

  if (sourcer < 3) {
    var getSourcer = function getSourcer(object) {
      var creep = Game.getObjectById(object.id);
      if (creep.memory.role === 'sourcer') {
        return true;
      }
      return false;
    };

    for (var _iterator8 = this.find(FIND_SOURCES), _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
      var _ref8;

      if (_isArray8) {
        if (_i8 >= _iterator8.length) {
          break;
        }

        _ref8 = _iterator8[_i8++];
      } else {
        _i8 = _iterator8.next();

        if (_i8.done) {
          break;
        }

        _ref8 = _i8.value;
      }

      var source = _ref8;

      var _sourcer = source.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: getSourcer
      });
      if (_sourcer !== null) {
        var range = source.pos.getRangeTo(_sourcer.pos);
        if (range < 7) {
          continue;
        }
      }
      var _spawn = {
        role: 'sourcer',
        routing: {
          targetId: source.id,
          targetRoom: source.pos.roomName
        }
      };
      this.log('!!!!!!!!!!!! ' + (0, _stringify2.default)(_spawn));
      Game.rooms[this.memory.base].checkRoleToSpawn('sourcer', 1, source.id, source.pos.roomName);
    }
  }

  if (melee === 0) {
    var spawn = {
      role: 'atkeepermelee',
      routing: {
        targetRoom: this.name
      }
    };
    this.log('!!!!!!!!!!!! ' + (0, _stringify2.default)(spawn));
    Game.rooms[this.memory.base].memory.queue.push(spawn);
  }
};