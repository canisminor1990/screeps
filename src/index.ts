import Config from './config';
import * as Profiler from 'screeps-profiler';
import { ErrorMapper } from './utils/ErrorMapper';
import Loop from './loop';

if (Config.USE_PROFILER) Profiler.enable();

let cpuAtFirstLoop;

export default ErrorMapper.wrapLoop(() => {
  const cpuAtLoop = Game.cpu.getUsed();
  if (Memory.pause) return;

  try {
    Loop();
  } catch (e) {
    global.Util.logError(e.stack || e.message);
  }
});
