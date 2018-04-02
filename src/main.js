// Prototype Extends
import './prototypes/controller';
import './prototypes/creep';
import './prototypes/mineral';
import './prototypes/room';
import './prototypes/roomPosition';
import './prototypes/source';
// Loop
import { Root, Loop } from './loop';

Root();

function* main() {
  console.log();
  Log.success('* * * * * * * * * * * * * * * * * * * * *');
  Log.success('* * * * * * * Code Update ! * * * * * * *');
  Log.success('* * * * * * * * * * * * * * * * * * * * *');
  console.log();
  while (true) {
    Loop();
    yield null;
  }
}

exports.loop = function() {
  var thread;
  try {
    if (Memory.thread) {
      try {
        thread = regeneratorRuntime.deserializeGenerator(Memory.thread);
      } finally {
        delete Memory.thread;
      }
    } else {
      thread = main();
    }
    let result = thread.next();
    if (!result.done) {
      Memory.thread = regeneratorRuntime.serializeGenerator(thread);
    }
  } catch (e) {
    Log.warn(`Code Changing at ${Game.time}... ... ...`);
  }
};
