import './prototypes';
import Loop from './loop';

function* main() {
  Log.success('* * * * * * * * * * * * * * * * * * * * *');
  Log.success('* * * * * * * Code Update ! * * * * * * *');
  Log.success('* * * * * * * * * * * * * * * * * * * * *');
  while (true) {
    Loop();
    yield null;
  }
}
Game.exports.loop = function() {
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
