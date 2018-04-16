import { ErrorMapper } from './util/ErrorMapper';
import { Splash } from './util/splash';
import Process from './Process';

Splash();
const cpuAtLoad = Game.cpu.getUsed();
let cpuAtFirstLoop;
const Core = () => {
	const cpuAtLoop = Game.cpu.getUsed();
	if (Memory.pause) return;
	if (_.isUndefined(global.isRoot)) Process.install();
	if (!cpuAtFirstLoop) cpuAtFirstLoop = cpuAtLoop;
	// start process
	Process.loop();
	Game.cacheTime = Game.time;
	if (LOG_TRACE)
		Log.trace('main', {
			cpuAtLoad,
			cpuAtFirstLoop,
			cpuAtLoop,
			cpuTick: Game.cpu.getUsed(),
			main: 'cpu',
		});
};

export const loop = ENV === 'production' ? Core : ErrorMapper.wrapLoop(Core);
