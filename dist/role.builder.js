'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _task = require('./task');

var _config = require('./config');

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

		halfBroken && creep.repair(halfBroken) == ERR_NOT_IN_RANGE ? creep.moveTo(halfBroken, {
			visualizePathStyle: { reusePath: 8, stroke: '#ffffff' }
		}) : null;

		targets && creep.build(targets) == ERR_NOT_IN_RANGE ? creep.moveTo(targets, {
			visualizePathStyle: { reusePath: 8, stroke: '#ffffff' }
		}) : null;
	} else {
		(0, _task.taskFindMiner)(creep);
	}
};

module.exports = exports['default'];