'use strict';

require('require');
require('prototype_creep_startup_tasks');
require('prototype_creep_move');
require('prototype_roomPosition');
require('prototype_room_init');
require('prototype_room_costmatrix');
require('visualizer');
require('screepsplus');

brain.stats.init();

if (config.profiler.enabled) {
  try {
    var profiler = require('screeps-profiler');
    profiler.enable();
  } catch (e) {
    console.log('screeps-profiler not found');
    config.profiler.enabled = false;
  }
}

var main = function main() {
  if (Game.cpu.bucket < Game.cpu.tickLimit) {
    console.log('Skipping tick ' + Game.time + ' due to lack of CPU.');
    return;
  }

  brain.prepareMemory();
  brain.handleNextroom();
  brain.handleSquadmanager();
  brain.handleIncomingTransactions();
  brain.stats.addRoot();

  var _a = _(Game.rooms).filter(function (r) {
    return r.execute();
  });

  var _f = function _f(r) {
    return r.name;
  };

  var _r = [];

  for (var _i = 0; _i < _a.length; _i++) {
    _r.push(_f(_a[_i], _i, _a));
  }

  Memory.myRooms = _r.value();

  if (config.visualizer.enabled && config.visualizer.refresh) {
    visualizer.render();
  }
  brain.stats.add(['cpu'], {
    used: Game.cpu.getUsed()
  });
};

module.exports.loop = function () {
  if (config.profiler.enabled) {
    profiler.wrap(function () {
      main();
    });
  } else {
    main();
  }
};