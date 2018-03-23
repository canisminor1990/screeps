import Config from './config';
import * as Profiler from 'screeps-profiler';
import { ErrorMapper } from './utils/ErrorMapper';
import Loop from './loop';

console.log(`------------ Code Update ------------`);

if (Config.USE_PROFILER) Profiler.enable();

const DebugLoop = Config.ENABLE_DEBUG_MODE ? ErrorMapper.wrapLoop(Loop) : Loop;

export const loop = !Config.USE_PROFILER
  ? DebugLoop
  : () => {
      Profiler.wrap(DebugLoop);
    };
