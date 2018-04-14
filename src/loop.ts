import { ErrorMapper } from './util/ErrorMapper';
import Root from './root';
import Process from './Process';

const cpuAtLoad = Game.cpu.getUsed();
let cpuAtFirstLoop;
export default ErrorMapper.wrapLoop(() => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Root();
	Memory.CPU_CRITICAL = Memory.CPU_CRITICAL
		? Game.cpu.bucket < CRITICAL_BUCKET_LEVEL + CRITICAL_BUCKET_OVERFILL
		: Game.cpu.bucket < CRITICAL_BUCKET_LEVEL;
	if (!cpuAtFirstLoop) cpuAtFirstLoop = cpuAtLoop;
	// ensure required memory namespaces
	if (_.isUndefined(Memory.debugTrace)) Memory.debugTrace = { error: true, no: {} };
	if (_.isUndefined(Memory.cloaked)) Memory.cloaked = {};
	// start process
	Process.run();
	Game.cacheTime = Game.time;
	if (DEBUG && TRACE)
		Util.trace('main', {
			cpuAtLoad,
			cpuAtFirstLoop,
			cpuAtLoop,
			cpuTick: Game.cpu.getUsed(),
			isNewServer: global.isNewServer,
			lastServerSwitch: Game.lastServerSwitch,
			main: 'cpu',
		});
});
