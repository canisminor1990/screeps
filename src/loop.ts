import { ErrorMapper } from './utils/ErrorMapper';

// 注入 prototypes 并注册新的 global 项目，使用 isRoot 进行检测是否需要重新注入
// ==========================================================================
const Root = (): void => {
	if (_.isUndefined(global.isRoot) || _.isUndefined(Memory.config.ME)) {
		console.log(String.fromCodePoint(0x1f503), 'Code Reloading ...');
		// Extend game prototypes
		require('./prototypes');
		// Assign config
		_.assign(Memory.config, require('config'));
		_.assign(global, Memory.config);
		// Extend functions
		global.Dye = require('./global/log').Dye;
		global.Log = require('./global/log').Log;
		// Checkpoint
		global.isRoot = true;
		Log.success('Root Done');
	}
};

// Main Loop
// ==========================================================================
const Loop = (): void => {
	Log.info('Start:', Game.time);
};

// 解析 SourceMap , 统一错误处理
// ==========================================================================
export default ErrorMapper.wrapLoop((): void => {
	try {
		Root();
		Loop();
	} catch (e) {
		Log.error(e.stack || e.message);
	}
});
