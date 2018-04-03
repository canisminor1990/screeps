import { ErrorMapper } from './utils/ErrorMapper';
import { Command } from './global/commands';
import { LogClass } from './global/log';
import { CMemoryClass } from './global/cMemory';
import { Traveler } from './global/traveler';
// import {RoomsMemory} from './rooms';

import { getUserName } from './utils';

const Flow = () => {
  CMemory.check('settings.user', getUserName());
};

// Export

export const Root = () => {
  if (global.isRoot === undefined) {
    global.Log = new LogClass();
    global.CMemory = new CMemoryClass();
    global.Traveler = new Traveler();
    Command.init();
    global.isRoot = true;
  }
};

export const Loop = ErrorMapper.wrapLoop(() => {
  try {
    Flow();
  } catch (e) {
    Log.error(e.stack || e.message);
  }
});
