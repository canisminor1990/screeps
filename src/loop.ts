import { ErrorMapper } from './utils/ErrorMapper';
import { getUsername } from './utils';
import { Managers } from './managers';
// 注入 prototypes 并注册新的 global 项目，使用 isRoot 进行检测是否需要重新注入
// ==========================================================================
const Root = (): void => {
	if (_.isUndefined(global.isRoot) || _.isUndefined(ME)) {
		console.log(String.fromCodePoint(0x1f503), 'Code Reloading ...');
		// Assign config
		global._ME = getUsername();
		if (_.isUndefined(Memory.config)) Memory.config = {};
		// 不要改 config 引用路径（打包时候不会引入）
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
			Log.info(this.params.counter++);
			if (this.params.counter > 10) {
				this.restart();
			}
		};
		new Clock('test clock', { counter: 0 }, func, 1, true);
	}
};

// Main Loop
// ==========================================================================
const Loop = (): void => {
	global.Clocks.tick();
	Log.info('Start:', Game.time);
	Managers.run();
};

// 解析 SourceMap , 统一错误处理
// ==========================================================================
export default ErrorMapper.wrapLoop((): void => {
	Root();
	Loop();
});
