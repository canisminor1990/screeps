'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('./task.spawn');

Object.defineProperty(exports, 'taskSpawn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_task).default;
  }
});

var _task2 = require('./task.findMiner');

Object.defineProperty(exports, 'taskFindMiner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_task2).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }