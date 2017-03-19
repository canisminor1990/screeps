'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _role = require('./role');

var _task = require('./task');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mySpawn = Game.spawns['Spawn1'];
module.exports = {

	loop: function loop() {

		for (var name in Memory.creeps) {
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

		(0, _task.taskSpawn)(_role.roleConfig.number, _role.roleConfig.body);

		if (mySpawn.spawning) {
			var spawningCreep = Game.creeps[mySpawn.spawning.name];
			mySpawn.room.visual.text('[Spawn]' + spawningCreep.memory.role, mySpawn.pos.x + 1, mySpawn.pos.y, { align: 'left', opacity: 0.8 });
		}

		mySpawn.room.memory = (0, _extends3.default)({
			structures: mySpawn.room.find(FIND_STRUCTURES),
			constructionSites: mySpawn.room.find(FIND_CONSTRUCTION_SITES)
		}, other);

		var targetsHarvest = mySpawn.room.memory.structures.filter(function (structure) {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
		});

		var targetsBuild = mySpawn.room.memory.constructionSites;

		for (var _name in Game.creeps) {
			var creep = Game.creeps[_name];

			switch (creep.memory.role) {
				case 'harvester':
					targetsHarvest.length > 0 ? _role.roleHarvester.run(creep, targetsHarvest[0]) : _role.roleBuilder.run(creep);
					break;
				case 'upgrader':
					_role.roleUpgrader.run(creep);
					break;
				case 'builder':

					targetsBuild.length > 0 ? _role.roleBuilder.run(creep, targetsBuild[0]) : _role.roleHarvester.run(creep, targetsHarvest[0]);

					break;
				case 'miner':
					_role.roleMiner.run(creep);
					break;
			}
		}
	}

};