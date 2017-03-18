'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.handle = function () {
  if (this.controller && this.controller.my) {
    return this.myHandleRoom();
  }
  return this.externalHandleRoom();
};

Room.prototype.execute = function () {
  this.memory.lastSeen = Game.time;
  try {
    var returnCode = this.handle();
    for (var _iterator = this.find(FIND_MY_CREEPS), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

      var creep = _ref;

      creep.handle();
    }
    delete this.transferableStructures;
    delete this.droppedResources;
    delete this.constructionSites;
    return returnCode;
  } catch (err) {
    this.log('Executing room failed: ' + this.name + ' ' + err + ' ' + err.stack);
    Game.notify('Executing room failed: ' + this.name + ' ' + err + ' ' + err.stack, 30);
    return false;
  }
};