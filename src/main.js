import loop from './loop.ts';

function* main() {
  console.log('--------- Code Update! ---------');
  while (true) {
    loop();
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
    console.log('--------- Code Changing ---------');
  }
};
