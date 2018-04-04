import { ErrorMapper } from './utils/ErrorMapper';
import { LogClass } from './global/log';

const Root = () => {
  if (global.isRoot === undefined) {
    global.Log = new LogClass();
    global.isRoot = true;
  }
};

const Loop = () => {
  Root();
  Log.info('Start:', Game.time);
};

export default ErrorMapper.wrapLoop(() => {
  try {
    Loop();
  } catch (e) {
    Log.error(e.stack || e.message);
  }
});
