'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (config.visualizer.enabled) {
  try {
    var Visual = require('visual');
  } catch (e) {
    console.log('Visual not found, please disable config option or copy visual.js from screeps-visual');
    config.visualizer.enabled = false;
  }
}
if (config.visualizer.enabled) {
  global.visualizer = {
    // Draws path types configured in config.visualizer
    showPaths: function showPaths() {
      var colors = [];
      var COLOR_BLACK = colors.push('#000000') - 1;
      var COLOR_RED = colors.push('rgba(255,0,0,0.5)') - 1;
      var COLOR_BLUE = colors.push('rgba(0,0,255,0.1)') - 1;
      var COLOR_YELLOW = colors.push('rgba(255,255,0,0.1)') - 1;
      var COLOR_WHITE = colors.push('rgba(255,255,255,0.5)') - 1;
      _.each(Game.rooms, function (room, name) {
        var visual = new Visual(name);
        visual.defineColors(colors);
        visual.setLineWidth = 0.5;
        visual.font = '1px sans';
        // draw fixed paths in room
        if (config.visualizer.showRoomPaths) {
          var paths = room.getMemoryPaths();
          if (paths.length !== 0) {
            _.each(paths, function (route) {
              var _a = route.path;

              var _f = function _f(p) {
                return [p.x, p.y];
              };

              var _r = [];

              for (var _i = 0; _i < _a.length; _i++) {
                _r.push(_f(_a[_i], _i, _a));
              }

              visual.drawLine(_r, COLOR_WHITE, {
                lineWidth: 0.1
              });
            });
          }
        }
        // draw creep paths from using moveTo
        if (config.visualizer.showCreepPaths) {
          _.each(Game.creeps, function (creep) {
            if (creep.room != room) {
              return;
            }
            var mem = creep.memory;
            if (mem._move) {
              var path = Room.deserializePath(mem._move.path);
              if (path.length !== 0) {
                var _a2 = path;

                var _f2 = function _f2(p) {
                  return [p.x, p.y];
                };

                var _r2 = [];

                for (var _i2 = 0; _i2 < _a2.length; _i2++) {
                  _r2.push(_f2(_a2[_i2], _i2, _a2));
                }

                visual.drawLine(_r2, COLOR_RED, {
                  lineWidth: 0.1
                });
              }
            }
          });
        }
        // draw structures
        if (config.visualizer.showStructures && room.memory.position && room.memory.position.structure) {
          var structures = room.memory.position.structure;
          _.each((0, _keys2.default)(structures), function (structType) {
            var text = structType.substr(0, 1).toUpperCase();
            _.each(structures[structType], function (structure) {
              visual.drawCell(structure.x, structure.y, COLOR_BLUE);
              visual.fillStyle = 'blue';
              visual.fillText(text, structure.x + 0.2, structure.y + 0.85);
            });
          });
        }
        // draw creep positions
        if (config.visualizer.showCreeps && room.memory.position) {
          var creeps = room.memory.position.creep;
          _.each((0, _keys2.default)(creeps), function (position) {
            if (position.x || position.y) {
              var text = position.substr(0, 1);
              visual.drawCell(position.x, position.y, COLOR_YELLOW);
              visual.fillStyle = 'yellow';
              visual.fillText(text, position.x + 0.3, position.y + 0.75);
            } else {
              _.each(creeps[position], function (towerfiller) {
                var text = position.substr(0, 1);
                visual.drawCell(towerfiller.x, towerfiller.y, COLOR_YELLOW);
                visual.fillStyle = 'yellow';
                visual.fillText(text, towerfiller.x + 0.3, towerfiller.y + 0.75);
              });
            }
          });
        }

        visual.commit();
      });
      return true;
    },
    // TODO: TEST
    // Draws provided deserialized path -- untested
    showPath: function showPath(path) {
      var visual = new Visual(path);
      var colors = [];
      var COLOR_RED = colors.push('rgba(249,8,8,0.5)') - 1;

      if (path.length) {
        var _a3 = path.path;

        var _f3 = function _f3(p) {
          return [p.x, p.y];
        };

        var _r3 = [];

        for (var _i3 = 0; _i3 < _a3.length; _i3++) {
          _r3.push(_f3(_a3[_i3], _i3, _a3));
        }

        visual.drawLine(_r3, COLOR_RED, {
          lineWidth: 0.1
        });
        visual.commit();
        return true;
      }
      return false;
    },
    // TODO: TEST
    // Removes provided deserialized path from canvas -- untested
    hidePath: function hidePath(path) {
      var visual = new Visual(path);
      visual.commit();
      RawVisual.commit();
      return true;
    },

    // renders one frame, this frame will stay in memory and keep showing in the client until you restart it or run visualizer.clear()
    render: function render() {
      if (!config.visualizer.refresh) {
        console.log('Visualizer rendering frame...');
      }
      if (!this.showPaths()) {
        return false;
      }
      RawVisual.commit();
      return true;
    },

    // clears the screen of roomPaths, not that this wont really do much if you have config.visualizer.refreh = true
    // TODO fix so it clears the paths drawn for creeps aswell, even ones gone from memory.
    clear: function clear() {
      console.log('Visualizer clearing frame.');
      _.each(Game.rooms, function (room, name) {
        var visual = new Visual(name);
        visual.commit();
      });
      RawVisual.commit();
      return true;
    },

    // Loads the screeps-visual script for the client
    run: function run() {
      return console.log('<script>' + 'if(!window.visualLoaded){' + '  $.getScript("https://screepers.github.io/screeps-visual/src/visual.screeps.user.js");' + '  window.visualLoaded = true;' + '}</script>');
    }
  };
  visualizer.run();
}