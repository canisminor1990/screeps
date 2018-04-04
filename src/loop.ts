import { ErrorMapper } from './utils/ErrorMapper';

const Root = () => {
  if (global.isRoot === undefined) {
    _.forEach(require('./config'), (value: any, key: string) => (global[key] = value));
    global.Log = require('./global/log').Log;
    global.Dye = require('./global/log').Dye;
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
