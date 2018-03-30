'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ErrorMapper_1 = require('./utils/ErrorMapper');
const commands_1 = require('./global/commands');
const log_1 = require('./global/log');
const cMemory_1 = require('./global/cMemory');
const utils_1 = require('./utils');
const Flow = () => {
  CMemory.check('settings.user', utils_1.getUserName());
};
exports.Root = () => {
  if (global.isRoot === undefined) {
    global.Log = new log_1.LogClass();
    global.CMemory = new cMemory_1.CMemoryClass();
    commands_1.Command.init();
    global.isRoot = true;
  }
};
exports.Loop = ErrorMapper_1.ErrorMapper.wrapLoop(() => {
  try {
    Flow();
  } catch (e) {
    Log.error(e.stack || e.message);
  }
});
