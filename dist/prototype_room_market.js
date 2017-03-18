'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.handleMarket = function () {
  if (!this.terminal) {
    return false;
  }

  var minerals = this.find(FIND_MINERALS);
  var resource = minerals[0].mineralType;

  if (!this.terminal.store[resource]) {
    return false;
  }

  if (this.terminal.store[resource] < config.mineral.minAmountForMarket) {
    return false;
  }

  // TODO Adapt amount
  var amount = this.terminal.store[resource];

  var myMineralOrders = function myMineralOrders(object) {
    if (object.resourceType === resource) {
      return true;
    }
    return false;
  };

  var room = this;

  var sortByEnergyCost = function sortByEnergyCost(order) {
    return Game.market.calcTransactionCost(amount, room.name, order.roomName);
  };

  var orders = _.sortBy(_.filter(Memory.ordersBuy, myMineralOrders), sortByEnergyCost);
  for (var _iterator = orders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

    var order = _ref;

    //if (!Memory.mineralSystemPrice[order.resourceType] || order.price < Memory.mineralSystemPrice[order.resourceType]) {
    //  continue;
    //}

    if (Game.market.calcTransactionCost(amount, this.name, order.roomName) > this.terminal.store.energy) {
      //      this.log('Market: No energy');
      break;
    }
    this.log(order.id + ' ' + this.name + ' ' + amount);
    var returnCode = Game.market.deal(order.id, amount, this.name);
    this.log('market.deal: ' + resource + ' ' + returnCode);
    if (returnCode === OK) {
      break;
    }
  }
  return true;
};