import './config.js';
import { ErrorMapper } from './utils/ErrorMapper';

// 注入 prototypes 并注册新的 global 项目，使用 isRoot 进行检测是否需要重新注入
// ==========================================================================
const Root = (): void => {
	if (_.isUndefined(global.isRoot) || _.isUndefined(Memory.config)) {
		console.log(String.fromCodePoint(0x1f503), 'Code Reloading ...');
		// Assign config
		if (_.isUndefined(Memory.config)) Memory.config = {};
		_.assign(Memory.config, require('config'));
		_.assign(global, Memory.config);
		// Extend game prototypes
		require('./prototypes');
		// Extend functions
		require('./global');
		// Checkpoint
		global.isRoot = true;
		Log.success('Root Done');
		Memory.Clocks = {};
		const func = function() {
			Log.info(this.params.counter++, !this.pause);
		};
		new Clock('test clock', { counter: 1 }, func, 2, true);
	}
};

// Main Loop
// ==========================================================================
const Loop = (): void => {
	_.each(global.Clocks, function(clock) {
		clock.run();
	});
	console.log(Log);
	// Log.info('Start:', Game.time);
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
