// Prototype Extends
import './prototypes/controller';
import './prototypes/creep';
import './prototypes/mineral';
import './prototypes/room';
import './prototypes/roomposition';
import './prototypes/source';
// Loop
import { Root, Loop } from './loop';

function* main() {
  console.log('* * * * * * * * * * * * * * * * * * * * *');
  console.log('* * * * * * * Code Update ! * * * * * * *');
  console.log('* * * * * * * * * * * * * * * * * * * * *');
  Root();
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
    console.log('Code Changing ... ... ...');
  }
};
