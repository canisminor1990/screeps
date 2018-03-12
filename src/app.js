import 'screeps-regenerator-runtime/runtime';
import Loop from './index';

const { deserializeGenerator, serializeGenerator } = regeneratorRuntime;

function* main() {
  console.log('Code Run');
  let counter = 0;
  while (true) {
    console.log('Code has been running for', counter, 'ticks');
    Game.cpu.bucket < 2 * Game.cpu.tickLimit ? console.log('Lack of CPU!') : Loop();
    yield null;
    counter += 1;
  }
}

export function loop() {
  let thread;
  if (Memory.thread) {
    try {
      thread = deserializeGenerator(Memory.thread);
    } finally {
      delete Memory.thread;
    }
  } else {
    thread = main();
  }
  let result = thread.next();
  if (!result.done) {
    Memory.thread = serializeGenerator(thread);
  }
}
