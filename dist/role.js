'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _role = require('./role.harvester');

Object.defineProperty(exports, 'harvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

var _role2 = require('./role.upgrader');

Object.defineProperty(exports, 'upgrader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role2).default;
  }
});

var _role3 = require('./role.builder');

Object.defineProperty(exports, 'builder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role3).default;
  }
});

var _role4 = require('./role.miner');

Object.defineProperty(exports, 'miner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role4).default;
  }
});

var _role5 = require('./role.cleaner');

Object.defineProperty(exports, 'cleaner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role5).default;
  }
});

var _role6 = require('./role.farHarvester');

Object.defineProperty(exports, 'farHarvester', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role6).default;
  }
});

var _role7 = require('./role.farMiner');

Object.defineProperty(exports, 'farMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role7).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }