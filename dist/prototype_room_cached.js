'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Room.prototype.getConstructionSites = function () {
  if (!this.constructionSites) {
    this.constructionSites = JSON.parse((0, _stringify2.default)(this.find(FIND_CONSTRUCTION_SITES)));
  }
  return this.constructionSites;
};

Room.prototype.getDroppedResources = function () {
  if (!this.droppedResources) {
    this.droppedResources = JSON.parse((0, _stringify2.default)(this.find(FIND_DROPPED_RESOURCES)));
  }
  return this.droppedResources;
};