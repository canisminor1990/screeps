'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

brain.handleIncomingTransactions = function () {
  var transactions = Game.market.incomingTransactions;
  var current = _.filter(transactions, function (object) {
    return object.time >= Game.time - 1;
  });

  for (var _iterator = current, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var transaction = _ref;

    var sender = transaction.sender.username;
    var orders = Game.market.getAllOrders({
      type: ORDER_SELL,
      resourceType: transaction.resourceType
    });
    var prices = _.sortBy(orders, function (object) {
      return object.price;
    });
    var price = prices[0].price;
    var value = -1 * transaction.amount * price;
    console.log('Incoming transaction from ' + sender + ' with ' + transaction.amount + ' ' + transaction.resourceType + ' market price: ' + price);
    brain.increaseIdiot(sender, value);
  }
};

brain.increaseIdiot = function (name, value) {
  if (name === 'Invader') {
    return false;
  }

  value = value || 1;
  Memory.players = Memory.players || {};

  if (!Memory.players[name]) {
    Memory.players[name] = {
      name: name,
      rooms: {},
      level: 0,
      counter: 0,
      idiot: 0
    };
  }

  if (!Memory.players[name].idiot) {
    Memory.players[name].idiot = 0;
  }

  Memory.players[name].idiot += value;
};

brain.isFriend = function (name) {
  if (!Memory.players) {
    Memory.players = {};
  }

  if (friends.indexOf(name) > -1) {
    return true;
  }
  if (!Memory.players[name]) {
    return true;
  }
  if (!Memory.players[name].idiot) {
    return true;
  }
  if (Memory.players[name].idiot <= 0) {
    return true;
  }
  if (name === 'Source Keeper') {
    return true;
  }
  return false;
};

brain.handleSquadmanager = function () {
  for (var squadIndex in Memory.squads) {
    var squad = Memory.squads[squadIndex];
    if ((0, _keys2.default)(squad.siege).length === 0) {
      return true;
    }
    if (squad.action === 'move') {
      for (var siegeId in squad.siege) {
        var siege = squad.siege[siegeId];
        if (!siege.waiting) {
          return true;
        }
      }
      for (var healId in squad.heal) {
        var heal = squad.heal[healId];
        if (!heal.waiting) {
          return true;
        }
      }

      squad.action = 'attack';
    }
  }
};

/**
 * TODO atm addToQueue is only for squad creation usable
 * TODO check for queue.length split queue creation to all unused (or less than closestSpawn.memory.queue.length) spawns in range (e.g. under 6 rooms, move '6' to config or room.memory)
 *
 * @param {Array} spawns  Array of Objects like {creeps: 1, role: 'squadsiege'}
 * @param {String} roomNameFrom  pushing to Game.rooms[roomNameFrom].memory.queue
 * @param {String} roomNameTarget routing target
 * @param {String} squadName
 * @param {Number} [queueLimit] don't push if queueLimit is reached
 */
brain.addToQueue = function (spawns, roomNameFrom, roomNameTarget, squadName, queueLimit) {
  queueLimit = queueLimit || false;
  var outer = function outer(spawn) {
    return function _addToQueue(time) {
      if (queueLimit === false) {
        Game.rooms[roomNameFrom].memory.queue.push({
          role: spawn.role,
          routing: {
            targetRoom: roomNameTarget
          },
          squad: squadName
        });
      } else if (Game.rooms[roomNameFrom].memory.queue.length < queueLimit) {
        Game.rooms[roomNameFrom].memory.queue.push({
          role: spawn.role,
          routing: {
            targetRoom: roomNameTarget
          },
          squad: squadName
        });
      }
    };
  };

  for (var _iterator2 = spawns, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
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

    var spawn = _ref2;

    _.times(spawn.creeps, outer(spawn));
  }
};
/**
 * brain.startSquad used to attack player.rooms
 *
 * @param {String} roomNameFrom
 * @param {String} roomNameAttack
 */
brain.startSquad = function (roomNameFrom, roomNameAttack) {
  var name = 'siegesquad-' + Math.random();
  var route = Game.map.findRoute(roomNameFrom, roomNameAttack);
  var target = roomNameFrom;
  if (route.length > 1) {
    target = route[route.length - 2].room;
  }
  Memory.squads = Memory.squads || {};

  var siegeSpawns = [{
    creeps: 1,
    role: 'squadsiege'
  }, {
    creeps: 3,
    role: 'squadheal'
  }];
  this.addToQueue(siegeSpawns, roomNameFrom, roomNameAttack, name);

  Memory.squads[name] = {
    born: Game.time,
    target: roomNameAttack,
    from: roomNameFrom,
    siege: {},
    heal: {},
    route: route,
    action: 'move',
    moveTarget: target
  };
};

/**
 * brain.startMeleeSquad use to clean rooms from invaders and players
 *
 * @param {String} roomNameFrom
 * @param {String} roomNameAttack
 * @param {Array} [spawns]
 */
brain.startMeleeSquad = function (roomNameFrom, roomNameAttack, spawns) {
  var name = 'meleesquad-' + Math.random();
  var route = Game.map.findRoute(roomNameFrom, roomNameAttack);
  var target = roomNameFrom;
  if (route.length > 1) {
    target = route[route.length - 2].room;
  }
  Memory.squads = Memory.squads || {};
  // TODO check for queue length
  var meleeSpawn = [{
    creeps: 1,
    role: 'autoattackmelee'
  }, {
    creeps: 1,
    role: 'squadheal'
  }, {
    creeps: 2,
    role: 'autoattackmelee'
  }, {
    creeps: 2,
    role: 'squadheal'
  }];

  spawns = spawns || meleeSpawn;
  this.addToQueue(spawns, roomNameFrom, roomNameAttack, name);

  Memory.squads[name] = {
    born: Game.time,
    target: roomNameAttack,
    from: roomNameFrom,
    autoattackmelee: {},
    heal: {},
    route: route,
    action: 'move',
    moveTarget: target
  };
};