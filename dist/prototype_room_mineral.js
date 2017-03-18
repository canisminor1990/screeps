'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.getNextReaction = function () {
  for (var mineralFirst in this.terminal.store) {
    if (!REACTIONS[mineralFirst]) {
      continue;
    }
    for (var mineralSecond in this.terminal.store) {
      if (!REACTIONS[mineralFirst][mineralSecond]) {
        continue;
      }
      var result = REACTIONS[mineralFirst][mineralSecond];
      if (this.terminal.store[result] > config.mineral.minAmount) {
        continue;
      }
      //this.log('Could build: ' + mineralFirst + ' ' + mineralSecond + ' ' + result);
      return {
        result: result,
        first: mineralFirst,
        second: mineralSecond
      };
    }
  }
  return false;
};

Room.prototype.reactions = function () {
  if (!this.memory.reaction) {
    var result = this.getNextReaction();
    if (!result) {
      return;
    }

    var labsAll = this.find(FIND_MY_STRUCTURES, {
      filter: function filter(object) {
        if (object.structureType != STRUCTURE_LAB) {
          return false;
        }
        if (!object.mineralType) {
          return true;
        }
        if (object.mineralType === result.result) {
          return true;
        }
        return false;
      }
    });

    var lab = void 0;
    var labs = [];
    var getNearLabs = function getNearLabs(object) {
      if (object.id === lab.id) {
        return false;
      }
      if (object.structureType != STRUCTURE_LAB) {
        return false;
      }
      if (!object.mineralType) {
        return true;
      }
      if (object.mineralType === result.first) {
        return true;
      }
      if (object.mineralType === result.second) {
        return true;
      }
      return false;
    };

    for (var _iterator = labsAll, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      if (_isArray) {
        if (_i >= _iterator.length) {
          break;
        }

        lab = _iterator[_i++];
      } else {
        _i = _iterator.next();

        if (_i.done) {
          break;
        }

        lab = _i.value;
      }

      var labsNear = lab.pos.findInRange(FIND_MY_STRUCTURES, 2, {
        filter: getNearLabs
      });

      if (labsNear.length >= 2) {
        labs.push(lab.id);
        //        console.log(lab.mineralType, result.result);

        for (var _iterator2 = labsNear, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
          var _ref;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) {
              break;
            }

            _ref = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();

            if (_i2.done) {
              break;
            }

            _ref = _i2.value;
          }

          var labNear = _ref;

          if (!labNear.mineralType || labNear.mineralType === result.first) {
            //            console.log(labNear.mineralType, result.first);
            labs.push(labNear.id);
            break;
          }
        }
        for (var _iterator3 = labsNear, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
          var _ref2;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) {
              break;
            }

            _ref2 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();

            if (_i3.done) {
              break;
            }

            _ref2 = _i3.value;
          }

          var _labNear = _ref2;

          if (_labNear.id === labs[1]) {
            continue;
          }
          if (!_labNear.mineralType || _labNear.mineralType === result.second) {
            //            console.log(labNear.mineralType, result.second);
            labs.push(_labNear.id);
            break;
          }
        }
        break;
      }
    }
    if (labs.length < 3) {
      return false;
    }
    this.memory.reaction = {
      result: result,
      labs: labs
    };
    //    this.log('Setting reaction: ' + JSON.stringify(this.memory.reaction));
  }

  if (this.terminal.store[this.memory.reaction.result.result] > config.mineral.minAmount) {
    this.log('Done with reaction:' + this.memory.reaction.result.result);
    delete this.memory.reaction;
  }
};

Room.prototype.orderMinerals = function () {
  var minerals = this.find(FIND_MINERALS);
  var resource = minerals[0].mineralType;

  if (Game.time % 20 === 0) {
    var baseMinerals = [RESOURCE_HYDROGEN, RESOURCE_OXYGEN, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_KEANIUM, RESOURCE_ZYNTHIUM, RESOURCE_CATALYST, RESOURCE_GHODIUM];

    var room = this;
    var orderByDistance = function orderByDistance(object) {
      return Game.map.getRoomLinearDistance(room.name, object);
    };

    for (var _iterator4 = baseMinerals, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
      var _ref3;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) {
          break;
        }

        _ref3 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();

        if (_i4.done) {
          break;
        }

        _ref3 = _i4.value;
      }

      var mineral = _ref3;

      if (!this.terminal.store[mineral]) {
        var roomsOther = _.sortBy(Memory.myRooms, orderByDistance);

        for (var _iterator5 = roomsOther, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
          var _ref4;

          if (_isArray5) {
            if (_i5 >= _iterator5.length) {
              break;
            }

            _ref4 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();

            if (_i5.done) {
              break;
            }

            _ref4 = _i5.value;
          }

          var roomOtherName = _ref4;

          if (roomOtherName === this.name) {
            continue;
          }
          var roomOther = Game.rooms[roomOtherName];
          if (!roomOther || roomOther === null) {
            continue;
          }
          var _minerals = roomOther.find(FIND_MINERALS);
          if (_minerals.length === 0) {
            continue;
          }
          var mineralType = _minerals[0].mineralType;
          if (!roomOther.terminal || roomOther.terminal[_minerals[0].mineralType] < config.mineral.minAmount) {
            continue;
          }
          if (mineralType === mineral) {
            roomOther.memory.mineralOrder = roomOther.memory.mineralOrder || {};
            if (roomOther.memory.mineralOrder[room.name]) {
              break;
            }
            roomOther.memory.mineralOrder[room.name] = 1000;
            //            room.log('Ordering ' + mineralType + ' from ' + roomOther.name);
            break;
          }
        }
      }
    }
  }
};

Room.prototype.handleTerminal = function () {
  var minerals = this.find(FIND_MINERALS);
  if (minerals.length === 0) {
    return false;
  }
  var resource = minerals[0].mineralType;

  if (!this.terminal) {
    return false;
  }

  this.orderMinerals();
  this.reactions();

  if (!this.memory.mineralOrder || (0, _keys2.default)(this.memory.mineralOrder).length === 0) {
    return false;
  }

  var roomOtherName = (0, _keys2.default)(this.memory.mineralOrder)[0];
  var roomOther = Game.rooms[roomOtherName];
  var order = this.memory.mineralOrder[roomOtherName];
  var linearDistanceBetweenRooms = Game.map.getRoomLinearDistance(this.name, roomOtherName);
  var energy = Math.ceil(0.1 * order * linearDistanceBetweenRooms);

  if (this.terminal.store.energy < energy) {
    //this.log('Terminal not enough energy');
    this.memory.terminalTooLessEnergy = true;
    return false;
  }

  this.memory.terminalTooLessEnergy = false;

  if (this.terminal.store[resource] < order) {
    return false;
  }
  this.terminal.send(resource, order, roomOtherName);
  delete this.memory.mineralOrder[roomOtherName];
  return true;
};